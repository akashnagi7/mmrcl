
/* The below code is a React component called "Contact". It is a part of a larger application and is
responsible for rendering the contact page. */
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

export const Contact = () => {
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

  return (
    <>
      <AppBar position="flex" sx={{ bgcolor: "#294a69" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <img src="./G_Ram_Logo.svg" alt="GRam Logo" height={"50hv"} />
            G-RAM GIS
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 4, textAlign: "center" }}
          >
            Nashik Municipal Smart City Development Corporation Limited
          </Typography>
          {/* <Button color="inherit" style={{ transform: "scale(0.9)" }}>
            {fname ? `Welcome, ${fname}` : null}
          </Button> */}

          <Button
            color="inherit"
            style={{ transform: "scale(0.9)", textDecoration: "none" }}
            onClick={handleAboutUs}
          >
            About us
          </Button>
          <Button
            color="inherit"
            style={{ transform: "scale(0.9)", textDecoration: "none" }}
            onClick={handleGisMap}
          >
            Feedback
          </Button>
          <Button
            color="inherit"
            style={{ transform: "scale(0.9)", textDecoration: "none" }}
            onClick={handleGisMap}
          >
            ABD Utility GIS System
          </Button>
          {fname ? (
            <Button
              color="inherit"
              onClick={handleLogout}
              style={{ transform: "scale(0.9)" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLogin}
              style={{ transform: "scale(0.9)" }}
            >
              Login
            </Button>
          )}

          <img
            style={{ height: "42px", margin: "5px" }}
            src="./NMSCDCL_Logo2.png"
            alt="NMSCDCL Logo"
          />
        </Toolbar>
      </AppBar>
      <div style={{ textAlign: "center", fontWeight: "bold", margin: "20px" }}>
        <h3>NASHIK SMART CITY</h3>
      </div>
      <div style={{ margin: "20px", textAlign: "center", fontWeight: "500" }}>
        The Smart Cities Mission of Government of India is to promote cities
        that provide core infrastructure and give a decent quality of life to
        its residents. The Smart City Challenge required cities to develop a
        proposal for the development of city in two components, Area based
        development (developing a specific area in the city) and Pan City
        initiative. Nashik was ranked 11th in the Round 2 of the challenge.
      </div>
      <div style={{ fontWeight: "bold", margin: "20px" }}>
        <h5>ABOUT NASHIK</h5>
      </div>

      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <div style={{ flex: 1 }}>
          <img
            src="nashik_shiv_mandir.jpg"
            alt="Shiv Mandir Image"
            style={{ width: "100%", maxWidth: "300px" }}
          />
        </div>
        <div style={{ flex: 3, paddingLeft: "20px", fontWeight: "500" }}>
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

      <div style={{ fontWeight: "bold", margin: "20px" }}>
        <h5>"Re-defining Nashik"</h5>
      </div>

      {/* Footer Part */}
      <AppBar
        position="fixed"
        style={{
          top: "auto",
          bottom: 0,
          display: "flex",
          justifyContent: "flex-end",
        }}
        sx={{ bgcolor: "#294A69" }}
      >
        <Typography variant="body1" color="inherit">
          <strong>
            <img
              style={{
                height: "15px",
                margin: "5px",
                float: "right",
                paddingRight: "20px",
              }}
              src="./BhugolGISlogo.png"
              alt="BhugolGIS logo"
            />
          </strong>
        </Typography>
        <Typography variant="body1" color="inherit"></Typography>
      </AppBar>
    </>
  );
};
