/**
 * The function exports a default instance of the OpenLayers OSM source.
 */
import * as olSource from "ol/source";

function osm() {
  return new olSource.OSM();
}

export default osm;
