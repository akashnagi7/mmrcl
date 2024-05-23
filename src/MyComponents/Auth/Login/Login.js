/**
 * The Login component is a form that allows users to enter their username and password to log in, and
 * it includes error and success modals for displaying login status.
 */
import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const handleSmartLogo = () => {
    console.log("Smart logo clicked!");
    window.location.replace("/dashboard");
  };

  const handleForgotPassword = () => {
    console.log("handle forgot password");
    window.location.replace("/forgot");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("After Submission");
    console.log(userName);
    const data = {
      username: userName,
      password: password,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/auth/login/", data, axiosConfig)
      .then((response) => {
        console.log(response.data.data);
        if (response.status == "200") {
          // store the details and redirect
          console.log(response.data.data.groups[0].name);
          // console.log(props.firstname);
          // props.changefirstname("sasas");
          let acessToken = response.data.data.access;
          let refreshToken = response.data.data.refresh;
          sessionStorage.setItem("acessToken", "Bearer " + acessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          sessionStorage.setItem("fname", response.data.data.username);
          sessionStorage.setItem(
            "groupname",
            response.data.data.groups[0].name
          );
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged In Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(function () {
            window.location.replace("/home");
          }, 3000);
        } else {
          // Not allowed to store details
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        console.log(error.response.status);
        if (error.response.status == 400) {
          Swal.fire({
            icon: "error",
            // title: "Oops...",
            title: "Invalid Credentials!",
            text: "Please Check Your Username and Password",
          });
        }
      });
  };

  return (
    <>
      {/* <section
        className="h-100 gradient-form page-layout nashiksmartcityfont"
        style={{ height: "100vh" }}
      >
        <div className="container py-5 h-90">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="mmrclLogo.svg"
                          className="g-ramgis"
                          alt="g-ram logo"
                        />

                        <h4
                          className="mt-1 mb-5 pb-1"
                          style={{ color: "rgb(4, 17, 51)" }}
                        >
                          MMRCL GEOPORTAL
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <input
                            // type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Enter Username"
                            onChange={(event) =>
                              setUserName(event.target.value)
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example11"
                          >
                            Username<span style={{ color: "red" }}>*</span>
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Password<span style={{ color: "red" }}>*</span>
                          </label>
                        </div>

                        <div className="form-outline mb-1">
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                            style={{ fontStyle: "italic", cursor: "pointer" }}
                            onClick={handleForgotPassword}
                          >
                            <u>Forgot Password?</u>
                          </label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                            style={{
                              background: "rgb(4, 17, 51)",
                              border: "none",
                            }}
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 d-flex align-items-center gradient-custom-2"
                    style={{ background: "rgb(4, 17, 51)" }}
                  >
                    <img
                      src="mumbaiCityLogo.png"
                      className="nashik-image"
                      alt="nashikImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <div
        style={{ display: "flex", height: "100vh" }}
        className="login-form fontLogin"
      >
        {/* Card */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "65%",
            height: "80%",
            borderRadius: "10px",
            boxShadow:
              " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* Left side containing username and password */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F4F6F9",
            }}
          >
            <div className="text-center" style={{ paddingBottom: "20px" }}>
              <img
                src="mmrclLogo.svg"
                className="g-ramgis"
                alt="mmrclLogo"
                style={{ height: "80px", marginRight: "10px" }}
              />

              <img
                src="line2.png"
                className="g-ramgis"
                alt="line2"
                style={{ height: "50px", width: "1px" }}
              />
              <img
                src="zicaLogo.png"
                className="g-ramgis"
                alt="zicaLogo"
                style={{ marginLeft: "20px" }}
              />
            </div>

            <div
              className="card"
              style={{
                backgroundColor: "white",
                height: "350px",
                width: "340px",
              }}
            >
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <h5 className="mb-4" style={{ paddingTop: "20px" }}>
                    Login to your account
                  </h5>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="form-label"
                      style={{ fontWeight: "400" }}
                    >
                      Username
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="form2Example11"
                      placeholder="Enter Username"
                      onChange={(event) => setUserName(event.target.value)}
                      style={{ fontSize: "small" }}
                    />
                  </div>
                  <div className="mb-2">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <label
                        htmlFor="password"
                        className="form-label"
                        style={{ fontWeight: "400", margin: "0" }}
                      >
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={(event) => setPassword(event.target.value)}
                      style={{ fontSize: "small" }}
                    />
                  </div>
                  <div className="mb-1">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "10px",
                      }}
                    >
                      <span
                        style={{ cursor: "pointer", color: "#1570EF" }}
                        onClick={handleForgotPassword}
                      >
                        Forgot Password ?
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn"
                      style={{
                        background: "#E30613",
                        color: "#FFFFFF",
                        borderRadius: "20px",
                        paddingLeft: "100px",
                        paddingRight: "100px",
                        fontSize: "12px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      Login Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right side containing image */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#014364",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative", // Set position to relative to allow absolute positioning of text
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "68%",
                left: "20%",
                transform: "translateX(-14%)",
                color: "white",
              }}
            >
              <h5>
                Welcome to <b>Geo-portal Line 11</b>
              </h5>
              <p style={{ fontSize: "12px" }}>
                Join us to boost Metro Line 11's growth! Our platform offers
                customized Geospatial data and easy tools for informed
                decisions. Dive into our maps and dashboards to shape Mumbai's
                transit future.
              </p>
            </div>
            <img
              src="mmrclLogin.png"
              className="g-ramgis"
              alt="zicaLogo"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
        {/* Background layout */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        ></div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#014364",
          }}
        ></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    firstname: state.firstname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changefirstname: (fname) => {
      dispatch({ type: "CHANGE_FIRSTNAME", payload: fname });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
