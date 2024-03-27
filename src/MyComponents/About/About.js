/* The below code is a React component called "About" that represents a page in a web application. It
displays information about Nashik city and the Smart Cities Mission in India. It also includes a
header with a navigation menu, a carousel of images, and a footer. The component uses various
libraries and components from Material-UI and React-Bootstrap for styling and functionality. */
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
import Offcanvas from "react-bootstrap/Offcanvas";

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

export const About = ({ name, ...props }) => {
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
  useEffect(() => {
    const storedFname = sessionStorage.getItem("fname");
    setFname(storedFname);
  }, []);

  function handleGisMap() {
    console.log("handle gis map");
    window.location.replace("/home");
  }

  function handleAboutUs() {
    console.log("handleAboutUs");
    window.location.replace("/about");
  }

  function handleHomeLogo() {
    console.log("home logo");
    window.location.replace("/dashboard");
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <AppBar position="flex" sx={{ bgcolor: "#294a69" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ fontSize: "16px" }}
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
              style={{ marginRight: "5px", cursor: "pointer" }}
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
              fontSize: "14px",
              fontFamily: "poppins, sans-serif",
            }}
          >
            Nashik Municipal Smart City Development Corporation Limited
          </Typography>
          {/* <Button color="inherit" style={{ transform: "scale(0.9)" }}>
            {fname ? `Welcome, ${fname}` : null}
          </Button> */}

          <Button
            color="inherit"
            style={{ transform: "scale(0.8)", textDecoration: "none" }}
            onClick={handleAboutUs}
          >
            About us
          </Button>
          <Button
            color="inherit"
            style={{
              transform: "scale(0.8)",
              textDecoration: "none",
            }}
            onClick={handleShow}
          >
            Contact Us
          </Button>
          <Button
            color="inherit"
            style={{ transform: "scale(0.8)", textDecoration: "none" }}
            onClick={handleGisMap}
          >
            ABD Utility GIS System
          </Button>
          {fname ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{ transform: "scale(0.8)" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogin}
              style={{ transform: "scale(0.8)" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          margin: "20px",
          fontFamily: "poppins, sans-serif",
        }}
      >
        <h3>
          <b>NASHIK SMART CITY</b>
        </h3>
      </div>

      <div
        style={{
          margin: "20px",
          textAlign: "center",
          fontWeight: "500",
          fontFamily: "poppins, sans-serif",
        }}
      >
        The Smart Cities Mission of Government of India is to promote cities
        that provide core infrastructure and give a decent quality of life to
        its residents. The Smart City Challenge required cities to develop a
        proposal for the development of city in two components, Area based
        development (developing a specific area in the city) and Pan City
        initiative. Nashik was ranked 11th in the Round 2 of the challenge.
      </div>
      <div
        style={{
          fontWeight: "bold",
          margin: "20px",
          fontFamily: "poppins, sans-serif",
        }}
      >
        <h5>
          <b>ABOUT NASHIK</b>
        </h5>
      </div>

      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <div style={{ flex: 1 }}>
          <img
            src="nashik_shiv_mandir.jpg"
            alt="Shiv Mandir Image"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
        <div
          style={{
            flex: 3,
            paddingLeft: "20px",
            fontWeight: "500",
            fontFamily: "poppins, sans-serif",
          }}
        >
          <p>
            Nashik is an ancient holy city in Maharashtra, a state in western
            India. It’s known for its links to the “Ramayana” epic poem. On the
            Godavari River is Panchavati, a temple complex. Nearby, Lord Rama
            was thought to have bathed at Ram Kund water tank, today attended by
            Hindu devotees. Shri Kalaram Sansthan Mandir is an ancient shrine to
            Rama, while Rama and Sita are said to have worshipped at Sita Gufaa
            caves.
            <br></br>
            <br></br>
            Nashik is a pilgrim center known for its historical importance and
            its intangible heritage manifested in various religious occasions
            like Kumbha mela, one of largest religious congregations in the
            world and rituals performed here at Ramkund and Godavari Ghats.
            Various aspects of its physical heritage include Godavari River and
            its awe-inspiring banks in the heart of city.Dadasaheb Phalke
            memorial at foothills of Buddha caves, Mangi-tungi near jain temple,
            Lasalgaon, Nashik is Asia’s largest wholesale market for onion.
            <br></br>
            <br></br>
            Nashik city will be clean, green, safe, economically developed and
            well planned having world class infrastructure well connected with
            major cities of India by 2020.Nashik, a renowned historical city and
            now ‘onion Capital of India’ offers diverse cultural and lifestyle
            experiences to its citizens and visitors. Being a part of the Golden
            Triangle (Mumbai-Pune-Nashik), it offers diverse employment
            opportunities along with good infrastructure and a responsive local
            government.
          </p>
        </div>
      </div>

      <div
        style={{
          fontWeight: "bold",
          margin: "20px",
          fontFamily: "poppins, sans-serif",
        }}
      >
        <h5>
          <b>"Re-defining Nashik"</b>
        </h5>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "20px",
          marginBottom: "30px",
          fontFamily: "poppins, sans-serif",
        }}
      >
        <div style={{ flex: 3, fontWeight: "500" }}>
          <p>
            Nashik, a renowned historical city and now ‘Onion and Grapes Capital
            of India offers diverse cultural and lifestyle experiences to its
            citizens and visitors. Being a part of the Golden Triangle
            (Mumbai-Pune-Nashik), it offers diverse employment opportunities
            along with good infrastructure and a responsive local government.
            <br></br>
            <br></br>
            Nashik is a gateway to several religious places such as
            Trimbakeshwar, Saptashrungi, Shirdi, Shingnapur and also famous
            trekker’s and historian’s attractions such as Kalsubai (the highest
            peak in Maharashtra with elevation of 1646 meters). The district
            houses more than 100 built forts.
            <br></br>
            <br></br>
            Smart city proposal had total 50 identified projects, which were
            funded through different mechanisms. The physical heritage is
            manifested through the Godavari River and its beautiful ghats in the
            heart of the city Nashik enjoys pleasant climatic conditions. Over
            40% of city’s land is green cover which contributes to cool and
            pleasant environment.
            <br></br>
            <br></br>
            Nashik is a gateway to several religious places such as
            Trimbakeshwar, Saptashrungi, Shirdi,Shingnapur and also famous
            trekker’s and historian’s attractions such as Kalsubai(the highest
            peak in Maharashtra with elevation of 1646 meters). The district
            houses more than 100 built forts/ gadhs.
            <br></br>
            <br></br>
            Air connectivity from Nashik to Delhi, Ahmadabad and Hyderabad.
            Nashik is a defense and aerospace manufacturing hub. Employment
            generation through the currency note press and India security press.
          </p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src="nashik_night_city.jpg"
            alt="nashik_night_city"
            style={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }}
          />
        </div>
      </div>

      <>
        <Button variant="primary" onClick={handleShow} className="me-2">
          {name}
        </Button>
        <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
          <Offcanvas.Header closeButton style={{ background: "aliceblue" }}>
            <Offcanvas.Title style={{ color: "#284b69" }}>
              <h4 style={{ fontFamily: "poppins, sans-serif" }}>
                <b>Contact us</b>
              </h4>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              color: "#284b69",
              fontWeight: "500",
              background: "aliceblue",
              fontFamily: "poppins, sans-serif",
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
          }}
        >
          <Typography variant="body1" color="inherit">
            <span style={{ fontFamily: "poppins, sans-serif" }}>
              Copyright © 2023 NMSCDCL. All rights reserved
            </span>
          </Typography>

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
