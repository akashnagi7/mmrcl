/* This code is importing three modules (`vector`, `xyz`, and `osm`) from three different files
(`vector.js`, `xyz.js`, and `osm.js`) and then exporting them as a single object. */
import vector from "./vector";
import xyz from "./xyz";
import osm from "./osm";

export { vector, xyz, osm };
