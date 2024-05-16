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
import nashikTwo from "../Dashboard/nashikTwo.png";
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
            onClick={handleAboutUs}
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
            onClick={handleShow}
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
            onClick={handleShowFeedback}
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

      <Carousel fade style={{ padding: "25px" }}>
        <Carousel.Item interval={5000}>
          <div style={{ height: "67vh", width: "100vw" }}>
            <img
              src={nashikOne}
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

            <br></br>
            <Button
              variant="light"
              style={{ color: "black", margin: "10px", padding: "12px" }}
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
      </Carousel>

      <>
        {/* <Button variant="primary" onClick={handleShow} className="me-2">
          {name}
        </Button> */}
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
              src="./mmrclLogo.png"
              alt="GRam Logo"
              height={"60px"}
              style={{
                marginRight: "5px",
                cursor: "pointer",
              }}
            />
          </span>
          <div style={{ fontWeight: "600" }}>
            <span style={{ marginRight: "20px" }}>ABOUT US</span>
            <span style={{ marginRight: "20px" }}>CONTACT US</span>
            <span style={{ marginRight: "20px" }}>FEEDBACK</span>
            <span style={{ marginRight: "20px" }}>GIS SYSTEM</span>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>
              <img
                src="./twitter.svg"
                alt="Twitter Logo"
                height={"40px"}
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
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
              <img
                src="./facebook.svg"
                alt="Facebook Logo"
                height={"40px"}
                style={{
                  marginRight: "5px",
                  cursor: "pointer",
                }}
              />
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
