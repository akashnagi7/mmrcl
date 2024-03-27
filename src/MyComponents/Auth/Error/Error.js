/**
 * The Error component is a React component that displays an error message and an image when a page
 * does not exist.
 */
import React from "react";
import "./Error.css";

export const Error = () => {
  return (
    <>
      <div className="error-container">
        <img src="Error.jpg" className="error-image" alt="error" />
      </div>
      <h5 className="error-container-text">
        THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST
      </h5>
    </>
  );
};
