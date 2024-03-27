/**
 * The above code is a React component that creates a vector layer on an OpenLayers map and applies
 * styling to the geometries and text labels.
 */
import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import { Style, Stroke, Fill, Circle, Text } from "ol/style";
import { useState } from "react";

const VectorLayer = ({ source, zIndex = 0, geometryType, opacity }) => {
  const [info, setInfo] = useState("");
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // for styling of geometry and text
    let vectorLayer = new OLVectorLayer({
      source,
      type: geometryType,
      style: new Style({
        fill: new Fill({
          color: "#bef50c",
          width: "100%",
        }),
        stroke: new Stroke({
          color: "#bef50c",
          width: 10,
        }),
        image: new Circle({
          radius: 14,
          fill: new Fill({
            color: "#bef50c",
          }),
        }),
        text: new Text({
          font: "14px Arial",
          fill: new Fill({
            color: "#fff",
          }),
          backgroundFill: new Fill({
            color: "#000",
          }),
          padding: [3, 3, 3, 3],
          overflow: true,
          offsetY: -20,
        }),
      }),
    });
    map.addLayer(vectorLayer);

    // To get the attribute Information
    // const handleClick = (e) => {
    //   const features = map.getFeaturesAtPixel(e.pixel);
    //   if (features.length > 0) {
    //     const feature = features[0];
    //     const attributes = feature.getProperties();
    //     setInfo(JSON.stringify(attributes));
    //     onData(JSON.stringify(attributes));
    //   }
    // };
    // map.on("click", handleClick);

    vectorLayer.setZIndex(zIndex);
    vectorLayer.setOpacity(opacity);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map, geometryType, source]);
  return null;
};
export default VectorLayer;
