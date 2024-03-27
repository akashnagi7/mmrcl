/**
 * The `Protected` component checks if a user is logged in and redirects them to the home page if they
 * are not.
 */
import React from "react";
import { Outlet } from "react-router-dom";

const Protected = () => {
  let sessionLogin = sessionStorage.getItem("acessToken");
  // console.log(sessionLogin, "protected");
  let loggedIn = sessionLogin;

  if (loggedIn == null) {
    return window.location.replace("/home");
  } else {
    return <Outlet></Outlet>;
  }
};

export default Protected;
