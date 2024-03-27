/**
 * The Legend component is a React component that displays a legend for active layers and non-spatial
 * queries.
 */
import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Legend(props) {
  const [checkboxData, setCheckboxData] = useState(props.myname || []);
  const [nonSpatialQueryData, setNonSpatialQueryData] = useState(
    props.nonSpatialQuery
  );

  return (
    <>
      <div>
        {/* Legend Display of layers that are active */}
        {checkboxData.map((checkbox) =>
          checkbox.checked ? (
            <div className="col-md-12" key={checkbox.id}>
              <div
                className="card-body"
                style={{
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  transform: "scale(0.8)",
                }}
              >
                <span style={{ marginRight: "8px" }}>{checkbox.title}</span>
                <img
                  // src={`http://10.202.100.7:9005/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  // src={`http://172.16.0.10:9005/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  src={`https://nashikgeoportal.com/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  // src={`http://202.189.224.222:9060/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  // src={`http://192.168.1.136:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  // src={`http://202.189.224.222:9023/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`}
                  alt="Legend"
                  style={{ marginLeft: "8px" }}
                />
                {console.log(
                  // `http://10.202.100.7:9005/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`
                  // `http://172.16.0.10:9005/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`
                  `https://nashikgeoportal.com/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`
                  // `http://202.189.224.222:9060/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`
                  // `http://192.168.1.136:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH40=&HEIGHT=40&LAYER=${checkbox.vector_tile_params.LAYERS}`
                )}
              </div>
            </div>
          ) : null
        )}
        {console.log(nonSpatialQueryData)}
        {/* Legend Display of Non Spatial Query that are active */}
      </div>
      <div style={{ transform: "scale(0.8)" }}>
        {props.nonSpatialQuery ? (
          <span style={{ marginRight: "4px", marginTop: "4px" }}>
            {props.nonSpatialQuery}
          </span>
        ) : null}
        {props.nonSpatialQuery ? (
          <span
            style={{
              display: "inline-block",
              width: "1em",
              height: "1em",
              backgroundColor: "blue",
            }}
          />
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    myname: state.name,
    nonSpatialQuery: state.nonSpatialQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (name) => {
      dispatch({ type: "CHANGE_NAME", payload: name });
    },
  };
};
//   console.log(LayerData);

export default connect(mapStateToProps, mapDispatchToProps)(Legend);
