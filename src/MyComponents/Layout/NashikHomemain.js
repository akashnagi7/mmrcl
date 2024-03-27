/**
 * The below code is a React component that renders a map and various controls for layers, basemaps,
 * and legends.
 */
import React from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useRef } from "react";
import jsPDF from "jspdf";
import Mappart from "./Mappart";
import Layerstab from "./Layerstab";
import Legend from "../Legend/Legend";
import Basemap from "../Basemap/Basemap";
import ProjectionBar from "./ProjectionBar/ProjectionBar";
import PrintGenerator from "../../PrintGenerator";

const NashikHomemain = (props) => {
  const reportTemplateRef = useRef(null);
  function handleGeneratePdf() {
    console.log("Generate Pdf");
    const doc = new jsPDF({
      format: "a4",
      orientation: "landscape",
      unit: "px",
    });

    doc.text("My Heading", 20, 20);
    doc.setFont("Inter-Regular", "normal");
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
    console.log(reportTemplateRef.current);
  }

  const renderSwitch = (param) => {
    console.log(param);
    switch (param) {
      case "Layers":
        return <Layerstab />;
      case "Basemap":
        return <Basemap />;
      case "Legend":
        return <Legend />;
      case "Layout":
        // return (
        //   <div style={{ paddingLeft: "24px" }}>
        //     <Button variant="contained" onClick={handleGeneratePdf}>
        //       Generate Layout
        //     </Button>
        //   </div>
        // );
        return <PrintGenerator report={reportTemplateRef.current} />;
      default:
        return "";
    }
  };

  const [rightopen, setRightopen] = React.useState(true);
  const handleDrawerRightopen = () => {
    setRightopen(true);
  };
  const handleDrawerRightclose = () => {
    setRightopen(false);
    props.changedrawerdata("");
  };

  return (
    <div className="row">
      <Box
        sx={{
          // width: "calc(100vw-10vw)",
          height: "calc(100vh-12vh)",
          display: "inline-block",
        }}
      >
        {props.mydrawerdata !== "" ? (
          <Box
            sx={{
              display: "inline-block",
              width: "240px",
              height: `calc(100vh-128px)`,
              p: 1,
              overflow: "auto",
            }}
          >
            <Paper
              elevation={2}
              sx={{ height: `calc(85vh)`, overflow: "auto" }}
            >
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={handleDrawerRightclose}
              >
                <ListItemIcon>
                  <IconButton
                    onClick={handleDrawerRightclose}
                    style={{ fontSize: "20px" }}
                  >
                    {props.mydrawerdata}
                    <CloseIcon />
                  </IconButton>
                </ListItemIcon>
              </ListItemButton>
              {renderSwitch(props.mydrawerdata)}
            </Paper>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "inline-block",
            verticalAlign: "top",
            width:
              props.mydrawerdata !== ""
                ? props.myrightdrawerdata == "false"
                  ? props.myleftdrawerdata == false
                    ? `calc(100% - 240px)` // ? `calc(100vw - 540px)`
                    : `calc(100vw - 640px)` //: `calc(100vw - 640px)`
                  : props.myleftdrawerdata == false
                  ? `calc(100% - 240px)` //? `calc(100vw - 440px)`
                  : `calc(100vw - 540px)` //? `calc(100vw - 26vw)`
                : `-webkit-fill-available`,
            // height: "calc(100vh)",
            height:
              props.mydrawerdata !== ""
                ? `calc(100vh - 12vh)`
                : `calc(100vh - 12vh)`,

            p: 1,
            overflow: "auto",
          }}
        >
          <div ref={reportTemplateRef}>
            <Mappart></Mappart>
          </div>
          <ProjectionBar />
        </Box>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mydrawerdata: state.drawerdata,
    myleftdrawerdata: state.leftdrawerdata,
    myrightdrawerdata: state.rightdrawerdata,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changedrawerdata: (name) => {
      dispatch({ type: "CHANGE_DRAWER", payload: name });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NashikHomemain);
