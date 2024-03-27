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
  }

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
      <section className="h-100 gradient-form page-layout nashiksmartcityfont">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="./nashik_smart_city_logo.jpg"
                          className="smart-city"
                          alt="nashik pie logo with text"
                          style={{
                            height: "60px",
                            // width: "110px",
                            cursor: "pointer",
                          }}
                          onClick={handleSmartLogo}
                        />
                        <img
                          src="G_Ram_Logo.svg"
                          className="g-ramgis"
                          alt="g-ram logo"
                        />

                        <h4
                          className="mt-1 mb-5 pb-1"
                          style={{ color: "#284b69" }}
                        >
                          G-RAM GIS
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
                            style={{ background: "#284b69", border: "none" }}
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="col-lg-6 d-flex align-items-center gradient-custom-2"
                    style={{ background: "#284b69" }}
                  >
                    <img
                      src="nms.jpg"
                      className="nashik-image"
                      alt="nashikImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
