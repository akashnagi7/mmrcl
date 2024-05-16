// The below code displays the layers with their respective groups
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import SwipeMap from "../Swipe/SwipeMap";
import "../../App.css";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Switch } from "@mui/material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

let idOfLayer;
let axiosConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: sessionStorage.getItem("acessToken"),
  },
};
const LayerData = (props) => {
  const [test, SetTest] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const [checkboxData, setCheckboxData] = useState(props.myname || []);
  function handleCheckboxChange(id) {
    console.log(id);
    const newCheckboxes = [...checkboxData];
    console.log(newCheckboxes);
    const checkboxIndex = newCheckboxes.findIndex(
      (checkbox) => checkbox.id === id
    );
    newCheckboxes[checkboxIndex].checked =
      !newCheckboxes[checkboxIndex].checked;
    setCheckboxData(newCheckboxes);
    console.log(newCheckboxes);
    props.changeName(newCheckboxes);
  }
  const [opacitycheckboxData, opacitysetCheckboxData] = useState(
    props.myopacityname || []
  );
  function handleopacityCheckboxChange(id) {
    console.log(id);
    const newopacityCheckboxes = [...opacitycheckboxData];
    console.log(newopacityCheckboxes);
    const checkboxIndex = newopacityCheckboxes.findIndex(
      (checkbox) => checkbox.id === id
    );
    newopacityCheckboxes[checkboxIndex].checked =
      !newopacityCheckboxes[checkboxIndex].checked;
    opacitysetCheckboxData(newopacityCheckboxes);
    console.log(newopacityCheckboxes);
    props.opacitychangeName(newopacityCheckboxes);
  }

  const [show, setShow] = useState(false);
  const [attributeId, SetAttributeId] = useState("");
  const [filteredData, SetFilteredData] = useState("");

  const handleShow = (id) => {
    SetAttributeId(id);
    idOfLayer = id;
    console.log(id);
    axios
      .get(`/query/GetAttributeJsonData/${idOfLayer}`, axiosConfig)
      .then((res) => {
        console.log(res.data.data);
        setTableData(res.data.data);
      });
    setShow(true);
  };

  function handleOpacityChange(event, id) {
    const updatedCheckboxData = [...checkboxData];
    const checkboxIndex = updatedCheckboxData.findIndex(
      (checkbox) => checkbox.id === id
    );
    // updatedCheckboxData[checkboxIndex].checked = true;
    updatedCheckboxData[checkboxIndex].opacity = parseFloat(event.target.value);
    setCheckboxData(updatedCheckboxData);
    props.changeName(updatedCheckboxData);
  }

  //To get the list of layers
  useEffect(() => {
    if (props.myname.length == 0) {
      axios.get("/services/GetVectorTileLayerList").then((res) => {
        console.log(res.data.data);
        setCheckboxData(res.data.data);
        const newCheckboxes = [...res.data.data];
        opacitysetCheckboxData(res.data.data);
        props.changeName(newCheckboxes);
        props.opacitychangeName(newCheckboxes);
        // SetTest(res.data.data[0].get_ol_params.params.LAYERS);
      });
    }
    // axios.get("/services/GetVectorTileLayerList").then((res) => {
    //   console.log(res.data.data);
    //   setCheckboxData(res.data.data);
    // });
  }, props.myname);

  //parent array with the group names
  const [parentArray, setParentArray] = useState(props.myparentname || []);

  //child array with individual ids
  const [childArray, setChildArray] = useState([
    { id: 1, title: "Child 1", isChecked: false },
    { id: 2, title: "Child 2", isChecked: false },
    { id: 3, title: "Child 3", isChecked: false },
    { id: 4, title: "Child 4", isChecked: false },
  ]);

  // //To check the response of parent and child
  // useEffect(() => {
  //     console.log("parentArray:", parentArray);
  //     console.log("childArray:", childArray);
  //     console.log("From api");
  // }, [parentArray, childArray]);

  //Get the Parent array as group of layers
  useEffect(() => {
    console.log("childArray:", childArray);
    console.log("From api");

    if (props.myparentname.length == 0) {
      axios.get("/services/GetLayerGroupListOther").then((res) => {
        console.log(res.data.data);
        // const filteredData = res.data.data.filter(
        //   (item) => item.name === "Storm Water Network"
        // );
        // console.log(filteredData, "sdshdshgdshdgjhdgshdg");
        //  const filteredData = res.data.data.filter(
        //    (item) => item.name !== "Door To Door Step Water Consumer survey"
        //  );
        //  console.log(filteredData, "data without door to door")
        setParentArray(res.data.data);
        props.changeParentName(res.data.data);
      });
    }
  }, props.myparentname);
  useEffect(() => {
    axios
      .get("/services/GetVectorTileLayerListOther", axiosConfig)
      .then((res) => {
        console.log(res.data.data);
        setChildArray(res.data.data);
        setLoading(false);
      });

    SetFilteredData(childArray.filter((item) => item.checked));
    console.log(filteredData);
  }, []);

  const handleParentCheckboxChange = (event, parentId) => {
    setParentArray(
      parentArray.map((parent) => {
        if (parent.id === parentId) {
          const isChecked = event.target.checked;
          const updatedParent = { ...parent, isChecked };
          // const updatedChildArray = childArray.map((child) =>
          //   parent.layer_set.includes(child.id)
          //     ? { ...child, isChecked }
          //     : child
          // );
          // setChildArray(updatedChildArray);

          const updatedChildArray = checkboxData.map((child) =>
            parent.layer_set.includes(child.id)
              ? { ...child, checked: event.target.checked }
              : child
          );
          console.log(updatedChildArray);
          setCheckboxData(updatedChildArray);
          props.changeName(updatedChildArray);

          return updatedParent;
        } else {
          return parent;
        }
      })
    );

    props.changeParentName(
      parentArray.map((parent) => {
        if (parent.id === parentId) {
          const isChecked = event.target.checked;
          const updatedParent = { ...parent, isChecked };
          const updatedChildArray = checkboxData.map((child) =>
            parent.layer_set.includes(child.id)
              ? { ...child, checked: event.target.checked }
              : child
          );
          return updatedParent;
        } else {
          return parent;
        }
      })
    );
  };

  const [parentChildVisibility, setParentChildVisibility] = useState(
    parentArray.map(() => false)
  );

  const handleParentChildToggle = (index) => {
    setParentChildVisibility((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const handleChildCheckboxChange = (event, childId) => {
    setChildArray((prev) =>
      prev.map((child) =>
        child.id === childId
          ? { ...child, isChecked: event.target.checked }
          : child
      )
    );

    console.log(childArray);
  };

  const [tableData, setTableData] = useState([
    { id: 1, name: "John", age: 25, rollnumber: 10 },
    { id: 2, name: "Jane", age: 30 },
    // Add more rows as needed
  ]);

  const fields = Object.keys(tableData[0]); // Get the fields dynamically

  const handleCellChange = (event, rowId, field) => {
    const updatedData = tableData.map((row) =>
      row.id === rowId ? { ...row, [field]: event.target.value } : row
    );
    setTableData(updatedData);
  };

  const saveChanges = () => {
    const updatedData = {
      type: "FeatureCollection",
      features: tableData.map((item) => ({
        type: "Feature",
        properties: item,
      })),
    };

    console.log(updatedData);
    console.log("Saved changes:", tableData);

    axios
      .post(
        `http://10.202.101.108:9023/nmscdcl/services/SpatialNonSpatialEditing/${idOfLayer}/`,
        {
          action: "Update",
          editType: "Non-Spatial",
          Geojson: JSON.stringify(updatedData),
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response.data.data);
        // props.changenonSpatialData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //handle the page changes
  function handlePageChange(page) {
    console.log(page);
    setCurrentPage(page);
  }

  //adding pagination
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1); //get the current page
  const totalPages = Math.ceil(tableData.length / itemsPerPage); //get the total pages to be displayed with 10 item per page

  // //indexing of pages
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // let currentItems = tableData.slice(startIndex, endIndex);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = tableData.slice(startIndex, endIndex);
    setCurrentItems(currentItems);
  }, [currentPage, tableData]);

  console.log(currentItems);
  const items = [];

  for (let page = 1; page <= totalPages; page++) {
    console.log(totalPages);
    items.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  const handleClose = () => {
    setShow(false);
    setCurrentItems(null);
    console.log("After hiding", currentItems);
    setCurrentPage(1);
  };

  //adding user group management for View and Edit User Groups

  const [groupName, setGroupName] = useState();
  useEffect(() => {
    const storedGroupName = sessionStorage.getItem("groupname");
    setGroupName(storedGroupName);
    console.log(groupName);
    console.log("Here is the group Name");
    console.log(storedGroupName);
  }, []);

  //display a loader for loading the layers
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const loadingTimeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 10000);

  //   return () => clearTimeout(loadingTimeout);
  // }, []);

  //handle success message for attribute editing
  const [showSuccessAttribute, SetShowSuccessAttribute] = useState(false);

  const handleSuccessAttributeClose = () => {
    console.log("handle Success");
    SetShowSuccessAttribute(false);
  };

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="font-layer nashiksmartcityfont">
        {parentArray.map((parent, index) => {
          if (parent.name === "Water Consumer survey") {
            return (
              <div key={parent.id}>
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={() => handleParentChildToggle(index)}
                >
                  {parentChildVisibility[index] ? "-" : "+"}
                </button>
                <input
                  type="checkbox"
                  checked={parent.isChecked}
                  onChange={(event) =>
                    handleParentCheckboxChange(event, parent.id)
                  }
                />
                &nbsp;
                {parent.title}
                {parentChildVisibility[index] && (
                  <ul style={{ listStyleType: "none" }}>
                    {parent.layer_set.map((childId) => {
                      const child = checkboxData.find((c) => c.id === childId);
                      const opacitychild = opacitycheckboxData.find(
                        (c) => c.id === childId
                      );
                      if (child) {
                        return (
                          <li key={child.id}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={child.checked}
                                    onChange={() =>
                                      handleCheckboxChange(child.id)
                                    }
                                    name={child.title}
                                    style={{
                                      padding: "0px",
                                      transform: "scale(0.7)",
                                    }}
                                  />
                                }
                                label={
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>{child.title}</span>
                                  </div>
                                }
                                style={{ display: "flex" }}
                              />

                              {/* Handle User Group for Water Consumer Layer */}
                              {groupName === "Admin" ||
                              groupName === "View_and_edit" ||
                              groupName === "View_and_nonspatial_edit" ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleShow(child.id)}
                                >
                                  <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Attribute Edit</Tooltip>}
                                  >
                                    <i className="fa fa-edit" />
                                  </OverlayTrigger>
                                </div>
                              ) : null}
                            </div>
                            {child.checked && (
                              <>
                                <Typography
                                  sx={{ fontSize: 14, transform: "scale(0.7)" }}
                                  color="text.secondary"
                                >
                                  Opacity
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 2, transform: "scale(0.7)" }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  <Slider
                                    defaultValue={child.opacity}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    onChange={(event) =>
                                      handleOpacityChange(event, child.id)
                                    }
                                  />
                                </Typography>
                              </>
                            )}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Handle success message for attribute editing  */}
      <Modal
        show={showSuccessAttribute}
        onHide={handleSuccessAttributeClose}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            background: "#5cb85c",
            color: "white",
          }}
        >
          Attribute Editing Successfully Done
        </Modal.Header>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
        style={{ fontFamily: "poppins, sans-serif" }}
      >
        <Modal.Header
          style={{ color: "white", background: "#1C3B68", padding: "9px" }}
          closeButton
        >
          <Modal.Title style={{ fontSize: "14px" }}>
            Attribute Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "auto", overflowY: "auto" }}>
            <table>
              <thead>
                <tr style={{ fontSize: "12px" }}>
                  {fields.map((field) => (
                    <th
                      style={{
                        background: "#1C3B68",
                        color: "white",
                      }}
                      key={field}
                    >
                      {field.replace("_", " ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((row) => (
                    <tr key={row.id}>
                      {fields.map((field) => (
                        <td key={`${row.id}-${field}`}>
                          <input
                            type="text"
                            value={row[field]}
                            onChange={(e) => handleCellChange(e, row.id, field)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <div style={{ transform: "scale(0.8)", display: "inline-block" }}>
              <Pagination className="custom-pagination">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {currentPage > 2 && (
                  <>
                    <Pagination.Item onClick={() => handlePageChange(1)}>
                      1
                    </Pagination.Item>
                    {currentPage !== 3 && <Pagination.Ellipsis />}
                  </>
                )}
                {currentPage > 1 && (
                  <Pagination.Item
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    {currentPage - 1}
                  </Pagination.Item>
                )}
                <Pagination.Item active>{currentPage}</Pagination.Item>
                {currentPage < totalPages && (
                  <Pagination.Item
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    {currentPage + 1}
                  </Pagination.Item>
                )}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage !== totalPages - 2 && <Pagination.Ellipsis />}
                    <Pagination.Item
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Pagination.Item>
                  </>
                )}
                <Pagination.Next
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </Pagination>
            </div>

            {/* <button onClick={saveChanges}>Save Changes</button> */}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={saveChanges}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myname: state.name,
    myopacityname: state.opacityname,
    myparentname: state.parentname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeName: (name) => {
      dispatch({ type: "CHANGE_NAME", payload: name });
    },
    opacitychangeName: (opacityname) => {
      dispatch({ type: "OPACITY_CHANGE_NAME", payload: opacityname });
    },
    changeParentName: (parentname) => {
      dispatch({ type: "CHANGE_PARENT_NAME", payload: parentname });
    },
  };
};
console.log(LayerData);

export default connect(mapStateToProps, mapDispatchToProps)(LayerData);
