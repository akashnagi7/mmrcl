/* The above code is a React component called "Dashboard". It is a part of a larger application and is
responsible for rendering the dashboard page. */
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Button from "react-bootstrap/Button";
import nashikOne from "../Dashboard/nashikOne.png";
import nashikOneLeft from "../Dashboard/leftSide.png";
import nashikOneRight from "../Dashboard/rightSide.png";
import nashikTwo from "../Dashboard/nashikTwo.png";
import nashikThree from "../Dashboard/nashikthree.svg";
// import nashikFour from "../Dashboard/nashikfour.svg";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import counterData from "../Counter/counter.json";
import axios from "axios";
import Swal from "sweetalert2";
import "./Dashboard.css";
import Modal from "react-bootstrap/Modal";
import formfullName from "../Dashboard/formFullName.svg";
import formEmail from "../Dashboard/formEmail.svg";
import formPhoneNumber from "../Dashboard/formPhone.svg";
import twitterContact from "../Dashboard/twitterContact.svg";
import instagramContact from "../Dashboard/instagramContact.svg";
import facebookContact from "../Dashboard/facebookContact.svg";
import leftSideArrow from "../Dashboard/leftSideArrow.svg";
import rightSideArrow from "../Dashboard/rightSideArrow.svg";
// Header Material Component
const drawerWidth = 200;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Dashboard = ({ name, ...props }) => {
  const headerHeight = 20; // Replace with the actual height of your header
  const footerHeight = 55; // Replace with the actual height of your footer

  const screenHeight = `${window.innerHeight - headerHeight - footerHeight}px`;
  function handleLogout() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  function handleLogin() {
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const [fname, setFname] = useState("");
  const [visitorCount, setVisitorCount] = useState("");

  useEffect(() => {
    const storedFname = sessionStorage.getItem("fname");
    setFname(storedFname);

    //hit the counter to increase the number of visits
    axios
      .post("core/post-visitor-api")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // get the number of visits
    axios
      .get("core/get-visitor-api")
      .then((res) => {
        console.log(res.data.count);
        setVisitorCount(res.data.count);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  function handleGisMap() {
    console.log("handle gis map");
    window.location.replace("/home");
  }

  function handleAboutUs() {
    console.log("handleAboutUs");
    window.location.replace("/about");
  }

  function handleContactUs() {
    console.log("handleContactUs");
    // window.location.replace("/contact");
  }

  function handleGramLogoClick() {
    console.log("handleGramLogoClick");
    window.location.replace("/dashboard");
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle Feedback Part
  // const [showFeedback, setShowFeedback] = useState(false);
  // const handleCloseFeedback = () => setShowFeedback(false);
  // const handleShowFeedback = () => setShowFeedback(true);

  //Handle Contact us Part
  const [showContact, setShowContact] = useState(false);
  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  const [fullname, setFullName] = useState();
  const handleFullNameChange = (event) => {
    console.log(event.target.value);
    setFullName(event.target.value);
  };
  const [phoneNumber, setPhoneNumber] = useState();
  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
    }
  };
  const [email, setEmail] = useState();
  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const [comments, setComments] = useState();
  const handleCommentsChange = (event) => {
    console.log(event.target.value);
    setComments(event.target.value);
  };

  const [fileFeedback, setFileFeedback] = useState(null);

  const handleFileFeedbackChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileFeedback(selectedFile);
  };

  const [fontSize, setFontSize] = useState(12);
  const [scale, setScale] = useState(0.8);

  function handleIncrement() {
    console.log("Increment");
    setFontSize(14);
    setScale(0.8);
  }
  function handleDecrement() {
    console.log("Decrement");
    setFontSize(10);
    setScale(0.7);
  }

  function handleHomeLogo() {
    console.log("home logo");
    window.location.replace("/dashboard");
  }

  function handleSubmit(event) {
    console.log("Handle Submit");
    event.preventDefault();
    console.log("After Submission");
    const data = {
      fullName: fullname,
      phoneNumber: phoneNumber,
      email: email,
      file: fileFeedback,
      comment: comments,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: sessionStorage.getItem("acessToken"),
      },
    };

    axios
      .post("core/post-feedback", data, axiosConfig)
      .then((response) => {
        console.log(response.data.data);
        Swal.fire({
          icon: "success",
          title: "Your Feedback is Submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error.response, "This is error message");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  }

  function handleRightClick(){

  }

  return (
    <>
      <AppBar position="flex" sx={{ bgcolor: "#ffffff" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              // fontSize: `${fontSize}px`,
              fontFamily: "poppins, sans-serif",
              color: "black",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            <img
              src="./mmrclLogo.png"
              alt="GRam Logo"
              height={"45px"}
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={handleHomeLogo}
            />
            <img
              src="./zicaLogo.png"
              alt="GRam Logo"
              height={"32px"}
              style={{
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={handleHomeLogo}
            />
            MMRCL GEOPORTAL
          </Typography>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 4,
              textAlign: "center",
              fontSize: `${fontSize + 3}px`,
              // fontFamily: "poppins, sans-serif",
              fontWeight: "600",
              color: "black",
            }}
          >
            {/* MMRCL GEOPORTAL */}
          </Typography>

          <Button
            variant="light"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
              fontWeight: "600",
            }}
            // onClick={handleAboutUs}
          >
            ABOUT US
          </Button>
          <Button
            variant="light"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
              fontWeight: "600",
            }}
            onClick={handleShowContact}
          >
            CONTACT US
          </Button>
          <Button
            variant="light"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
              fontWeight: "600",
            }}
            onClick={handleShow}
          >
            FEEDBACK
          </Button>
          <Button
            variant="light"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
              fontWeight: "600",
            }}
            onClick={handleGisMap}
          >
            GIS SYSTEM
          </Button>

          {fname ? (
            <Button
              onClick={handleLogout}
              style={{
                transform: `scale(${scale})`,
                backgroundColor: "#E30613",
                padding: "12px",
                paddingLeft: "32px",
                paddingRight: "32px",
                border: "none",
                borderRadius: "30px",
                fontFamily: "poppins, sans-serif",
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={handleLogin}
              style={{
                transform: `scale(${scale})`,
                backgroundColor: "#E30613",
                padding: "12px",
                paddingLeft: "32px",
                paddingRight: "32px",
                border: "none",
                borderRadius: "30px",
                fontFamily: "poppins, sans-serif",
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={nashikOneLeft}
          alt="Image 1"
          style={{ height: "605px", marginTop: "3.6vh" }}
        />

        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            width: "91%", // Adjust the width to fit the middle image and leave space for the right image
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              src={nashikOne}
              alt="Image 2"
              style={{
                height: "662px",
                width: "100%",
                padding: "18px",
                objectFit: "cover",
                borderRadius: "22px",
                borderRadius: "40px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "500",
                  fontFamily: "poppins, sans-serif",
                }}
              >
                Integrated Map Data
              </span>
              <br />
              <span style={{ textAlign: "center", display: "flex" }}>
                Explore all you need on one map. Find trees, buildings,
                <br />
                roads, and other details crucial for Metro Line 11's progress.
              </span>
              <Button
                style={{
                  transform: `scale(${scale})`,
                  backgroundColor: "white",
                  padding: "18px",
                  paddingLeft: "28px",
                  paddingRight: "28px",
                  border: "none",
                  borderRadius: "30px",
                  fontFamily: "poppins, sans-serif",
                  color: "black",
                  marginTop: "35px",
                }}
                onClick={handleGisMap}
              >
                Explore GIS
              </Button>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "30px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  fontFamily: "poppins, sans-serif",
                }}
              >
                <img
                  src={leftSideArrow}
                  alt="leftSideArrow"
                  style={{
                    marginRight: "15px",
                    cursor: "pointer",
                    height: "22px",
                  }}
                />
                1 of 2
                <img
                  src={rightSideArrow}
                  alt="rightSideArrow"
                  style={{ marginLeft: "15px", cursor: "pointer" }}
                  // onClick={handleRightClick}
                />
              </span>
            </div>
          </div>
        </div>

        <img
          src={nashikOneRight}
          alt="Image 3"
          style={{
            height: "605px",
            width: "4.6%",
            position: "absolute",
            top: "0",
            right: "0",
            marginTop: "3.6vh",
          }}
        />
      </div>

      {/* <Carousel
        fade
        style={{ padding: "20px" }}
      >
        <Carousel.Item interval={5000}>
          <div style={{ height: "67vh", width: "100vw" }}>
            <img
              src={nashikOne}
              alt="First slide"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption
            style={{
              textAlign: "center",
              bottom: "35px",
              fontFamily: "poppins,sans-serif",
            }}
          >
            <h1
              style={{
                fontSize: "35px",
                fontFamily: "poppins,sans-serif",
              }}
            >
              Integrated Map Data
            </h1>

            <h1 style={{ fontSize: "40px", marginBottom: "40px" }}> </h1>
            <span0
              style={{
                fontFamily: "poppins,sans-serif",
                fontSize: "18px",
              }}
            >
              Explore all you need on one map. Find trees, buildings,
            </span0>
            <br></br>
            <span
              style={{ fontFamily: "poppins,sans-serif", fontSize: "18px" }}
            >
              roads, and other details crucial for Metro Line 11's progress.
            </span>
            <br />
            <span
              style={{
                fontFamily: "poppins,sans-serif",
                fontSize: "18px",
                paddingBottom: "10px",
                marginBottom: "20px",
                display: "block",
              }}
            >

            </span>

            <br></br>
            <Button
              variant="light"
              style={{
                color: "black",
                margin: "10px",
                padding: "14px",
                borderRadius: "25px",
              }}
              onClick={handleGisMap}
            >
              Explore GIS
            </Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <div style={{ height: "67vh", width: "100vw" }}>
            <img
              src={nashikTwo}
              alt="First slide"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption style={{ textAlign: "center", bottom: "35px" }}>
            <h1
              style={{
                fontSize: "40px",
              }}
            >
              The More Things Change,
            </h1>
            <h1 style={{ fontSize: "40px" }}>The More They Remain The</h1>
            <h1 style={{ fontSize: "40px", marginBottom: "40px" }}> Same</h1>
            <span
              style={{
                fontFamily: "Baskervville",
                fontSize: "18px",
              }}
            >
              The Mumbai Metro Line - 11 (MML -11) stands out as a pivotal
            </span>
            <br></br>
            <span style={{ fontFamily: "Baskervville", fontSize: "18px" }}>
              intiative aimed at enhancing the tranportation landscape in
            </span>
            <br />
            <span
              style={{
                fontFamily: "Baskervville",
                fontSize: "18px",
                paddingBottom: "10px",
                marginBottom: "20px",
                display: "block",
              }}
            >
              India's financial hub
            </span>
            <br />

            <Button
              variant="light"
              style={{ color: "black", margin: "10px", padding: "12px" }}
              onClick={handleGisMap}
            >
              Explore GIS
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}

      <>
        {/* <Offcanvas
          show={showFeedback}
          onHide={handleCloseFeedback}
          {...props}
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Offcanvas.Header closeButton style={{ background: "aliceblue" }}>
            <Offcanvas.Title style={{ color: "#284b69" }}>
              <h4>Feedback</h4>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              color: "#284b69",
              fontWeight: "490",
              background: "aliceblue",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              We'd love your Feedback!
            </span>
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Please provide your valuable feedback here to help us understand
              and improve user experience.
            </span>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  Full Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  value={fullname}
                  onChange={handleFullNameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Phone Number<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Email Id<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email Id"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>File</Form.Label>
                <Form.Control type="file" onChange={handleFileFeedbackChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Comment<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Comment"
                  value={comments}
                  onChange={handleCommentsChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ background: "#284b69", color: "#fff" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas> */}

        <>
          <Modal
            show={showContact}
            onHide={handleCloseContact}
            centered
            style={{ fontFamily: "poppins,sans-serif" }}
            dialogClassName="custom-modal-size"
          >
            <Modal.Header closeButton style={{ border: "none" }}>
              <Modal.Title>
                <h4>Contact Us</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{ fontFamily: "poppins,sans-serif", paddingTop: "0px" }}
            >
              <span
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                For inquiries or feedback, please don't hesitate to<br></br>{" "}
                reach out to us at
              </span>
              <span
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                <b>Email:</b> contact@mmrcl.com.
              </span>
              <span
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                <b>Address:</b>
              </span>
              <span
                style={{
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Mumbai Metro Rail Corporation Limited,<br></br> 202, 2nd Floor
                and 801 & 803, 8th Floor,<br></br> Hallmark Business Plaza,{" "}
                <br></br>Opp. Gurunanak Hospital,
                <br /> Sant Dnyaneshwar Marg,<br></br> Bandra (East), Mumbai -
                400 051.
              </span>
              <span
                style={{
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <a
                  href="https://x.com/mumbaimetro3?lang=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={twitterContact}
                    alt="twitter Contact"
                    style={{ marginRight: "10px" }}
                  />
                </a>

                <img
                  src={instagramContact}
                  alt="instagram Contact"
                  style={{ marginRight: "10px" }}
                ></img>
                <a
                  href="https://www.facebook.com/mmrcmumbai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "10px" }}
                >
                  <img src={facebookContact} alt="instagram Contact"></img>
                </a>
              </span>
            </Modal.Body>
          </Modal>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ border: "none" }}>
              <Modal.Title style={{ fontFamily: "poppins,sans-serif" }}>
                Feedback
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{ fontFamily: "poppins,sans-serif", paddingTop: "0px" }}
            >
              <span
                style={{
                  color: "#6F6C90",
                  fontFamily: "poppins,sans-serif",
                  fontSize: "14px",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Please provide your valuable feedback here to help us understand
                and improve user experience.
              </span>
              <Form className="mb-2">
                <Row>
                  <Col md={6}>
                    <Form.Group
                      className="mb-4"
                      style={{ position: "relative" }}
                    >
                      <Form.Label style={{ fontWeight: "500" }}>
                        Name
                      </Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          value={fullname}
                          onChange={handleFullNameChange}
                          style={{
                            borderRadius: "22px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            paddingRight: "30px",
                          }}
                        />
                        <img
                          src={formfullName}
                          alt="Full Name"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "16px",
                            width: "16px",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Email
                      </Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          value={email}
                          onChange={handleEmailChange}
                          style={{
                            borderRadius: "22px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            paddingRight: "30px",
                          }}
                        />
                        <img
                          src={formEmail}
                          alt="Email"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "16px",
                            width: "16px",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ fontWeight: "500" }}>
                        Phone Number
                      </Form.Label>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="number"
                          placeholder="Enter Phone Number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                          style={{
                            borderRadius: "22px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            paddingRight: "30px",
                          }}
                        />
                        <img
                          src={formPhoneNumber}
                          alt="Phone Number"
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "16px",
                            width: "16px",
                          }}
                        />
                      </div>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label style={{ fontWeight: "500" }}>
                        File
                      </Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileFeedbackChange}
                        style={{
                          borderRadius: "22px",
                          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "500" }}>
                    Feedback
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Feedback..."
                    value={comments}
                    onChange={handleCommentsChange}
                    style={{
                      borderRadius: "22px",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      height: "100px",
                    }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    background: "#E30613",
                    color: "#fff",
                    border: "none",
                    borderRadius: "22px",
                    padding: "10px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                  onClick={handleSubmit}
                >
                  Submit Feedback
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      </>
      <div style={{ padding: "10px", background: "#014364" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#014364",
            color: "white",
            paddingTop: "5px",
            alignItems: "center",
            borderBottom: "1px solid white",
            fontSize: "small",
          }}
        >
          <span>
            <img
              src="./BhugolGISlogo.png"
              alt="GRam Logo"
              height={"25px"}
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
            />
            <img
              src="./mmrclLogo.png"
              alt="GRam Logo"
              height={"60px"}
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
            />
          </span>
          <div style={{ fontWeight: "600", fontFamily: "poppins,sans-serif" }}>
            <span style={{ marginRight: "25px" }}>ABOUT US</span>
            <span
              style={{ marginRight: "25px", cursor: "pointer" }}
              onClick={handleShowContact}
            >
              CONTACT US
            </span>
            <span
              style={{ marginRight: "25px", cursor: "pointer" }}
              onClick={handleShow}
            >
              FEEDBACK
            </span>
            <span style={{ marginRight: "25px" }}>GIS SYSTEM</span>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>
              <a
                href="https://x.com/mumbaimetro3?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="./twitter.svg"
                  alt="Twitter Logo"
                  height="40px"
                  style={{
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
              </a>
            </span>
            <span style={{ marginRight: "10px" }}>
              <img
                src="./instagram.svg"
                alt="Instagram Logo"
                height={"40px"}
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
            </span>
            <span style={{ marginRight: "10px" }}>
              <a
                href="https://www.facebook.com/mmrcmumbai/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginRight: "10px" }}
              >
                <img
                  src="./facebook.svg"
                  alt="Facebook Logo"
                  height="40px"
                  style={{
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
              </a>
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#014364",
            color: "white",
            paddingTop: "9px",
            alignItems: "center",
            paddingBottom: "6px",
            fontSize: "small",
            fontFamily: "poppins,sans-serif",
          }}
        >
          <div style={{ fontWeight: "600" }}>
            <span style={{ marginRight: "20px" }}>
              Copyright @ 2024 MMRCL GEOPORTAL | All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
