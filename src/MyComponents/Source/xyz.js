/**
 * The function exports an XYZ source object from the OpenLayers library with specified URL,
 * attributions, and maximum zoom level.
 */
import * as olSource from "ol/source";

function xyz({ url, attributions, maxZoom }) {
  return new olSource.XYZ({ url, attributions, maxZoom });
}

export default xyz;
