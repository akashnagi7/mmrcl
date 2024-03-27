/**
 * The function exports a default vector source using the OpenLayers library in JavaScript.
 */
import { Vector as VectorSource } from "ol/source";

function vector({ features }) {
  return new VectorSource({
    features,
  });
}

export default vector;
