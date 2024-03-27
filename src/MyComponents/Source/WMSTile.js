/**
 * The function exports a helper function that creates a new TileWMS object with the given URL and
 * parameters.
 */
import React from "react";
import TileWMS from "ol/source/TileWMS";
export const WMSTile = (url, params) => {
  return new TileWMS({ url, params });
};
