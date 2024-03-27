//The below code contains the tools such as spatial query, non spatial query and upload shape file.
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import BrushIcon from "@mui/icons-material/Brush";
import EditIcon from "@mui/icons-material/Edit";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Drawvector from "./Drawgeometry/Drawvector";
import Vectoredit from "./Drawgeometry/Vectoredit";
import Drawmeasure from "./Drawgeometry/Drawmeasure";
import LayersIcon from "@mui/icons-material/Layers";
import PublicIcon from "@mui/icons-material/Public";
import LegendToggleIcon from "@mui/icons-material/LegendToggle";
import PrintIcon from "@mui/icons-material/Print";
import Tooltip from "@mui/material/Tooltip";
import { connect } from "react-redux";
import NashikHomemain from "./NashikHomemain";
import "./NashikHomeNew.css";
import { Grid } from "react-loader-spinner";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import PersonIcon from "@mui/icons-material/Person";
import Swal from "sweetalert2";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

const LeftDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NLeftDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const RightDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  anchor: "right",
  boxSizing: "border-box",
  ...(!open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

let axiosConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: sessionStorage.getItem("acessToken"),
  },
};

const NashikHomeNew = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [rightopen, setRightopen] = React.useState(props.myrightdrawerdata);
  const [leftopen, setNLeftopen] = React.useState(props.myleftdrawerdata);

  const [drawerdata, setDrawerdata] = React.useState([props.mydrawerdata]);
  const [nonSpData, setNonSpData] = React.useState([props.myname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerNLeftopen = () => {
    setNLeftopen(true);
    props.leftdrawerdata(true);
  };
  const handleDrawerNLeftclose = () => {
    setNLeftopen(false);
    props.leftdrawerdata(false);
  };

  const handleDrawerRightopen = () => {
    setRightopen(true);
    props.rightdrawerdata("true");
  };
  const handleDrawerRightclose = () => {
    setRightopen(false);
    props.rightdrawerdata("false");
  };

  const handleClick = (e) => {
    setNLeftopen(false);
    props.leftdrawerdata(false);
    console.log(e);
    setDrawerdata(e);
    props.changedrawerdata(e);
    // props.changefirstname("sdsdsd");
  };

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = "/dashboard";
  }

  function handleLogin() {
    sessionStorage.clear();
    window.location.href = "/login";
  }
  const [drawopen, setDrawOpen] = React.useState(false);
  const handleDrawClick = () => {
    setDrawOpen(!drawopen);
  };

  const [draweditopen, setDraweditOpen] = React.useState(false);
  const handleDraweditClick = () => {
    setDraweditOpen(!draweditopen);
  };

  const [drawmeasureopen, setDrawmeasureOpen] = React.useState(false);
  const handleDrawmeasureClick = () => {
    setDrawmeasureOpen(!drawmeasureopen);
  };

  // ****************************** Spatial Query *********************************//
  const [show2, setShow2] = useState(false);
  const handleShow2 = () => {
    setShow2(true);
    setShow(false);
    setShow3(false);
    console.log("Spatial Clicked");
    setData(props.myname.filter((item) => item.checked === true));
    console.log(data);
  };
  const handleClose2 = () => setShow2(false);
  const [relationship, setRelationship] = useState("");
  const [fullscreen, setFullscreen] = useState(true);
  const [inputFeature, setInputFeature] = useState();
  const [selectFeature, setSelectFeature] = useState();
  const [spQuery, setSpQuery] = useState();
  const [distance, setDistance] = useState();

  const handleSpLayerFirst = (event) => {
    console.log(event.target.value);
  };

  function handleRelationshipChange(event) {
    setRelationship(event.target.value);
    console.log(event.target.value);
  }

  function handleInputFeature(event) {
    console.log(event.target.value);
    setInputFeature(event.target.value);
  }

  function handleSelectFeature(event) {
    console.log(event.target.value);
    setSelectFeature(event.target.value);
  }

  function handleSpatialQuery() {
    console.log("get spatial query");

    //handle condition without within a distance condition

    if (relationship == "Are_Within_A_Distance") {
      console.log("distance is selected");
      //handle condition within a distance condition
      axios
        .post(
          `query/spatial-query/${inputFeature}/${selectFeature}`,
          {
            Relationship: relationship,
          },
          {
            ...axiosConfig,
            params: {
              distance: distance,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data);
          setSpQuery(response.data.data);
          props.changeSpatialQuery(response.data.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Query Executed Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("distance is not selected ");
      axios
        .post(
          `query/spatial-query/${inputFeature}/${selectFeature}`,
          {
            Relationship: relationship,
          },
          axiosConfig
        )
        .then((response) => {
          console.log(response.data.data);
          setSpQuery(response.data.data);
          props.changeSpatialQuery(response.data.data);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Query Executed Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    handleClose2(false);
  }

  function handleSpatialClear() {
    console.log("Handle Clear");
    props.changeSpatialQuery();
  }

  const handleDistanceChange = (event) => {
    setDistance(event.target.value + "m");
    console.log(event.target.value + "m");
  };
  // ****************************** Non spatial Query*******************************//
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleNonspQuery = () => {
    console.log("Handle NonspQuery");
    setShow(false);
  };
  const [data, setData] = useState([]);
  const handleShow = () => {
    setShow(true);
    setShow2(false);
    setShow3(false);

    console.log("Non Spatial Clicked");
    setData(props.myname.filter((item) => item.checked === true));
    console.log(data);
  };

  const [nonSpLayer, SetNonSpLayer] = useState();
  const [nonSpLayerName, SetNonSpLayerName] = useState();
  const [nonSpAttribute, SetNonSpAttribute] = useState();
  const [nonSpColumn, SetNonSpColumn] = useState();
  const [nonSpUnique, SetNonSpUnique] = useState();
  const [nonSpValue, SetNonSpValue] = useState();
  const [nonSpExpression, SetNonSpExpression] = useState();
  const [nonSpQuery, SetNonSpQuery] = useState();
  const [spatialOptions, SetSpatialOptions] = useState();

  //handle layer names
  const handleNonSpLayer = (event) => {
    const selectedValue = event.target.value;
    const [id, name] = selectedValue.split("-");

    console.log("Selected id:", id);
    console.log("Selected name:", name);
    SetNonSpLayerName(name);
    SetNonSpLayer(id);
    console.log(nonSpLayer);

    axios.get(`/query/GetAttributeNames/${id}`, axiosConfig).then((res) => {
      console.log(res.data.data);
      SetNonSpAttribute(res.data.data);
    });
  };

  //handle attribute column
  const handleNonspAttribute = (event) => {
    console.log(event.target.value);
    let NonspCol = event.target.value;
    console.log(NonspCol);
    SetNonSpColumn(NonspCol);
    console.log(
      `/query/GetUniqueColumnValues/${NonspCol}/${nonSpLayer}`,
      axiosConfig
    );

    axios
      .get(
        `/query/GetUniqueColumnValues/${NonspCol}/${nonSpLayer}`,
        axiosConfig
      )
      .then((res) => {
        console.log(res.data.data);
        SetNonSpUnique(res.data.data);
      });
  };

  // handle expression values
  const handleExpresssion = (event) => {
    console.log(event.target.value);
    SetNonSpExpression(event.target.value);
  };

  let NonSpatialValue;

  //handle Unique Value
  const handleUniqueValue = (event) => {
    // console.log(event.target.value);
    SetNonSpValue(event.target.value);
    NonSpatialValue = event.target.value;
    console.log("Unique Value is", NonSpatialValue);
    // console.log(NonSpatialValue);
    // console.log(nonSpValue);
    // console.log(nonSpLayer);
  };

  //handle non spatial query
  const handleNonSpatialQuery = () => {
    SetNonSpQuery(
      "SELECT * FROM " +
        nonSpLayerName +
        " WHERE " +
        nonSpColumn +
        nonSpExpression +
        "'" +
        nonSpValue +
        "'"
    );

    let NonSpatialQuery =
      "SELECT * FROM " +
      nonSpLayerName +
      " WHERE " +
      nonSpColumn +
      nonSpExpression +
      "'" +
      nonSpValue +
      "'";

    console.log(NonSpatialQuery);
    props.changenonSpatialQuery(NonSpatialQuery);
    // props.changenonSpatialQuery("test name")
    console.log(props.nonSpatialQuery);

    axios
      .post(
        `/query/NonSpatialQuery/${nonSpLayer}/`,
        {
          query: NonSpatialQuery,
        },
        axiosConfig
      )
      .then((response) => {
        console.log(response.data.data);
        props.changenonSpatialData(response.data.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Query Executed Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    setShow(false);
  };

  const [datastorepublish, setDatastorePublish] = useState();
  const [datastoreupload, setDatastoreUpload] = useState();
  const [predefinedQuery, setPredefinedQuery] = useState();

  useEffect(() => {
    axios
      .get("/query/get-spatial-query-options", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "spatial query options");
        SetSpatialOptions(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching relationship options:", error);
      });

    axios
      .get("/services/GetDatastoreList", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "Data store list");
        setDatastorePublish(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/services/GetDatastoreList", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "Data store list upload");
        setDatastoreUpload(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/query/get-pre-defined-spatial-query-options", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "Predefined queriess");
        setPredefinedQuery(response.data.data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deletePredefinedQuery = () =>{
    props.changePredefinedQuery();
  }

  // ***********************************Swipe*****************************************//
  const [show3, setShow3] = useState(false);
  const handleShow3 = () => {
    setShow3(true);
    setShow(false);
    setShow2(false);
  };

  const handleClose3 = () => {
    setShow3(false);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    // Perform search logic using the searchTerm
    // Update the state or perform any other necessary actions
  };

  const handleReset = () => {
    console.log("Reset code");
    SetNonSpQuery("mcbdhbh");
    SetNonSpLayerName();
    SetNonSpAttribute();
    SetNonSpColumn();
    SetNonSpExpression();
    SetNonSpValue();
    props.changenonSpatialQuery();
    props.changenonSpatialData();
  };

  //************************************Header Info************************************** *//
  const [fname, setFname] = useState("");
  useEffect(() => {
    const storedFname = sessionStorage.getItem("fname");
    setFname(storedFname);
  }, []);

  //************************************Upload Shape File ******************************** */
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  const [showSuccessPublish, setShowSuccessPublish] = useState(false);
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const handleSuccessPublishClose = () => {
    setShowSuccessPublish(false);
  };

  const handleSuccessDeleteClose = () => {
    setShowSuccessDelete(false);
  };

  const [show4, setShow4] = useState(false);
  const handleShow4 = () => {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(true);
  };

  const handleClose4 = () => {
    setShow4(false);
    // window.location.reload();
  };

  const [shapeFile, setShapeFile] = useState(null);
  const handleShapeFileChange = (event) => {
    setShapeFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const [choice, setChoice] = useState();
  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
    console.log(event.target.value);
  };

  const [exports, setExports] = useState(true);
  const handleExportsChange = (event) => {
    setExports(event.target.value);
    console.log(event.target.value);
  };

  const [creationMode, setCreationMode] = useState("CREATE");
  const handleCreationModeChange = (event) => {
    setCreationMode(event.target.value);
    console.log(event.target.value);
  };

  const [layerName, setLayerName] = useState("");

  const handleLayerNameChange = (event) => {
    setLayerName(event.target.value);
    console.log(event.target.value);
  };

  const [encoding, setEncoding] = useState("UTF-8");
  const handleEncodingChange = (event) => {
    setEncoding(event.target.value);
    console.log(event.target.value);
  };

  const [srs, setSrs] = useState("EPSG:32643");
  const handleSrsChange = (event) => {
    setSrs(event.target.value);
    console.log(event.target.value);
  };

  const [datastore, setDatastore] = useState();
  const handleDataStoreChange = (event) => {
    console.log(event.target.value);
    // console.log(datastore);
    setDatastore(event.target.value);
  };

  const [showErrorChoice, setShowErrorChoice] = useState(false);

  const handleChoiceErrorClose = () => {
    setShowErrorChoice(false);
  };

  const [showErrorExports, setShowErrorExports] = useState(false);

  const handleExportsClose = () => {
    setShowErrorExports(false);
  };

  const [showErrorCreationMode, setShowErrorCreationMode] = useState(false);

  const handleCreationModeClose = () => {
    setShowErrorCreationMode(false);
  };

  const [showErrorLayerName, setShowErrorLayerName] = useState(false);

  const handleLayerNameClose = () => {
    setShowErrorLayerName(false);
  };

  const [showErrorEncoding, setShowErrorEncoding] = useState(false);

  const handleEncodingClose = () => {
    setShowErrorEncoding(false);
  };

  const [showErrorSrs, setShowErrorSrs] = useState(false);

  const handleSrsClose = () => {
    setShowErrorSrs(false);
  };

  const [showErrorDatastore, setShowErrorDatastore] = useState(false);

  const handleDatastoreClose = () => {
    setShowErrorDatastore(false);
  };

  const handleShapeFile = (event) => {
    console.log("Shape File Handling");
    // console.log(event.target.value);

    const shapeData = {
      file: shapeFile,
      choice: choice,
      export: exports,
      creationMode: creationMode,
      name: layerName,
      encoding: encoding,
      srs: srs,
      datastore: datastore,
    };
    console.log(shapeData);

    axios
      .post("/filemanager/UploadShapeFile", shapeData, axiosConfig)
      .then((response) => {
        console.log(response.data);
        if (response.data.message == "layer exported successfully") {
          setShowSuccess(true);

          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((error) => {
        console.error(error.response.data.message);
        console.error(error.response);

        if (error.response.status >= 400 && error.response.status < 500) {
          // Handle errors in the 400 series
          console.error("Client error. Status code:", error.response.status);

          // You can handle specific status codes or display a generic error message
          if (error.response.status === 401) {
            // Handle unauthorized access
            console.error("Unauthorized access");
          } else {
            console.error("Client error within the 400 series");
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          }
        }
      });

    if (!shapeFile) {
      console.log("Shape file is empty");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Shape file is empty",
      });
      return;
    }

    if (!choice) {
      console.log("Choice is empty");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Choice is empty",
      });
      return;
    }

    if (!layerName) {
      console.log("Layer name is empty");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Layer name is empty",
      });
      return;
    }

    if (!datastore) {
      console.log("Datastore is empty");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Datastore is empty",
      });
      return;
    }
  };

  /*****************Publish Layer Start********************************** */

  const [show5, setShow5] = useState(false);
  const handleShow5 = () => {
    console.log("clicked on publish");
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setShow5(true);
  };

  const handleClose5 = () => {
    setShow5(false);
    // window.location.reload();
  };

  /******************** Get the list of layers *************/
  const [layergroup, SetLayerGroup] = useState("");
  const [layergroupInput, SetLayerGroupInput] = useState("");
  const handleLayerGroupChange = (event) => {
    console.log(event.target.value);
    SetLayerGroupInput(event.target.value);
  };

  const [layerNamePublish, setLayerNamePublish] = useState("");
  const [layerTitle, setLayerTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [layerType, setLayerType] = useState("");
  const [nativeSrs, setNativeSrs] = useState("");

  const handleLayerNamePublishChange = (event) => {
    console.log(event.target.value);
    setLayerNamePublish(event.target.value);
  };

  const handleLayerTitleChange = (event) => {
    setLayerTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleAbstractChange = (event) => {
    setAbstract(event.target.value);
    console.log(event.target.value);
  };

  const handleLayerTypeChange = (event) => {
    setLayerType(event.target.value);
    console.log(event.target.value);
  };

  const handleNativeSrsChange = (event) => {
    setNativeSrs(event.target.value);
    console.log(event.target.value);
  };

  /*******************Layer Publish List************************************ */
  const [show6, setShow6] = useState(false);
  const handleShow6 = () => {
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setShow5(false);
    setShow6(true);
  };

  const handleClose6 = () => {
    setShow6(false);
  };

  const [exportedLayer, setExportedLayer] = useState();
  useEffect(() => {
    axios
      .get("/filemanager/get-exported-layers-list", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "exported layers list");
        setExportedLayer(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handlePublishwithid = (itemId) => {
    console.log(`Publishing item with id: ${itemId}`);
    setLayerNamePublish(itemId);
    //display
    setShow5(true);
    setShow6(false);
  };

  const [showErrorLayergroupInput, setShowErrorLayergroupInput] =
    useState(false);

  const handleLayergroupInputClose = () => {
    setShowErrorLayergroupInput(false);
  };

  const [showErrorLayerTitle, setShowErrorLayerTitle] = useState(false);

  const handleLayerTitleClose = () => {
    setShowErrorLayerTitle(false);
  };

  const [showErrorAbstract, setShowErrorAbstract] = useState(false);

  const handleAbstractClose = () => {
    setShowErrorAbstract(false);
  };

  const [showErrorLayerType, setShowErrorLayerType] = useState(false);

  const handleLayerTypeClose = () => {
    setShowErrorLayerType(false);
  };

  const [showErrorNativeSrs, setShowErrorNativeSrs] = useState(false);

  const handleNativeSrsClose = () => {
    setShowErrorNativeSrs(false);
  };

  const handlePublishFile = (event) => {
    console.log("Shape File Publish");
    console.log(event.target.value);

    const publishData = {
      datastore: datastore,
      layer_group: layergroupInput,
      name: layerNamePublish,
      title: layerTitle,
      abstract: abstract,
      type: layerType,
      vector_tile: true,
      native_srs: nativeSrs,
      source_name: layerNamePublish,
    };

    axios
      .post("/services/PostLayerApi/", publishData, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setShowSuccessPublish(true);

        // Reload the page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });

    if (!datastore) {
      console.log("Datastore is empty");
      setShowErrorDatastore(true);
      return;
    }

    if (!layergroupInput) {
      console.log("Layer Group is empty");
      setShowErrorLayergroupInput(true);
      return;
    }

    if (!layerNamePublish) {
      console.log("Layer Name is empty");
      return;
    }

    if (!layerTitle) {
      console.log("Layer Title is empty");
      setShowErrorLayerTitle(true);
      return;
    }

    if (!abstract) {
      console.log("Abstract is empty");
      setShowErrorAbstract(true);
      return;
    }

    if (!layerType) {
      console.log("Layer Type is not Selected");
      setShowErrorLayerType(true);
      return;
    }

    if (!nativeSrs) {
      console.log("Native Srs is not Selected");
      setShowErrorNativeSrs(true);
      return;
    }
  };

  /*******************Delete Existing Layerlist************ */

  const [show7, setShow7] = useState(false);
  const handleShow7 = () => {
    console.log("clicked on delete existing layerlist");
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setShow5(false);
    setShow6(false);
    setShow7(true);
  };

  const handleClose7 = () => {
    setShow7(false);
    // window.location.reload();
  };

  const [layerList, setLayerList] = useState();

  useEffect(() => {
    axios
      .get("/services/GetVectorTileLayerList/", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "Vector tile list");
        setLayerList(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const [deleteId, SetDeleteId] = useState();

  let deleteId;
  const handleDeleteLayer = (selectedId) => {
    console.log("Delete Layer", selectedId);
    deleteId = selectedId;
    console.log(deleteId);
  };

  const deleteLayer = () => {
    console.log("Delete Layer", deleteId);
    axios
      .delete(`/services/DeleteLayer/${deleteId}`, axiosConfig)
      .then((response) => {
        console.log("Layer deleted:", response.data);
        setShowSuccessDelete(true);

        // Reload the page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error deleting layer:", error);
      });
  };

  /**********************Publish Layer End*********************************** */

  /*********************Predefines Queries Start*********************************** */
  const [show8, setShow8] = useState(false);
  const [predefQuery, setPredefQuery] = useState("");
  const handleShow8 = () => {
    console.log("clicked on predefined queries");
    setShow(false);
    setShow2(false);
    setShow3(false);
    setShow4(false);
    setShow5(false);
    setShow6(false);
    setShow7(false);
    setShow8(true);
  };

  const handleClose8 = () => {
    setShow8(false);
    // window.location.reload();
  };

  const handlePredefinedQuery = (event) => {
    // console.log("handlePredefinedQuery");
    console.log(event.target.value);
    setPredefQuery(event.target.value);
  };

  useEffect(() => {
    if (predefQuery) {
      console.log(predefQuery);
      axios
        .post(
          `/query/pre-defined-spatial-query`,
          {
            Query: predefQuery,
          },
          axiosConfig
        )
        .then((response) => {
          console.log(response.data.data, "get geojson for predefquery");
          props.changePredefinedQuery(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [predefQuery]);

  /*********************Predefines Queries End*********************************** */

  useEffect(() => {
    axios
      .get("/services/GetLayerGroupList", axiosConfig)
      .then((response) => {
        console.log(response.data.data, "layer group list");
        SetLayerGroup(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /******** User Mangement for View and Edit User ************** */
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    const storedGroupName = sessionStorage.getItem("groupname");
    setGroupName(storedGroupName);
    console.log(storedGroupName);
    console.log(groupName);
  }, []);

  const handleUserManagement = () => {
    console.log("Handle User Management and Feedback");
    window.location.replace("/Usermanagement");
  };

  const handleUserDashboard = () => {
    console.log("Handle User Dashboard");
    window.location.replace("/dashboard");
  };

  function handleHomeLogo() {
    console.log("home logo");
    window.location.replace("/dashboard");
  }

  return (
    <>
      <Box sx={{ display: "flex" }} className="nashiksmartcityfont">
        <CssBaseline />
        {/* <AppBar position="fixed" sx={{ bgcolor: "#556080" }}> */}
        <AppBar position="fixed" sx={{ bgcolor: "#294A69" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{ fontSize: "14px", fontFamily: "poppins, sans-serif" }}
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
            <Button
              color="inherit"
              style={{
                transform: "scale(0.8)",
                fontFamily: "poppins, sans-serif",
              }}
            >
              {fname ? (
                `Welcome, ${fname}`
              ) : (
                <span>
                  Guest User
                  <img
                    style={{
                      height: "20px",
                      marginTop: "2px",
                      float: "right",
                      paddingLeft: "10px",
                    }}
                    src="./userSignin.png"
                    alt="BhugolGIS logo"
                  />
                </span>
              )}
            </Button>

            {fname ? (
              <Button
                color="inherit"
                onClick={handleLogout}
                style={{
                  transform: "scale(0.8)",
                  fontFamily: "poppins, sans-serif",
                }}
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

        <NLeftDrawer variant="permanent" open={leftopen} anchor="left">
          <DrawerHeader />
          <Divider />
          <List>
            <ListItemButton
              onClick={
                leftopen ? handleDrawerNLeftclose : handleDrawerNLeftopen
              }
              sx={{ justifyContent: "center", padding: "0px" }}
            >
              <ListItemIcon
                style={{ display: "flex", justifyContent: "center" }}
              >
                <IconButton
                  ListItemText="asd"
                  onClick={
                    leftopen ? handleDrawerNLeftclose : handleDrawerNLeftopen
                  }
                >
                  {leftopen ? (
                    <div
                      style={{
                        fontSize: "17px",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      <span style={{ margin: "10px" }}>Collapse</span>
                      <ChevronLeftIcon />
                    </div>
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton onClick={(event) => handleClick("Layers")}>
              <Tooltip title="Layers">
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Layers" />
            </ListItemButton>
            <Divider />

            <ListItemButton onClick={(event) => handleClick("Basemap")}>
              <Tooltip title="Basemap">
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Basemap" />
            </ListItemButton>
            <Divider />

            <ListItemButton onClick={(event) => handleClick("Legend")}>
              <Tooltip title="Legend">
                <ListItemIcon>
                  <LegendToggleIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Legend" />
            </ListItemButton>
            <Divider />

            {groupName === "Admin" ? (
              <span>
                <ListItemButton>
                  <Tooltip
                    title="User Management & Feedback"
                    onClick={handleUserManagement}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <Typography style={{ fontSize: "12px" }}>
                    User Management <br></br>& Feedback
                  </Typography>
                </ListItemButton>
                <Divider />
              </span>
            ) : null}

            <span>
              <ListItemButton onClick={handleUserDashboard}>
                <Tooltip title="Back to Dashboard">
                  <ListItemIcon>
                    <i
                      class="fa fa-home"
                      aria-hidden="true"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </ListItemIcon>
                </Tooltip>
                <Typography style={{ fontSize: "12px" }}>
                  Back to Dashboard
                </Typography>
              </ListItemButton>
              <Divider />
            </span>

            {/* <ListItemButton onClick={(event) => handleClick("Layout")}>
              <Tooltip title="Layout">
                <ListItemIcon>
                  <PrintIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Layout" />
            </ListItemButton> */}
          </List>
          <Divider />
        </NLeftDrawer>

        <div style={{ marginTop: "64px", width: "-webkit-fill-available" }}>
          <NashikHomemain />
        </div>

        <RightDrawer variant="permanent" open={rightopen} anchor="right">
          <DrawerHeader />
          <Divider />
          <List>
            <ListItemButton
              onClick={
                rightopen ? handleDrawerRightclose : handleDrawerRightopen
              }
              style={{ padding: "0px" }}
            >
              <ListItemIcon>
                <IconButton
                  onClick={
                    rightopen ? handleDrawerRightclose : handleDrawerRightopen
                  }
                >
                  {rightopen ? (
                    <ChevronLeftIcon />
                  ) : (
                    <div
                      style={{
                        fontSize: "17px",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      <span style={{ margin: "10px" }}>Collapse</span>
                      <ChevronRightIcon />
                    </div>
                  )}
                </IconButton>
              </ListItemIcon>
            </ListItemButton>

            {groupName === "Admin" ||
            groupName === "View_and_edit" ||
            groupName === "View_and_nonspatial_edit" ? (
              <div>
                <ListItemButton onClick={handleShow2}>
                  <Tooltip title="Query on Utility Features">
                    <ListItemIcon>
                      <i className="fa fa-globe" aria-hidden="true"></i>
                    </ListItemIcon>
                  </Tooltip>

                  <ListItemText>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "10px",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      Query on Utility Features
                    </Typography>
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </div>
            ) : null}

            {groupName === "Admin" ||
            groupName === "View_and_edit" ||
            groupName === "View_and_nonspatial_edit" ? (
              <div>
                <ListItemButton onClick={handleShow}>
                  <Tooltip title="Query on Utility Attributes">
                    <ListItemIcon>
                      <i class="fa fa-table" aria-hidden="true"></i>
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "10px",
                        fontFamily: "poppins, sans-serif",
                      }}
                    >
                      Query on Utility Attributes
                    </Typography>
                  </ListItemText>
                </ListItemButton>
                <Divider />
              </div>
            ) : null}

            {groupName === "Admin" || groupName === "View_and_edit" ? (
              <span>
                <ListItemButton onClick={handleDrawClick}>
                  <Tooltip title="Draw tools">
                    <ListItemIcon>
                      <BrushIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Draw tools" />
                  {drawopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={drawopen} timeout="auto" unmountOnExit>
                  <Drawvector />
                </Collapse>
                <Divider />

                <ListItemButton onClick={handleDrawmeasureClick}>
                  <Tooltip title="Measure tools">
                    <ListItemIcon>
                      <SquareFootIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Measure tools" />
                  {drawmeasureopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={drawmeasureopen} timeout="auto" unmountOnExit>
                  <Drawmeasure />
                </Collapse>
                <Divider />

                {/* <ListItemButton onClick={handleDraweditClick}>
                  <Tooltip title="Edit tools">
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                  </Tooltip>
                  <ListItemText primary="Edit tools" />
                  {draweditopen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton> */}
                <Collapse in={draweditopen} timeout="auto" unmountOnExit>
                  <Vectoredit />
                </Collapse>
                <Divider />
              </span>
            ) : null}

            {/* <ListItemButton onClick={handleShow3}>
              <Tooltip title="Swipe">
                <ListItemIcon>
                  <i class="fa fa-sliders" aria-hidden="true"></i>
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Swipe" />
            </ListItemButton> */}

            {groupName === "Admin" ? (
              <ListItemButton onClick={handleShow4}>
                <Tooltip title="Upload Shape File">
                  <ListItemIcon>
                    <i class="fa fa-upload" aria-hidden="true"></i>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Upload Shape File" />
              </ListItemButton>
            ) : null}

            {groupName === "Admin" ? (
              <ListItemButton onClick={handleShow6}>
                <Tooltip title="Layers to Publish">
                  <ListItemIcon>
                    <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText primary="Layers to Publish" />
              </ListItemButton>
            ) : null}

            {groupName === "Admin" ? (
              <ListItemButton onClick={handleShow7}>
                <Tooltip title="Delete Existing Layer">
                  <ListItemIcon>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Delete Existing Layer"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                  }}
                />
              </ListItemButton>
            ) : null}

            {groupName === "Admin" ? (
              <ListItemButton onClick={handleShow8}>
                <Tooltip title="Predefined Queries">
                  <ListItemIcon>
                    <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Predefined Queries"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                  }}
                />
              </ListItemButton>
            ) : null}

            <Divider />
          </List>
          <Divider />
        </RightDrawer>

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
              Copyright © 2023 NMSCDCL. All rights reserved
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

        {/* Non Spatial Query  */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          centered
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Modal.Header
            style={{
              color: "white",
              background: "#294A69",
              padding: "9px",
            }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Query on Utility Attributes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <b>Layer:</b>
              </Col>
              <Col>
                <Form.Select onChange={handleNonSpLayer}>
                  <option value="">Select layer</option>
                  {data &&
                    data.length > 0 &&
                    data.map((item) => (
                      <option key={item.id} value={item.id + "-" + item.name}>
                        {item.title}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-1">
              <Col>
                <Form.Select
                  // value={nonSpAttribute}
                  onChange={handleNonspAttribute}
                >
                  <option value="">Select Attribute</option>
                  {nonSpAttribute &&
                    nonSpAttribute.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            {/* <Row className="mt-1">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Goto"
                  onChange={handleSearch}
                />
              </Col>
            </Row> */}
            <div style={{ display: "flex", padding: "8px" }}>
              <div style={{ width: "50%" }}>
                <Row className="mt-1">
                  <Col>
                    <Button
                      variant="primary"
                      value="="
                      onClick={handleExpresssion}
                    >
                      =
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      value="<>"
                      onClick={handleExpresssion}
                    >
                      &lt;&gt;
                    </Button>
                  </Col>

                  <Col>
                    {/* <Button
                      variant="primary"
                      value="Like"
                      onClick={handleExpresssion}
                    >
                      Like
                    </Button> */}
                    <Button
                      variant="primary"
                      value="Is"
                      onClick={handleExpresssion}
                    >
                      Is
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-1">
                  <Col>
                    <Button
                      variant="primary"
                      value=">"
                      onClick={handleExpresssion}
                    >
                      &gt;
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      value=">="
                      onClick={handleExpresssion}
                    >
                      &gt;=
                    </Button>
                  </Col>

                  <Col>
                    {/* <Button
                      variant="primary"
                      value="And"
                      onClick={handleExpresssion}
                    >
                      And
                    </Button> */}
                  </Col>
                  <Col xs={6}></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button
                      variant="primary"
                      value="<"
                      onClick={handleExpresssion}
                    >
                      &lt;
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      value="<="
                      onClick={handleExpresssion}
                    >
                      &lt;=
                    </Button>
                  </Col>

                  <Col>
                    {/* <Button
                      variant="primary"
                      value="Or"
                      onClick={handleExpresssion}
                    >
                      Or
                    </Button> */}
                  </Col>
                  <Col xs={6}></Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Button
                      variant="primary"
                      value="%"
                      onClick={handleExpresssion}
                    >
                      %
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      value="( )"
                      onClick={handleExpresssion}
                    >
                      ( )
                    </Button>
                  </Col>

                  <Col>
                    {/* <Button
                      variant="primary"
                      value="Not"
                      onClick={handleExpresssion}
                    >
                      Not
                    </Button> */}
                  </Col>
                  <Col xs={6}></Col>
                </Row>
              </div>
              <div
                style={{
                  width: "50%",
                  border: "1px solid black",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Form.Select onChange={handleUniqueValue}>
                  <option value=""> Select value</option>
                  {nonSpUnique
                    ? nonSpUnique.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </div>
            </div>

            <Row className="mt-1">
              <Col>
                {/* <Button
                  variant="primary"
                  value="Is"
                  onClick={handleExpresssion}
                >
                  Is
                </Button> */}
              </Col>

              <Col xs={2}></Col>
              <Col xs={3}>
                <Button variant="primary" onClick={handleReset}>
                  Clear
                </Button>
              </Col>
            </Row>

            <Row className="mt-1">
              <Col>
                <div>
                  SELECT * FROM {nonSpLayerName} WHERE {nonSpColumn}
                  {nonSpExpression} {nonSpValue}
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleNonSpatialQuery}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Spatial Query */}
        <Modal show={show2} onHide={handleClose2} backdrop="static" centered>
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title
              style={{ fontSize: "14px", fontFamily: "poppins, sans-serif" }}
            >
              Query on Utility Features
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ fontFamily: "poppins, sans-serif" }}>
            <Row>
              <Col>
                <b>Input Features</b>
              </Col>
              <Col>
                <Form.Select onChange={handleInputFeature}>
                  <option value="">--Select Input Feature--</option>
                  {data &&
                    data.length > 0 &&
                    data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <b>Relationship</b>
              </Col>
              <Col>
                <Form.Select
                  // value={relationship}
                  onChange={handleRelationshipChange}
                >
                  <option value="">--Select Relationship--</option>
                  {spatialOptions && spatialOptions.length > 0 ? (
                    spatialOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option.replace(/_/g, " ")}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <b>Selecting Features</b>
              </Col>

              <Col>
                <Form.Select onChange={handleSelectFeature}>
                  <option value="">--Select Features--</option>
                  {data &&
                    data.length > 0 &&
                    data.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            {relationship == "Are_Within_A_Distance" ? (
              <Row className="mt-3">
                <Col>
                  <b>Search Distance</b>
                </Col>
                <Col>
                  <div style={{ display: "flex" }}>
                    <div style={{ width: "50%" }}>
                      <InputGroup className="mb-3">
                        <Form.Control
                          aria-label="Distance"
                          onChange={handleDistanceChange}
                        />
                      </InputGroup>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        paddingLeft: "3px",
                        paddingTop: "3px",
                      }}
                    >
                      Meters
                    </div>
                  </div>
                </Col>
              </Row>
            ) : null}
          </Modal.Body>

          <Modal.Footer style={{ fontFamily: "poppins, sans-serif" }}>
            <Button variant="primary" onClick={handleSpatialClear}>
              Clear
            </Button>
            <Button variant="primary" onClick={handleSpatialQuery}>
              Apply
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Swipe */}
        {/* <Modal show={show3} onHide={handleClose3} backdrop="static" centered>
          <Modal.Header
            style={{ color: "white", background: "#556080", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>Swipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Row>
              <Col>
                <b>Select Background Layer</b>
              </Col>
              <Col>
                <Form.Select>
                  <option value="Layer 1">Layer 1</option>
                  <option value="Layer 2">Layer 2</option>
                  <option value="Layer 3">Layer 3</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <b>Select Foreground Layer</b>
              </Col>
              <Col>
                <Form.Select>
                  <option value="Layer 1">Layer 1</option>
                  <option value="Layer 2">Layer 2</option>
                  <option value="Layer 3">Layer 3</option>
                </Form.Select>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose3}>
              Start Swiping
            </Button>
          </Modal.Footer>
        </Modal> */}

        {/* Upload Shape File */}
        <Modal
          size="lg"
          show={show4}
          onHide={handleClose4}
          backdrop="static"
          centered
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Upload Shape File
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-2">
              <Col>
                <b>Shape File</b>
              </Col>
              <Col>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleShapeFileChange}
                />
              </Col>
              <Col>
                <b>Choice</b>
              </Col>
              <Col>
                <Form.Select onChange={handleChoiceChange}>
                  <option value="">--Select--</option>
                  <option value="CREATE">CREATE</option>
                  <option value="OVERWRITE">OVERWRITE</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>{/* <b>Export</b> */}</Col>
              <Col>
                {/* <Form.Select onChange={handleExportsChange}>
                  <option value="">--Select--</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                </Form.Select> */}
              </Col>
              <Col>{/* <b>Creation Mode</b> */}</Col>
              <Col>
                {/* <Form.Select onChange={handleCreationModeChange}>
                  <option value="">--Select--</option>
                  <option value="CREATE">CREATE</option>
                  <option value="APPEND">APPEND</option>
                  <option value="OVERWRITE">OVERWRITE</option>
                </Form.Select> */}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <b>Layer Name</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Layer Name"
                  onChange={handleLayerNameChange}
                />
              </Col>
              <Col>
                {/* <b>Encoding</b> */} <b>Data Store</b>
              </Col>
              <Col>
                {/* <Form.Select onChange={handleEncodingChange}>
                  <option value="">--Select--</option>
                  <option value="UTF-8">UTF-8</option>
                  <option value="UTF-16">UTF-16</option>
                  <option value="UTF-32">UTF-32</option>
                </Form.Select> */}
                <Form.Select onChange={handleDataStoreChange}>
                  <option value="">--Select--</option>
                  {datastoreupload &&
                    datastoreupload.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>{/* <b>SRS</b> */}</Col>
              <Col>
                {/* <Form.Select onChange={handleSrsChange}>
                  <option value="">--Select--</option>
                  <option value="EPSG:4326">EPSG:4326</option>
                  <option value="EPSG:32643">EPSG:32643</option>
                </Form.Select> */}
              </Col>
              {/* <Col>
                <b>Data Store</b>
              </Col>
              <Col>
                <Form.Select onChange={handleDataStoreChange}>
                  <option value="">--Select--</option>
                  {datastoreupload &&
                    datastoreupload.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Form.Select>
              </Col> */}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleShapeFile}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Message for Upload shape file  */}
        <Modal show={showSuccess} onHide={handleSuccessClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#5cb85c",
              color: "white",
            }}
          >
            File Uploaded Successfully
          </Modal.Header>
        </Modal>

        {/* Error Message for Choice Dialog Box */}
        <Modal show={showErrorChoice} onHide={handleChoiceErrorClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Choice is Not Selected
          </Modal.Header>
        </Modal>

        {/* Error Message for Layer Name Dialog Box */}
        <Modal show={showErrorLayerName} onHide={handleLayerNameClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Layer Name is Empty
          </Modal.Header>
        </Modal>

        {/* Error Message for Datastore Dialog Box */}
        <Modal show={showErrorDatastore} onHide={handleDatastoreClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Datastore is Not Selected
          </Modal.Header>
        </Modal>

        {/* Publish Layer */}
        <Modal
          size="lg"
          show={show5}
          onHide={handleClose5}
          backdrop="static"
          centered
        >
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Publish Layer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-2">
              <Col>
                <b>Datastore</b>
              </Col>
              <Col>
                <Form.Select
                  onChange={handleDataStoreChange}
                  // value={selectedDatastore}
                >
                  <option value="">--Select--</option>
                  {datastorepublish &&
                    datastorepublish.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
              <Col>
                <b>Layer Group</b>
              </Col>
              <Col>
                <Form.Select onChange={handleLayerGroupChange}>
                  <option value="">--Select--</option>
                  {layergroup &&
                    layergroup.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <b>Layer Name</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Layer Name"
                  onChange={handleLayerNamePublishChange}
                  value={layerNamePublish}
                />
              </Col>
              <Col>
                <b>Layer Title</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Layer Title"
                  onChange={handleLayerTitleChange}
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <b>Abstract</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Abstract"
                  onChange={handleAbstractChange}
                />
              </Col>
              <Col>
                <b>Layer Type</b>
              </Col>
              <Col>
                <Form.Select onChange={handleLayerTypeChange}>
                  <option value="">-Select Layer Type-</option>
                  <option value="Raster">Raster</option>
                  <option value="Vector">Vector</option>
                </Form.Select>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <b>Native Srs</b>
              </Col>
              <Col>
                <Form.Select onChange={handleNativeSrsChange}>
                  <option value="">-Select Native Srs-</option>
                  <option value="EPSG:4326">EPSG:4326</option>
                  <option value="EPSG:32643">EPSG:32643</option>
                </Form.Select>
              </Col>
              <Col>{/* <b>Native Srs</b> */}</Col>
              <Col>
                {/* <Form.Control
                  type="text"
                  placeholder="Abstract"
                  onChange={handleNativeSrsChange}
                /> */}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handlePublishFile}>
              Publish
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Message for Publish Layer  */}
        <Modal
          show={showSuccessPublish}
          onHide={handleSuccessPublishClose}
          centered
        >
          <Modal.Header
            closeButton
            style={{
              background: "#5cb85c",
              color: "white",
            }}
          >
            Your Layer is Published
          </Modal.Header>
        </Modal>

        {/* Error Message for Layer Group  */}
        <Modal
          show={showErrorLayergroupInput}
          onHide={handleLayergroupInputClose}
          centered
        >
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Layer Group is not Selected
          </Modal.Header>
        </Modal>

        {/* Error Message for Layer Title  */}
        <Modal
          show={showErrorLayerTitle}
          onHide={handleLayerTitleClose}
          centered
        >
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Layer Title is not Selected
          </Modal.Header>
        </Modal>

        {/* Error Message for Abstract  */}
        <Modal show={showErrorAbstract} onHide={handleAbstractClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Abstract is not Selected
          </Modal.Header>
        </Modal>

        {/* Error Message for Layer Type  */}
        <Modal show={showErrorLayerType} onHide={handleLayerTypeClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Layer Type is not Selected
          </Modal.Header>
        </Modal>

        {/* Error Message for Native Srs  */}
        <Modal show={showErrorNativeSrs} onHide={handleNativeSrsClose} centered>
          <Modal.Header
            closeButton
            style={{
              background: "#d64242",
              color: "white",
            }}
          >
            Native Srs is not Selected
          </Modal.Header>
        </Modal>

        {/* Delete Existing Layers */}
        <Modal
          size="lg"
          show={show7}
          onHide={handleClose7}
          backdrop="static"
          centered
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Delete Existing Layers
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-2">
              <Col>
                <b>Select Layer to Delete</b>
              </Col>
              <Col>
                <Form.Select
                  onChange={(e) => handleDeleteLayer(e.target.value)}
                  // value={selectedDatastore}
                >
                  <option value="">--Select--</option>
                  {layerList &&
                    layerList.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deleteLayer}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Predefined Queries  */}
        <Modal
          size="lg"
          show={show8}
          onHide={handleClose8}
          backdrop="static"
          centered
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Predefined Queries
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="mt-2">
              <Col>
                <b>Select Query</b>
              </Col>
              <Col>
                <Form.Select onChange={handlePredefinedQuery}>
                  <option value="">--Select--</option>
                  {predefinedQuery ? (
                    predefinedQuery.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No options available
                    </option>
                  )}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col>
                Note:Please Select the associated layers to view the pre defined
                queries{" "}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={deletePredefinedQuery}>
              Clear
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Success Message for Deleting Layers  */}
        <Modal
          show={showSuccessDelete}
          onHide={handleSuccessDeleteClose}
          centered
        >
          <Modal.Header
            closeButton
            style={{
              background: "#5cb85c",
              color: "white",
            }}
          >
            Your Layer is Deleted
          </Modal.Header>
        </Modal>

        {/* Layer List */}
        <Modal
          size="lg"
          show={show6}
          onHide={handleClose6}
          backdrop="static"
          centered
          style={{ fontFamily: "poppins, sans-serif" }}
        >
          <Modal.Header
            style={{ color: "white", background: "#294A69", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Layers To Publish
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Layer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {exportedLayer && exportedLayer.length > 0 ? (
                  exportedLayer.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td
                        onClick={() => {
                          handleShow6();
                          handlePublishwithid(item.layerName);
                        }}
                      >
                        <a
                          style={{
                            textDecoration: "underline",
                            color: "blue",
                            cursor: "pointer",
                          }}
                        >
                          Publish
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      There is no layer to publish.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myname: state.name,
    myrightdrawerdata: state.rightdrawerdata,
    myleftdrawerdata: state.leftdrawerdata,
    mydrawerdata: state.drawerdata,
    firstname: state.firstname,
    nonSpatialData: state.nonSpatialData,
    nonSpatialQuery: state.nonSpatialQuery,
    spQuery: state.spQuery,
    predefinedQuery: state.predefinedQuery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changedrawerdata: (name) => {
      dispatch({ type: "CHANGE_DRAWER", payload: name });
    },
    leftdrawerdata: (leftname) => {
      dispatch({ type: "CHANGE_DRAWER_LEFT", payload: leftname });
    },
    rightdrawerdata: (rightname) => {
      dispatch({ type: "CHANGE_DRAWER_RIGHT", payload: rightname });
    },
    // changefirstname: (fname) => {
    //   dispatch({ type: "CHANGE_FIRSTNAME", payload: fname });
    // },
    changenonSpatialData: (nonSpatialData) => {
      dispatch({ type: "CHANGE_NONSPATIALDATA", payload: nonSpatialData });
    },
    changenonSpatialQuery: (nonSpatialQuery) => {
      dispatch({ type: "CHANGE_NONSPATIALQUERY", payload: nonSpatialQuery });
    },
    changeSpatialQuery: (spQuery) => {
      dispatch({ type: "CHANGE_SPATIALQUERY", payload: spQuery });
    },
    changePredefinedQuery: (predefinedQuery) => {
      dispatch({ type: "CHANGE_PREDEFINEDQUERY", payload: predefinedQuery });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NashikHomeNew);
