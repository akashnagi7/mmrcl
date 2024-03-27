/**
 * The SwipeMap component is a React component that displays a map with two vector layers and a swipe
 * control.
 */
import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Swipe from "ol-ext/control/Swipe";
import GeoJSON from "ol/format/GeoJSON";
import { REACT_APP_BASE_URL } from "../Utils/index";

const SwipeMap = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    const vectorSource1 = new VectorSource({
      format: new GeoJSON(),
      // url: "http://192.168.1.17:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:electric_pole&outputFormat=application/json&srsname=EPSG:3857",
      url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:electric_pole&outputFormat=application/json&srsname=EPSG:3857`,
    });
    const vectorLayer1 = new VectorLayer({
      source: vectorSource1,
      // add your first vector layer options here
    });
    const vectorSource2 = new VectorSource({
      format: new GeoJSON(),
      // url: "http://192.168.1.17:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857",
      url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857`,
    });
    const vectorLayer2 = new VectorLayer({
      source: vectorSource2,
      // add your second vector layer options here
    });
    const osmSource = new OSM();
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: osmSource,
        }),
        vectorLayer1,
        vectorLayer2,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    const swipeControl = new Swipe({
      layers: [vectorLayer1],
    });
    map.addControl(swipeControl);
    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default SwipeMap;
