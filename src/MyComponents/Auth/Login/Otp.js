import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export const Login = (props) => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [show, setShow] = useState(true);
  const handleSmartLogo = () => {
    console.log("Smart logo clicked!");
    window.location.replace("/dashboard");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Otp Verfication");
    console.log(otp);
    const data = {
      otp: otp,
      password: password,
      confirm_password: cpassword,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("/auth/reset-password", data, axiosConfig)
      .then((response) => {
        console.log(response.data.data);
        if (response.status == "200") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Password is Changed Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          setTimeout(function () {
            window.location.replace("/login");
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
            text: error.response.data.message,
          });
        }
      });
  };

  return (
    <>
      <section className="h-120 gradient-form page-layout nashiksmartcityfont">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-3 mx-md-4">
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
                          className="mt-1 mb-1 pb-1"
                          style={{ color: "#284b69" }}
                        >
                          G-RAM GIS
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <h4>OTP Verification </h4>
                        <p>
                          Enter the 6 Digit Verification code recieved on your
                          Email Id{" "}
                        </p>

                        <div className="form-outline mb-1">
                          <input
                            type="number"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Enter Otp"
                            onChange={(event) => setOtp(event.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Otp<span style={{ color: "red" }}>*</span>
                          </label>
                        </div>

                        <div className="form-outline mb-1">
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
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Enter Confirm Password"
                            onChange={(event) =>
                              setCpassword(event.target.value)
                            }
                          />
                          <label
                            className="form-label"
                            htmlFor="form2Example22"
                          >
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                          </label>
                        </div>

                        <div className="text-center pt-1 mb-1 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                            style={{ background: "#284b69", border: "none" }}
                          >
                            Verify
                          </button>
                        </div>

                        <p style={{ fontSize: "12px" }}>
                          password must contain 1 number (0-9) <br></br>
                          password must contain 1 uppercase letters <br></br>
                          password must contain 1 lowercase letters<br></br>
                          password must contain 1 non-alphanumeric number
                          <br></br>
                          password is 8-16 characters with no space
                        </p>
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
                      style={{ height: "670px" }}
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
