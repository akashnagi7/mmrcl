/**
 * This is a React component that adds a ZoomToExtent control to an OpenLayers map.
 */
import React, { useContext, useEffect, useState } from "react";
import MapContext from "../Map/MapContext";
import { ZoomToExtent, defaults as defaultControls } from "ol/control.js";

const ZoomToExtentControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let ZoomToExtentControl = new ZoomToExtent({
      // extent: [8214851, 2277642, 8215510, 2268762],
      extent: [8215251, 2275652, 8215300, 2270762],
      // extent: [8209198, 2272007, 8217733, 2276018],
    });

    map.controls.push(ZoomToExtentControl);

    return () => map.controls.remove(ZoomToExtentControl);
  }, [map]);

  return null;
};

export default ZoomToExtentControl;
