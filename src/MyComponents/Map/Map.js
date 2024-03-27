/**
 * The Map component is a React component that creates and manages an OpenLayers map.
 * The Map component is returning a div element with a ref of mapRef and a className of
 * "ol-map".
 */
import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import {
  Modify,
  Select,
  defaults as defaultInteractions,
} from "ol/interaction.js";

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [currentCenter, setCurrentCenter] = useState([10, 10]);
  // on component mount
  const select = new Select({
    wrapX: false,
  });

  const modify = new Modify({
    features: select.getFeatures(),
  });

  useEffect(() => {
    let options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
      interactions: defaultInteractions().extend([select, modify]),
    };
    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    const handleMoveEnd = () => {
      const newCenter = mapObject.getView().getCenter();
      setCurrentCenter(newCenter);
    };
    mapObject.on("moveend", handleMoveEnd);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);
  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(currentCenter);
  }, [currentCenter]);
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};
export default Map;
