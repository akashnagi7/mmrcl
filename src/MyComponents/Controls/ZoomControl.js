/**
 * This is a React component that adds a zoom control to an OpenLayers map.
 */
import React, { useContext, useEffect, useState } from "react";
import { Zoom } from "ol/control";
import MapContext from "../Map/MapContext";

const ZoomControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let ZoomControl = new Zoom({});

    map.controls.push(ZoomControl);

    return () => map.controls.remove(ZoomControl);
  }, [map]);

  return null;
};

export default ZoomControl;
