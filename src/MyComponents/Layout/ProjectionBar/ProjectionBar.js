/**
 * The `ProjectionBar` component is a React component that renders and displays the mouse position.
 */
import React from "react";
import "./ProjectionBar.css";

const ProjectionBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Add this line to center vertically
        position: "absolute",
        top: "92.5%",
        left: "82%",
        transform: "translate(-50%, -50%)", // Center horizontally and vertically
        background: "white",
        opacity: 0.8,
        width: "400px", // Set a fixed width for the container
        fontWeight: "300",
      }}
    >
      {/* <div style={{ marginRight: "400px" }}> Projection WGS 84 (EPSG:4326)</div> */}
      {/* <div style={{ marginRight: "400px" }}> </div> */}
      <div id="mouse-position"></div>
    </div>
  );
};

export default ProjectionBar;
