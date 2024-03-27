/* The above code is a React component called "Dashboard". It is a part of a larger application and is
responsible for rendering the dashboard page. */
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import nashikOne from "../Dashboard/nashikone.svg";
import nashikTwo from "../Dashboard/nashiktwo.svg";
import nashikThree from "../Dashboard/nashikthree.svg";
// import nashikFour from "../Dashboard/nashikfour.svg";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import counterData from "../Counter/counter.json";
import axios from "axios";
import Swal from "sweetalert2";

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
    window.location.replace("/contact");
  }

  function handleGramLogoClick() {
    console.log("handleGramLogoClick");
    window.location.replace("/dashboard");
  }

  // Handle Contact Us Part
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle Feedback Part
  const [showFeedback, setShowFeedback] = useState(false);
  const handleCloseFeedback = () => setShowFeedback(false);
  const handleShowFeedback = () => setShowFeedback(true);

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

  return (
    <>
      <AppBar position="flex" sx={{ bgcolor: "#294a69" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: "poppins, sans-serif",
            }}
          >
            <a
              href="https://smartcities.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./smart_city_logo.jpg"
                alt="smart city logo"
                height={"40px"}
                style={{ margin: "2px" }}
              />
            </a>
            <img
              style={{ height: "40px", margin: "5px" }}
              src="./nashik_smart_city_logo.jpg"
              alt="NMSCDCL Logo"
            />
            <a
              href="https://nmc.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./nashik_municipal_logo_red.png"
                alt="municipal logo red"
                height={"40px"}
                width={"40px"}
                style={{ margin: "2px" }}
              />
            </a>
            <img
              src="./G_Ram_Logo.svg"
              alt="GRam Logo"
              height={"40px"}
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={handleHomeLogo}
            />
            G-RAM GIS
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 4,
              textAlign: "center",
              fontSize: `${fontSize + 3}px`,
              fontFamily: "poppins, sans-serif",
            }}
          >
            Nashik Municipal Smart City Development Corporation Limited
          </Typography>

          <Button
            color="inherit"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
            }}
            onClick={handleAboutUs}
          >
            About us
          </Button>
          <Button
            color="inherit"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
            }}
            onClick={handleShow}
          >
            Contact us
          </Button>
          <Button
            color="inherit"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
            }}
            onClick={handleShowFeedback}
          >
            Feedback
          </Button>
          <Button
            color="inherit"
            style={{
              transform: `scale(${scale})`,
              textDecoration: "none",
              fontFamily: "poppins, sans-serif",
            }}
            onClick={handleGisMap}
          >
            ABD Utility GIS System
          </Button>
          <span
            style={{
              border: "1px solid white",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={handleIncrement}
          >
            +
          </span>
          <span
            style={{
              border: "1px solid white",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            A
          </span>
          <span
            style={{
              border: "1px solid white",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={handleDecrement}
          >
            -
          </span>

          {fname ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{ transform: `scale(${scale})` }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogin}
              style={{ transform: `scale(${scale})` }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Carousel fade>
        <Carousel.Item interval={5000}>
          <div style={{ height: "90vh", width: "100vw" }}>
            <img
              src={nashikOne}
              alt="First slide"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div style={{ height: "90vh", width: "100vw" }}>
            <img
              src={nashikTwo}
              alt="First slide"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div style={{ height: "90vh", width: "100vw" }}>
            <img
              src={nashikThree}
              alt="First slide"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <>
        <Button variant="primary" onClick={handleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
          <Offcanvas.Header closeButton style={{ background: "aliceblue" }}>
            <Offcanvas.Title style={{ color: "#284b69" }}>
              <h4>Contact us</h4>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              color: "#284b69",
              fontWeight: "490",
              background: "aliceblue",
            }}
          >
            <div>
              <span style={{ marginBottom: "10px" }}>
                Nashik Municipal Smart City Development Corporation Limited
                <br></br>
                (NMSCDCL)
              </span>
              <br />
              <br />
              <span style={{ marginBottom: "10px" }}>
                CIN: U93090MH2016SGC285193
              </span>
              <br />
              <br />
              <span style={{ marginBottom: "10px" }}>
                <b>Registered Office Address:</b> <br></br>C\O Nashik Municipal
                Corporation, Rajiv Gandhi Bhavan, Purandare Colony, Sharanpur,
                Nashik – 422002
              </span>
              <br />
              <br />
              <span style={{ marginBottom: "10px" }}>
                <b>Office Address:</b>
                <br></br> Loknete Panditrao Khaire Panchavati Divisional Office
                4th - Floor Makhmalabad Naka Panchavati, Nashik 422003
                <br></br>
                <img
                  src="./telephone.png"
                  alt="GRam Logo"
                  height={"30hv"}
                  style={{ marginRight: "10px" }}
                />
                Telephone Number: 0253 2518863
              </span>
              <br></br>
              <br></br>
              <span style={{ display: "flex", justifyContent: "center" }}>
                <a
                  href="https://www.facebook.com/NashikSmartCityOfficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./facebook.png"
                    alt="GRam Logo"
                    height={"50hv"}
                    style={{ marginRight: "10px" }}
                  />
                </a>
                <a
                  href="https://twitter.com/NashikSmartCity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="./twitter.png"
                    alt="GRam Logo"
                    height={"50hv"}
                    style={{ marginRight: "10px" }}
                  />
                </a>
                <a
                  href="https://www.instagram.com/nashik_smart_city"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="./instagram.png" alt="GRam Logo" height={"52hv"} />
                </a>
              </span>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <Offcanvas
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
        </Offcanvas>
      </>

      {/* Footer Part */}
      <AppBar
        position="fixed"
        style={{
          top: "auto",
          bottom: 0,
          display: "flex",
          padding: "0 20px",
        }}
        sx={{ bgcolor: "#294A69" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "poppins, sans-serif",
          }}
        >
          <Typography
            variant="body1"
            color="inherit"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Copyright © 2023 NMSCDCL. All rights reserved
          </Typography>
          Visitor Count : {visitorCount}
          <strong>
            <img
              style={{
                height: "18px",
                margin: "5px",
                paddingRight: "10px",
              }}
              src="./BhugolGISlogo.png"
              alt="BhugolGIS logo"
            />
          </strong>
        </div>
      </AppBar>
    </>
  );
};
