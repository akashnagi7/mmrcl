/**
 * This is a React component that adds a scale line control to an OpenLayers map.
 */
import React, { useContext, useEffect, useState } from "react";
import { ScaleLine } from "ol/control";
import MapContext from "../Map/MapContext";

const ScaleLineControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let ScaleLineControl = new ScaleLine({
      units: "metric",
      bar: true,
      steps: 4,
      text: true,
      minWidth: 80,
    });

    map.controls.push(ScaleLineControl);
    return () => map.controls.remove(ScaleLineControl);
  }, [map]);

  return null;
};

export default ScaleLineControl;
