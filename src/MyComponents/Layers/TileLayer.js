/**
 * This is a React component that adds a Tile layer to an OpenLayers map.
 */
import { useContext, useEffect } from "react";
import MapContext from "../Map/MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0, opacity }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    let tileLayer = new OLTileLayer({
      source,
      zIndex,
      opacity,
    });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    tileLayer.setOpacity(opacity);
    return () => {
      if (map) {
        map.removeLayer(tileLayer);
      }
    };
  }, [map, opacity]);
  return null;
};
export default TileLayer;
