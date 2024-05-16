import React, { useState } from "react";
import "../../App.css";
import Map from "../Map/Map";
import { Layers, TileLayer, VectorLayer } from "../Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { LineString, Polygon, Point } from "ol/geom.js";
import { osm, vector } from "../Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import MVT from "ol/format/MVT";
import {
  Controls,
  FullScreenControl,
  ZoomControl,
  ScaleLineControl,
  MousePositionControl,
  ZoomToExtentControl,
} from "../Controls";
import "ol/ol.css";
import { useEffect } from "react";
import axios from "axios";
import OSM from "ol/source/OSM.js";
import TileWMS from "ol/source/TileWMS.js";
import { WMSTile } from "../Source/WMSTile";
import layerServer from "../Layers/layerServer";
import { Vector as VectorSource } from "ol/source";
import VectorTileSource from "ol/source/VectorTile";
import VectorTileLayer from "../Layers/VectorTileLayer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { connect } from "react-redux";
import { REACT_APP_BASE_URL } from "../Utils/index";
// import ECW from "@geostarters/openlayers-ecw";
import VectorLayersA from "./VectorLayersA";
import XYZ from "ol/source/XYZ";

const Mappartold = (props) => {
  const [center, setCenter] = useState([73.789803, 19.997454]);
  const [zoom, setZoom] = useState(16);
  const [dialogopen, setDialogOpen] = React.useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const [checkboxData, setCheckboxData] = useState(props.myname);
  function handleCheckboxChange(id) {
    const newCheckboxes = [...checkboxData];
    const checkboxIndex = newCheckboxes.findIndex(
      (checkbox) => checkbox.id === id
    );
    newCheckboxes[checkboxIndex].checked =
      !newCheckboxes[checkboxIndex].checked;
    setCheckboxData(newCheckboxes);
  }

  function handleOpacityChange(event, id) {
    const updatedCheckboxData = [...checkboxData];
    const checkboxIndex = updatedCheckboxData.findIndex(
      (checkbox) => checkbox.id === id
    );
    updatedCheckboxData[checkboxIndex].opacity = parseFloat(event.target.value);
    setCheckboxData(updatedCheckboxData);
    // console.log(checkboxData);
  }
  // props.nonSpatialData ||
  const [geojson, setGeojson] = useState(props.nonSpatialData);
  const [geojsonSpatial, setGeojsonSpatial] = useState(props.spQuery);

  // const vectorSource = new VectorSource({
  //   features: new GeoJSON().readFeatures(geojson),
  // });

  const handleClose = () => {
    setDialogOpen(false);
  };

  //For measure
  // const vectorSource = new VectorSource({
  //   format: new GeoJSON(),
  //   url: "http://192.168.1.17:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857",
  //   // url: "http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857",
  //   // url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857`,
  // });

  const [geometryType, setGeometryType] = useState("None");
  const handleGeometryChange = (event) => {
    setGeometryType(event.target.value);
  };

  const [vectorLayer, setVectorLayer] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [vectorSourceSpatial, setVectorSourceSpatial] = useState(null);

  useEffect(() => {
    if (geojson) {
      //  console.log(geojson, "99");
      const newVectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojson),
        geometryFunction: function (coordinates, geometryType) {
          if (geometryType === "Point") {
            // Return the point geometry
            return new Point(coordinates);
          } else if (geometryType === "LineString") {
            // Return the line string geometry
            return new LineString(coordinates);
          } else if (geometryType === "Polygon") {
            // Return the polygon geometry
            return new Polygon(coordinates);
          }
        },
      });

      setVectorSource(newVectorSource);
    }

    if (geojsonSpatial) {
      //  console.log(geojson, "99");
      const newVectorSourceSpatial = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonSpatial),
        geometryFunction: function (coordinates, geometryType) {
          if (geometryType === "Point") {
            // Return the point geometry
            return new Point(coordinates);
          } else if (geometryType === "LineString") {
            // Return the line string geometry
            return new LineString(coordinates);
          } else if (geometryType === "Polygon") {
            // Return the polygon geometry
            return new Polygon(coordinates);
          }
        },
      });

      setVectorSourceSpatial(newVectorSourceSpatial);
    }
  }, [geojson, geojsonSpatial]);

  // To get the list of Layers
  useEffect(() => {
    // console.log(props.nonSpatialData, "mappart");
    // console.log(geojson, "geoooojson");
    setGeojson(props.nonSpatialData);
    setGeojsonSpatial(props.spQuery);
    // console.log(geojson, "geoooojson after state");
    // console.log("sdkjnsjdnsd");

    // console.log("sdkjnsjdnsjdsdsdjnsjdnsjd");
    // axios.get("/services/GetLayerList").then((res) => {
    //   // console.log(res.data.data);
    //   setCheckboxData(res.data.data);
    // });
    // axios.get("/services/GetVectorTileLayerList").then((res) => {
    //   console.log(res.data.data);
    //   // setCheckboxData(res.data.data);
    // });
    console.log(props.spQuery, "non spatial query");

    axios
      .get(
        // "http://10.202.100.7:9005/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "http://172.16.0.10:9005/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "https://nashikgeoportal.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        "http://10.202.100.7:9005/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "http://202.189.224.222:9060/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "http://192.168.1.136:8080/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // "http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857"
        // `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:garden&outputFormat=application/json&srsname=EPSG:3857`
      )
      .then((res) => {
        //  console.log(res.data.features[0].properties);
      });
  }, [props.nonSpatialData, geojson, props.spQuery]);
  const [keys, SetKeys] = useState();
  const [values, SetValues] = useState();
  const handleDataFromChild = (data) => {
    // console.log(data);
    let attribute = JSON.parse(data);
    delete attribute.geometry;

    let key = Object.keys(attribute);
    SetKeys(key);

    let values = Object.values(attribute);
    SetValues(values);

    setDialogOpen(true);
  };
  const [showNasikLayer, setShowNasikLayer] = useState(false);
  const handleCheckboxNashikLayer = (event) => {
    setShowNasikLayer(event.target.checked);
  };

  const [vectorTileUrl, setVectorTileUrl] = useState();
  // const ecwLayer = new ECW({
  //   source: {
  //     url: "/baselayer/Nashik.ecw",
  //   },
  // });

  return (
    <>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          {/* <ecwLayer /> */}
          {/* {props.mybasemapname} */}
          {props.mybasemapname == "openstreetmap" ? (
            // <TileLayer source={osm()} zIndex={0} opacity={1} />
            <TileLayer
              source={
                new XYZ({
                  url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
                })
              }
              zIndex={0}
              opacity={1}
            />
          ) : (
            <>
              <TileLayer
                source={WMSTile(layerServer, { LAYERS: "nmscdcl:Nashik" })}
                zIndex={0}
                opacity={1}
                zoom={16}
              />
            </>
          )}

          {/* {showNasikLayer && (
            <TileLayer
              source={WMSTile(layerServer, { LAYERS: "nmscdcl:Nashik" })}
              zIndex={0}
              opacity={1}
            />
          )}{" "} */}

          {/* //! VectorTileLayers with Checkboxes */}
          {props.myname.map((checkbox) =>
            checkbox.checked
              ? (console.log(checkbox.opacity),
                (
                  <>
                    {/* {console.log(checkbox)} */}
                    <VectorTileLayer
                      key={checkbox.id}
                      opacity={checkbox.opacity}
                      onData={handleDataFromChild}
                      styling={checkbox.vector_tile_params.ImageWMSParams}
                      source={
                        new VectorTileSource({
                          format: new MVT(),
                          url: checkbox.vector_tile_params.url.trim(),
                          // url: "http://192.168.1.17:9022/geoserver/gwc/service/tms/1.0.0/nmscdcl%3Abuilding_footprint@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf",
                        })
                      }
                      // source2={
                      //   new VectorTileSource({
                      //     format: new MVT(),
                      //     url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/{z}/{y}/{x}.pbf",
                      //   })
                      // }
                    />
                  </>
                ))
              : null
          )}

          {props.myname.map((checkbox, index) =>
            checkbox.checked
              ? (console.log(checkbox.opacity),
                (
                  <TileLayer
                    key={checkbox.id}
                    opacity={checkbox.opacity}
                    source={WMSTile(layerServer, {
                      LAYERS: checkbox.vector_tile_params.LAYERS,
                      Tiled: true,
                    })}
                    zIndex={index + 1}
                  />
                ))
              : null
          )}
          {/* //! VectorLayers with Checkboxes */}
          {/* {checkboxData.map((checkbox) => (
          // console.log(checkbox.opacity),
          <VectorLayer
            key={checkbox.id}
            opacity={checkbox.opacity}
            zIndex={0}
            onData={handleDataFromChild}
            source={
              new VectorSource({
                format: new GeoJSON(),
                url: "http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:building_footprint&outputFormat=application/json&srsname=EPSG:3857",
              })
            }
          />
          ))} */}
          {/* //! Single Vector Layer */}

          {props.nonSpatialQuery ? (
            <VectorLayer source={vectorSource} opacity={1} />
          ) : null}

          {props.spQuery ? (
            <VectorLayer source={vectorSourceSpatial} opacity={1} />
          ) : null}

          {/* {props.myname.map((checkbox, index) =>
                checkbox.checked
                  ? (console.log(checkbox.opacity),
                    (
                      <VectorLayersA
                        key={checkbox.id}
                        opacity={checkbox.opacity}
                        zIndex={0}
                        // onData={handleDataFromChild}
                        source={
                          new VectorSource({
                            format: new GeoJSON(),
                            // url: checkbox.vector_tile_params.url.trim().replace("192.168.1.17","202.189.224.222"),
                            // url: `http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:abd_area_boundary&outputFormat=application/json&srsname=EPSG:32643`,
                            // url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=${checkbox.vector_tile_params.LAYERS}&outputFormat=application/json&srsname=${(checkbox.vector_tile_params.srs).replace(":","%3A")}`,
                            url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=${checkbox.vector_tile_params.LAYERS}&outputFormat=application/json&srsname=EPSG:900913`,
                            // url: `http://202.189.224.222:9022/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:watertretmentplant&outputFormat=application/json&srsname=EPSG%3A32643`,
                            // url: `${REACT_APP_BASE_URL}/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=nmscdcl:watertretmentplant&outputFormat=application/json&srsname=EPSG:900913`,
                          })
                        }
                        geometryType={props.mygeometryType}
                        strokecolor={props.mystrokecolor}
                        fillcolor={props.myfillcolor}
                        strokewidth={props.mystrokewidth}
                      />
                    ))
                  : null
              )} */}

          {/* {vectorSource && <VectorLayer source={vectorSource} opacity={1} />} */}

          {/* <VectorLayersA
            source={vectorSource}
            geometryType={geometryType}
            geometryType={props.mygeometryType}
            // onData={handleDataFromChild}
            opacity={1}
            strokecolor={props.mystrokecolor}
            fillcolor={props.myfillcolor}
            strokewidth={props.mystrokewidth}
          /> */}
        </Layers>

        {/* {props.myname.map((checkbox) =>
          checkbox.checked
            ? (console.log(checkbox.opacity),
              (
                <>
                  {console.log(
                    `` +
                      checkbox.vector_tile_params.url +
                      `/` +
                      checkbox.vector_tile_params.LAYERS.replace(":", "%3A") +
                      `@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf`
                  )}
                  <VectorTileLayer
                    key={checkbox.id}
                    opacity={checkbox.opacity}
                    // onData={handleDataFromChild}
                    source={
                      new VectorTileSource({
                        format: new MVT(),
                        // url: `http://192.168.1.17:9022/geoserver/gwc/service/tms/1.0.0/nmscdcl%3Abuilding_footprint@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf`,
                        // url: `http://192.168.1.17:9022/geoserver/gwc/service/tms/1.0.0/nmscdcl%3Aroad_cline@EPSG%3A4326/{z}/{x}/{-y}.pbf`,
                        url:
                          "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
                          "ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf",
                        // url:
                        //   `` +
                        //   checkbox.vector_tile_params.url +
                        //   `/` +
                        //   checkbox.vector_tile_params.LAYERS.replace(
                        //     ":",
                        //     "%3A"
                        //   ) +
                        //   `@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf`,
                      })
                    }
                  />
                </>
              ))
            : null
        )} */}

        <Controls>
          <FullScreenControl />
          <ZoomControl />
          <MousePositionControl />
          <ScaleLineControl />
          <ZoomToExtentControl />
        </Controls>
      </Map>

      <div>
        {/* //! Checkboxes for all layers display*/}
        {/* {checkboxData.map((checkbox) => (
          <div key={checkbox.id}>
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(checkbox.id)}
            />
            <span>{checkbox.title}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={checkbox.opacity}
              onChange={(event) => handleOpacityChange(event, checkbox.id)}
            />
          </div>
        ))} */}

        {/* //! draw feature based on geometry*/}
        {/* <div className="input-group">
          <label className="input-group-text" htmlFor="type">
            Geometry type:
          </label>
          <select
            className="form-select"
            value={geometryType}
            onChange={handleGeometryChange}
          >
            <option value="None">None</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
          </select>
        </div> */}

        {/* //! display attribute table info */}
        <Dialog
          open={dialogopen}
          onClose={handleClose}
          // aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              width: "500px",
              height: "300px",
              // overflow: "hidden",
              // overflowY: "auto",
            },
          }}
        >
          <div
            style={{ minWidth: "300px", overflow: "hidden", overflowY: "auto" }}
          >
            <div
              class="modal-header"
              style={{ padding: "10px", background: "#1C3B68", color: "white" }}
            >
              <h5 class="modal-title">{"Attribute Information"}</h5>
              <IconButton className="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </div>

            <div class="modal-body">
              <table
                className="table table-striped"
                style={{
                  borderCollapse: "collapse",
                  border: "1px solid black",
                }}
              >
                <tbody>
                  {keys &&
                    keys.map((header, index) => (
                      <tr key={index}>
                        <th
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            width: "225px",
                          }}
                        >
                          {header.replace("_", " ").toUpperCase()}
                        </th>
                        {values && (
                          <td
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              width: "300px",
                            }}
                          >
                            {values[index] != null ? (
                              typeof values[index] === "string" &&
                              values[index].includes("http") ? (
                                <a
                                  href={values[index]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {values[index]}
                                </a>
                              ) : (
                                JSON.stringify(values[index]).slice(1, -1)
                              )
                            ) : (
                              "N/A"
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Dialog>

        {/* <table style={{ display: "flex" }}>
                {keys && (
                  <thead>
                    {keys.map((header, index) => (
                      <tr>
                        <th key={index}>{header.replace("_"," ").toUpperCase()}</th>
                      </tr>
                    ))}
                  </thead>
                )}
                {values && (
                  <tbody>
                    {values.map((tableData, index) => (
                      <tr>
                        <td key={index}>
                          {tableData != null ? JSON.stringify(tableData) : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table> */}

        {/* {values && (
          <tbody>
            {values.map((tableData, index) => (
              <tr key={index}>
                {tableData &&
                  Object.values(tableData).map((value, valueIndex) => (
                    <td key={valueIndex}>
                      {value != null ? value.toString() : "N/A"}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        )} */}

        {/* {values && (
          <tbody>
            {values.map((tableData, index) => (
              <tr key={index}>
                {tableData &&
                  Object.keys(tableData).map((key) => (
                    <td key={key}>
                      {tableData != null ? JSON.stringify(tableData[key]) : "N/A"}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        )} */}

        {/* //! Display Nashik Image Data */}
        {/* <label>
          <input
            type="checkbox"
            checked={showNasikLayer}
            onChange={handleCheckboxNashikLayer}
          />
          Show Nashik Layer
        </label> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myname: state.name,
    myvectoredittoggle: state.vectoredittoggle,
    mygeometryType: state.geometryType,
    mystrokecolor: state.strokecolor,
    myfillcolor: state.fillcolor,
    mystrokewidth: state.strokewidth,
    mybasemapname: state.basemapname,
    nonSpatialData: state.nonSpatialData,
    nonSpatialQuery: state.nonSpatialQuery,
    nonSpatialQueryLayer: state.nonSpatialQueryLayer,
    spQuery: state.spQuery,
  };
};

export default connect(mapStateToProps)(Mappartold);
