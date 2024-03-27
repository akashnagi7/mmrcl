/**
 * The below code is a React component that handles the editing functionality for vector layers in a
 * map application.
 */
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { REACT_APP_BASE_URL } from "../../Utils/index";

const Vectoredit = (props) => {
  const [checkboxData, setCheckboxData] = useState(props.myname || []);

  const [layershow, setLayerShow] = useState(false);
  const [layermessage, setLayerMessage] = useState("");

  const handlelayerClose = () => {
    setLayerShow(false);
  };

  const [vectordrawtoggle, setVectordrawtoggle] = useState(
    props.myvectordrawtoggle
  );

  const [vectoredittoggle, setVectoredittoggle] = useState(
    props.myvectoredittoggle
  );

  const [vectormeasuretoggle, setVectormeasuretoggle] = useState(
    props.myvectormeasuretoggle
  );

  const handlevectoredittoggleChange = (event) => {
    const chklength = props.myname.filter(
      (person) => person.checked == true
    ).length;
    if (chklength !== 1) {
      setLayerShow(true);
      setLayerMessage("Select only one layer");
    } else if (props.myvectormeasuretoggle) {
      setLayerShow(true);
      setLayerMessage("Already active in measure tools");
    } else if (props.myvectordrawtoggle) {
      setLayerShow(true);
      setLayerMessage("Already active in draw tools");
    } else {
      setVectoredittoggle(!vectoredittoggle);
      props.changevectoredittoggle(!vectoredittoggle);
      props.changegeometryType("None");
    }

    // if (!vectoredittoggle) {
    //   const chklength = props.myname.filter(person => person.checked == true).length;
    //   if (chklength !== 1) {
    //     setLayerShow(true);
    //     // console.log('select only one layer');
    //   } else {
    //     const checkedone = props.myname.filter(person => person.checked == true)[0]
    //     console.log(checkedone);
    //   }
    // }
  };

  const [geometryType, setGeometryType] = useState(props.mygeometryType);
  const handleGeometryChange = (event) => {
    setGeometryType(event.target.value);
    props.changegeometryType(event.target.value);
  };

  const [strokecolor, setStrokecolor] = useState(props.mystrokecolor);
  const handleStrokecolorChange = (event) => {
    setStrokecolor(event.target.value);
    props.changestrokecolor(event.target.value);
  };

  const [strokewidth, setStrokewidth] = useState(props.mystrokewidth);
  const handleStrokewidthChange = (event) => {
    setStrokewidth(event.target.value);
    props.changestrokewidth(event.target.value);
  };

  const updateVectorLayerToGeoJSON = (event) => {
    props.changeupdatevectorlayer(!props.myupdatevectorlayer);
  };

  const [fillcolor, setFillcolor] = useState(props.myfillcolor);
  const handleFillcolorChange = (event) => {
    setFillcolor(event.target.value);
    props.changefillcolor(event.target.value);
  };

  function handleNone() {
    console.log("None");
    setGeometryType("None");
    props.changegeometryType("None");
  }

  function handlePoint() {
    console.log("Handle Point");
    setGeometryType("Point");
    props.changegeometryType("Point");
  }

  function handleLine() {
    console.log("Handle Line");
    setGeometryType("LineString");
    props.changegeometryType("LineString");
  }

  function handlePolygon() {
    console.log("Handle Polygon");
    setGeometryType("Polygon");
    props.changegeometryType("Polygon");
  }

  function handleCircle() {
    console.log("Handle Circle");
    setGeometryType("Circle");
    props.changegeometryType("Circle");
  }

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          {/* <div className="col-md-12" >
                        <label className="input-group-text" htmlFor="type">
                            Draw Tool
                        </label>
                    </div> */}
          {/* <div className="col-md-12">Shape</div> */}

          {/* <div className="col-md-12">Select Layer</div>
          <div className="col-md-12">
            <select
              className="form-select"
            // value={geometryType}
            // onChange={handleGeometryChange}
            >
              {checkboxData.map((checkbox) =>
                checkbox.checked ? (
                  <>
                    {console.log(checkbox)}
                    <option value={checkbox.id}>{checkbox.title}</option>
                  </>
                ) : null
              )}
            </select>
          </div> */}

          <div
            className="col-md-12"
            style={{ paddingLeft: "40px", transform: "scale(0.8)" }}
          >
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="vectoredittoggle"
                checked={vectoredittoggle}
                onChange={handlevectoredittoggleChange}
              />
              <label class="form-check-label" for="vectoredittoggle">
                Edit Mode
              </label>
            </div>
          </div>

          {vectoredittoggle ? (
            <>
              <div
                className="col-md-12"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <select
              className="form-select"
              value={geometryType}
              onChange={handleGeometryChange}
            >
              <option value="None">None</option>
              <option value="LineString">LineString</option>
              <option value="Polygon">Polygon</option>
              <option value="Circle">Circle</option>
            </select> */}

                <ToggleButtonGroup
                  type="radio"
                  name="drawoptions"
                  style={{ marginTop: "5px" }}
                >
                  <Tooltip title="None">
                    <ToggleButton id="tbg-radio-0" onClick={handleNone}>
                      <i class="fa fa-ban"></i>
                    </ToggleButton>
                  </Tooltip>

                  <Tooltip title="Draw Point">
                    <ToggleButton
                      id="tbg-radio-1"
                      onClick={handlePoint}
                      disabled={
                        props.myeditgeometryType == "Point" ? false : true
                      }
                    >
                      <i class="fa fa-circle"></i>
                    </ToggleButton>
                  </Tooltip>

                  <Tooltip title="Draw Linestring">
                    <ToggleButton
                      id="tbg-radio-2"
                      onClick={handleLine}
                      disabled={
                        props.myeditgeometryType == "LineString" ? false : true
                      }
                    >
                      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Draw Polygon">
                    <ToggleButton
                      id="tbg-radio-3"
                      onClick={handlePolygon}
                      disabled={
                        props.myeditgeometryType == "Polygon" ? false : true
                      }
                    >
                      <i class="fa fa-square-o" aria-hidden="true"></i>
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Draw Circle">
                    <ToggleButton
                      id="tbg-radio-4"
                      onClick={handleCircle}
                      disabled={
                        props.myeditgeometryType == "Circle" ? false : true
                      }
                    >
                      <i class="fa fa-circle-o" aria-hidden="true"></i>
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>
              </div>

              <div className="col-md-12">Stroke width</div>
              <div className="col-md-12">
                <select
                  className="form-select"
                  value={strokewidth}
                  onChange={handleStrokewidthChange}
                >
                  <option value="1">1</option>
                  <option value="1.25">1.25</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="col-md-12">Stroke color</div>
              <div className="col-md-12">
                <input
                  type="color"
                  id="colorpicker"
                  className="col-md-12"
                  value={strokecolor}
                  onChange={handleStrokecolorChange}
                />
              </div>

              <div className="col-md-12">Fill color</div>
              <div className="col-md-12">
                <input
                  type="color"
                  id="fillcolorpicker"
                  className="col-md-12"
                  value={fillcolor}
                  onChange={handleFillcolorChange}
                />
              </div>

              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6">
                    <button
                      type="button"
                      class="btn btn-block btn-success"
                      onClick={updateVectorLayerToGeoJSON}
                    >
                      Save
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button type="button" class="btn btn-block btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Modal show={layershow} onHide={handlelayerClose} centered>
        <Modal.Header
          closeButton
          style={{
            background: "#5cb85c",
            color: "white",
          }}
        >
          {layermessage}
        </Modal.Header>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    myname: state.name,
    myvectordrawtoggle: state.vectordrawtoggle,
    myvectoredittoggle: state.vectoredittoggle,
    myvectormeasuretoggle: state.vectormeasuretoggle,
    mygeometryType: state.geometryType,
    myeditgeometryType: state.editgeometryType,
    mystrokecolor: state.strokecolor,
    myfillcolor: state.fillcolor,
    mystrokewidth: state.strokewidth,
    myupdatevectorlayer: state.updatevectorlayer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changevectordrawtoggle: (vectordrawtoggle) => {
      dispatch({ type: "CHANGE_VECTORDRAWTOGGLE", payload: vectordrawtoggle });
    },
    changevectoredittoggle: (vectoredittoggle) => {
      dispatch({ type: "CHANGE_VECTOREDITTOGGLE", payload: vectoredittoggle });
    },
    changevectormeasuretoggle: (vectormeasuretoggle) => {
      dispatch({
        type: "CHANGE_VECTORMEASURETOGGLE",
        payload: vectormeasuretoggle,
      });
    },
    changeeditgeometryType: (name) => {
      dispatch({ type: "CHANGE_EDITGEOMETRYTYPE", payload: name });
    },
    changegeometryType: (name) => {
      dispatch({ type: "CHANGE_GEOMETRYTYPE", payload: name });
    },
    changestrokecolor: (strokecolor) => {
      dispatch({ type: "CHANGE_STROKECOLOR", payload: strokecolor });
    },
    changefillcolor: (fillcolor) => {
      dispatch({ type: "CHANGE_FILLCOLOR", payload: fillcolor });
    },
    changestrokewidth: (strokewidth) => {
      dispatch({ type: "CHANGE_STROKEWIDTH", payload: strokewidth });
    },
    changeupdatevectorlayer: (updatevectorlayer) => {
      dispatch({ type: "UPDATE_VECTORLAYER", payload: updatevectorlayer });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vectoredit);
