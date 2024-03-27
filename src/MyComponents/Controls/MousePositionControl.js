/**
 * The `MousePositionControl` component is a React component that adds a mouse position control to an
 * OpenLayers map.
 */
import { useContext, useEffect, useState } from "react";
import { MousePosition } from "ol/control";
import { createStringXY } from "ol/coordinate.js";
import MapContext from "../Map/MapContext";
import "./Mouseposition.css";

const MousePositionControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    // let MousePositionControl = new MousePosition({});

    let MousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: "EPSG:4326",
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: "mousebottomdown",
      target: document.getElementById("mouse-position"),
    });
    map.controls.push(MousePositionControl);

    return () => map.controls.remove(MousePositionControl);
  }, [map]);

  return null;
};

export default MousePositionControl;
