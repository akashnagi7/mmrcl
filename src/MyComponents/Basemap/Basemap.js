/**
 * The below code is a React component called "Basemap" that renders a radio button group for selecting
 * drone image or google hybrid images
 */
import React from "react";
import { connect } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

function Basemap(props) {
  function handleBasemapChange(id) {
    console.log(id);
    props.basemapchangeName(id);
  }

  return (
    <div>
      <div>
        <div style={{ width: "224px" }}>
          <div
            className="card-header"
            style={{
              background: "#1C3B68",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="worldwide_icon.png"
              alt="basemap"
              height={"30px"}
              width={"30px"}
            />
          </div>
          <div className="card-body">
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.mybasemapname}
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="basemap"
                  control={<Radio />}
                  label="Drone Image"
                  onChange={() => handleBasemapChange("basemap")}
                />
                <FormControlLabel
                  value="openstreetmap"
                  control={<Radio />}
                  label="Google Hybrid"
                  onChange={() => handleBasemapChange("openstreetmap")}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    mybasemapname: state.basemapname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    basemapchangeName: (name) => {
      dispatch({ type: "BASEMAP_CHANGE_NAME", payload: name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Basemap);
