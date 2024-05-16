//The below code is for user management and feedback.
import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled, useTheme } from "@mui/material/styles";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./CustomTabs.css";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { Dropdown } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

//Header Material Component
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

//Get the token from session storage
let axiosConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: sessionStorage.getItem("acessToken"),
  },
};

const Usermanagement = (props) => {
  //************************************User Creation/Registeration Start************************************** *//
  const [fname, setFname] = useState("");
  useEffect(() => {
    const storedFname = sessionStorage.getItem("fname");
    setFname(storedFname);
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    window.location.href = "/";
  }

  function handleLogin() {
    sessionStorage.clear();
    window.location.href = "/login";
  }

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const [userName, setUserName] = useState("");
  const handleUserNameChange = (event) => {
    console.log(event.target.value);
    setUserName(event.target.value);
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value);
    setPhoneNumber(event.target.value);

    const newPhoneNumber = event.target.value;
    console.log(newPhoneNumber, "const variable");

    const phoneNumberLength = newPhoneNumber.length;
    console.log(phoneNumberLength, "Phone number length");

    if (phoneNumberLength != 10) {
      setPhoneNumberMessage("Phone Number Should be of 10 digits");
    } else {
      setPhoneNumberMessage("");
    }
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const [group, setGroup] = useState("");
  const handleGroupChange = (event) => {
    console.log(event.target.value);
    setGroup(event.target.value);
  };

  const [groupData, setGroupData] = useState("");

  useEffect(() => {
    console.log("Group List Here");
    axios.get("/admin/get-user-group-list/", axiosConfig).then((res) => {
      console.log(res.data.data, "Group List Here");
      setGroupData(res.data.data);
    });
  }, []);

  //handle User Registeration
  const submitHandler = (event) => {
    console.log("Register User Here");
    const registerData = {
      name: name,
      username: userName,
      password: password,
      email: email,
      phone_number: phoneNumber,
      group: group,
    };

    axios
      .post("/auth/register/", registerData, axiosConfig)
      .then((response) => {
        console.log(response);
        if (response.data.message == "New user registered successfully") {
          Swal.fire({
            title: "Good job!",
            text: "New user registered successfully",
            icon: "success",
          });

          setName("");
          setUserName("");
          setPhoneNumber("");
          setPassword("");
          setEmail("");
          setGroup("");
        }
      })
      .catch((error) => {
        console.error(error);
        console.error(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });

    if (!name) {
      console.log("Name is empty");
      return;
    }

    if (!userName) {
      console.log("UserName is empty");
      return;
    }

    if (!phoneNumber) {
      console.log("Phone Number is empty");
      return;
    }

    if (!password) {
      console.log("Password is empty");
      return;
    }

    if (!email) {
      console.log("Email is empty");
      return;
    }
  };

  //handle go back
  const handleGoBack = () => {
    console.log("Go back");
    window.location.replace("/home");
  };

  //************************************ User Creation/Registeration End ************************************** *//

  //************************************ User Management Start ************************************** *//
  const [userTableData, SetUserTableData] = useState();
  const [permissionData, SetPermissionData] = useState();

  //Get the user table data for managing users
  useEffect(() => {
    console.log("Page Load Here");
    axios.get("/admin/get-user-list/", axiosConfig).then((res) => {
      console.log(res.data.data);
      SetUserTableData(res.data.data);
    });

    console.log("Get the types of permissions");
    axios.get("/admin/get-user-group-list/", axiosConfig).then((res) => {
      console.log(res.data.data, "permission data");
      SetPermissionData(res.data.data);
    });
  }, []);

  //handle deletion of User Object
  const handleUserDelete = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);

    axios
      .delete(`/admin/disable-user/${userId}`, axiosConfig)
      .then((response) => {
        console.log(`User with ID ${userId} has been deleted.`);
        console.log(response.data);

        Swal.fire({
          icon: "success",
          title: "User is disabled",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error(
          `Error deleting user with ID ${userId}: ${error.message}`
        );
      });
  };

  //handle Editing of User Object
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleEditModalClose = () => {
    console.log("Edit modal closed");
    setEditModal(false);
  };

  const handleUserEdit = (userId) => {
    console.log(userId);
    console.log(`Edit user with ID ${userId.id}`);
    console.log(`Edit user with Name ${userId.name}`);
    console.log(`Edit user with username ${userId.username}`);
    console.log(`Edit user with email ${userId.email}`);
    console.log(`Edit user with is_active ${userId.is_active}`);
    console.log(`Edit user with permission ${userId.groups[0].name}`);
    setEditId(userId.id);
    setName(userId.name);
    setUserName(userId.username);
    setEmail(userId.email);
    setPhoneNumber(userId.phone_number);
    setGroup(userId.groups[0].name);
    setEditModal(true);
  };

  const updateHandler = () => {
    console.log("Handle update");
    const updatedData = {
      name: name,
      username: userName,
      email: email,
      phone_number: phoneNumber,
      group: group,
      // user_id: editId,
    };

    // Update the existing users
    axios
      .put(`/admin/update-user/${editId}/`, updatedData, axiosConfig)
      .then((response) => {
        console.log("Update successful", response.data);
        setEditModal(false);
        Swal.fire({
          icon: "success",
          title: "Your Update is Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating data", error);
      });
  };

  const handleNameEdit = (event) => {
    setName(event.target.value);
  };

  const handleUserNameEdit = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailEdit = (event) => {
    setEmail(event.target.value);
  };

  const handleGroupEdit = (event) => {
    setGroup(event.target.value);
  };

  //Filter the data for user management according to users choice
  const handleUserManageFilter = () => {
    console.log("Apply Manage Filter");
    const userManageDataFilter = {
      groups__name: actionFilter,
    };

    axios
      .get("/admin/get-user-list/", {
        params: userManageDataFilter,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res.data.data);
        SetUserTableData(res.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });

    setCurrentPage(1);
  };

  //Download the filter data for user management according to users choice
  const handleUserManagementCsv = () => {
    console.log("Download User Management CSV");
    const userManageDataCsv = {
      groups__name: actionFilter,
    };

    axios
      .get("/admin/download-user-list/", {
        params: userManageDataCsv,
        ...axiosConfig,
      })
      .then((res) => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/csv" });

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "user-management.csv"; // Specify the file name

        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();

        // Release the URL object to free resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  //Adding Pagination for user management
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(userTableData?.length / itemsPerPage || 0);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const userTableDataPaginated = userTableData
    ? userTableData.slice(startIndex, endIndex)
    : [];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //************************************ User Management End ************************************** *//

  //************************************ User Logs Start ************************************** *//

  const [userLogData, setUserLogData] = useState();
  const [active, setActive] = useState("");
  const [deleteFilter, setDeleteFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  //Get the user table data for managing users
  useEffect(() => {
    console.log("User Log Here");
    axios.get("/admin/get-user-history/", axiosConfig).then((res) => {
      console.log(res.data.data);
      setUserLogData(res.data.data);
    });
  }, []);

  //Filter the data according to users choice
  const handleUserLogFilter = () => {
    console.log("User Log Here");
    const userLogDataFilter = {
      is_active: active,
      is_delete: deleteFilter,
      search: usernameFilter,
      action: actionFilter,
    };

    console.log(userLogDataFilter);
    axios
      .get("/admin/get-user-history/", {
        params: userLogDataFilter,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res.data.data);
        setUserLogData(res.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        console.error(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Download the filtered data in csv format for user logs
  const handleUserLogsCsv = () => {
    console.log("Downlaod User Logs Csv");

    console.log("User Log Here");
    const userLogDataCsv = {
      is_active: active,
      is_delete: deleteFilter,
      search: usernameFilter,
      action: actionFilter,
    };

    console.log(userLogDataCsv);
    axios
      .get("/admin/download-user-history/", {
        params: userLogDataCsv,
        ...axiosConfig,
      })
      .then((res) => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/csv" });

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "user-logs.csv"; // Specify the file name

        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();

        // Release the URL object to free resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        console.error(error.response.data.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  const handleActiveChange = (e) => {
    setActive(e.target.checked);
  };

  const handleDeleteChange = (e) => {
    setDeleteFilter(e.target.checked);
  };

  const handleUsernameFilterChange = (e) => {
    setUsernameFilter(e.target.value);
  };

  const handleActionFilterChange = (e) => {
    setActionFilter(e.target.value);
  };

  //Adding Pagination for User logs
  const [currentPageLogs, setCurrentPageLogs] = useState(1);
  const totalPagesLogs = Math.ceil(userLogData?.length / itemsPerPage || 0);
  const startIndexLogs = (currentPageLogs - 1) * itemsPerPage;
  const endIndexLogs = startIndexLogs + itemsPerPage;
  const userLogDataPaginated = userLogData
    ? userLogData.slice(startIndexLogs, endIndexLogs)
    : [];
  const handlePageChangeLogs = (page) => {
    setCurrentPageLogs(page);
  };

  //************************************ User Logs End ************************************** *//

  //************************************ Layers History Start ************************************** *//

  const [userLogHistoryData, setUserLogHistoryData] = useState();
  const [actionFilterHistory, setActionFilterHistory] = useState();
  const [userNameHistory, setUserNameHistory] = useState();

  const handleActionFilterHistoryChange = (e) => {
    setActionFilterHistory(e.target.value);
  };

  const handleUsernameHistoryChange = (e) => {
    setUserNameHistory(e.target.value);
  };

  //Get the user table data for managing layer history data
  useEffect(() => {
    console.log("User History Data Here");
    axios.get("/admin/get-layer-history", axiosConfig).then((res) => {
      console.log(res.data.data, "Layer History");
      setUserLogHistoryData(res.data.data);
    });
  }, []);

  //Filter the data for Layer History according to users choice
  const handleLayerHistoryFilter = () => {
    console.log("Apply Layer History Filter");
    const layerHistoryDataFilter = {
      action: actionFilterHistory,
      search: userNameHistory,
    };

    axios
      .get("/admin/get-layer-history", {
        params: layerHistoryDataFilter,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res);
        setUserLogHistoryData(res.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Download the layer history csv file
  const handleLayerHistoryCsv = () => {
    console.log("Download layer history csv ");
    const layerHistoryDataCsv = {
      action: actionFilterHistory,
      search: userNameHistory,
    };

    axios
      .get("/admin/download-layer-history", {
        params: layerHistoryDataCsv,
        ...axiosConfig,
      })
      .then((res) => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/csv" });

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "user-logs.csv"; // Specify the file name

        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();

        // Release the URL object to free resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Adding Pagination for Layer history
  const [currentPageLayerHistory, setCurrentPageLayerHistory] = useState(1);
  const totalPagesLayerHistory = Math.ceil(
    userLogHistoryData?.length / itemsPerPage || 0
  );
  const startIndexLayerHistory = (currentPageLayerHistory - 1) * itemsPerPage;
  const endIndexLayerHistory = startIndexLayerHistory + itemsPerPage;
  const userLogHistoryDataPaginated = userLogHistoryData
    ? userLogHistoryData.slice(startIndexLayerHistory, endIndexLayerHistory)
    : [];
  const handlePageChangeLayerHistory = (page) => {
    setCurrentPageLayerHistory(page);
  };

  //************************************ Layers History End ************************************** *//

  //********************************** Uploaded Files History Start ************************************** *//

  const [filesHistoryData, setFilesHistoryData] = useState();
  const [actionFilterUpload, setActionFilterUpload] = useState();
  const [userNameUpload, setUserNameUpload] = useState();

  const handleActionFilterUploadChange = (e) => {
    setActionFilterUpload(e.target.value);
  };

  const handleUsernameUploadChange = (e) => {
    setUserNameUpload(e.target.value);
  };

  //Get the user table data for uploaded files history data
  useEffect(() => {
    console.log("Uploaded Files History Here");
    axios.get("/admin/get-uploaded-files-history", axiosConfig).then((res) => {
      console.log(res.data.data, "Uploaded Files History");
      setFilesHistoryData(res.data.data);
    });
  }, []);

  //Filter the data for Upload Files according to users choice
  const handleLayerUploadFilter = () => {
    console.log("Apply Upload Files Filter");
    const layerUploadData = {
      action: actionFilterUpload,
      search: userNameUpload,
    };

    axios
      .get("/admin/get-uploaded-files-history", {
        params: layerUploadData,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res.data.data);
        setFilesHistoryData(res.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Download Upload files history data
  const handleLayerUploadCsv = () => {
    console.log("Download layer upload csv");
    const layerUploadDataCsv = {
      action: actionFilterUpload,
      search: userNameUpload,
    };

    axios
      .get("admin/download-uploaded-files-history", {
        params: layerUploadDataCsv,
        ...axiosConfig,
      })
      .then((res) => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/csv" });

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "user-logs.csv"; // Specify the file name

        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();

        // Release the URL object to free resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Adding Pagination for uploaded files history
  const [currentPageUploadHistory, setCurrentPageUploadHistory] = useState(1);
  const totalPagesUploadHistory = Math.ceil(
    filesHistoryData?.length / itemsPerPage || 0
  );
  const startIndexUploadHistory = (currentPageUploadHistory - 1) * itemsPerPage;
  const endIndexUploadHistory = startIndexUploadHistory + itemsPerPage;
  const filesHistoryDataPaginated = filesHistoryData
    ? filesHistoryData.slice(startIndexUploadHistory, endIndexUploadHistory)
    : [];
  const handlePageChangeUploadHistory = (page) => {
    setCurrentPageUploadHistory(page);
  };

  //********************************** Uploaded Files History End ************************************** *//
  //********************************** Feedback Management Start ************************************** *//

  const [feedbackData, setFeedbackData] = useState();
  const [feedbackNameFilter, setFeedbackNameFilter] = useState();
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState();
  const [responseFilter, setResponseFilter] = useState();

  //get the user data for managing the feedback
  useEffect(() => {
    console.log("Feedback Management Here");
    axios.get("/admin/get-feedback-list", axiosConfig).then((res) => {
      console.log(res.data.data, "Feedback Management");
      setFeedbackData(res.data.data);
    });
  }, []);

  const handleFeedbackNameFilterChange = (event) => {
    console.log(event.target.value);
    setFeedbackNameFilter(event.target.value);
  };

  const handleFeedbackStatusFilterChange = (event) => {
    console.log(event.target.target);
    setFeedbackStatusFilter(event.target.value);
  };

  const handleResponseFilterChange = (event) => {
    console.log(event.target.value);
    setResponseFilter(event.target.value);
  };

  const handleFeedbackFilter = (event) => {
    console.log("Apply Feedback Filter");
    const feedbackFilterData = {
      is_responded: responseFilter,
      search: feedbackNameFilter,
      status: feedbackStatusFilter,
    };

    axios
      .get("/admin/get-feedback-list", {
        params: feedbackFilterData,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res.data.data);
        setFeedbackData(res.data.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Download Feedback Management Csv
  const handleFeedbackCsv = (event) => {
    console.log("Apply Feedback Filter");
    const feedbackFilterCsv = {
      is_responded: responseFilter,
      search: feedbackNameFilter,
    };

    axios
      .get("/admin/download-feedback-list", {
        params: feedbackFilterCsv,
        ...axiosConfig,
      })
      .then((res) => {
        // Create a blob from the response data
        const blob = new Blob([res.data], { type: "application/csv" });

        // Create a URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "user-logs.csv"; // Specify the file name

        // Trigger a click on the anchor element to initiate the download
        downloadLink.click();

        // Release the URL object to free resources
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  //Adding Pagination for feedback management
  const [currentPageFeedback, setCurrentPageFeedback] = useState(1);
  const totalPagesFeedback = Math.ceil(
    feedbackData?.length / itemsPerPage || 0
  );
  const startIndexFeedback = (currentPageFeedback - 1) * itemsPerPage;
  const endIndexFeedback = startIndexFeedback + itemsPerPage;
  const feedbackDataPaginated = feedbackData
    ? feedbackData.slice(startIndexFeedback, endIndexFeedback)
    : [];
  const handlePageChangeFeedback = (page) => {
    setCurrentPageFeedback(page);
  };

  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [feedbackId, setFeedbackId] = useState("");
  const [mailTrail, setMailTrail] = useState("");

  const handleResponseEmail = (userId, status) => {
    console.log(userId, status);
    //set the value of id and status
    setStatus(status);
    setFeedbackId(userId);
    const feedbackTrail = {
      feedback: userId,
    };

    axios
      .get(`/admin/get-feedback-response-list`, {
        params: feedbackTrail,
        ...axiosConfig,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message == "Feedback response data fetched successfully") {
          setMailTrail(res.data.data);
          setShowModal(true);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "No feedback response data available",
        // });
      });
    setShowModal(true);
  };

  const handleFeedback = () => {
    console.log("Post and update the feedback");
    console.log(status);
    console.log(feedbackId);
    console.log(comment);

    const feedbackActionData = {
      comment: comment,
      status: status,
    };

    axios
      .post(
        `/core/post-feedback-response/${feedbackId}`,
        feedbackActionData,
        axiosConfig
      )
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          //  title: "Feedback Updated",
          text: res.data.message,
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const handleCloseModal = () => {
    setMailTrail("");
    setShowModal(false);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleStatusChange = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  //********************************** Feedback Management End ************************************** *//
  //*************************************Handle Tabs Start*************************************************** *//
  const handleTabSelect = (tabKey) => {
    console.log(`${tabKey}`);
    //refresh user management tab
    axios.get("/admin/get-user-list/", axiosConfig).then((res) => {
      console.log(res.data.data);
      SetUserTableData(res.data.data);
    });
    setActionFilter("");

    //refresh user logs tab
    axios.get("/admin/get-user-history/", axiosConfig).then((res) => {
      console.log(res.data.data);
      setUserLogData(res.data.data);
    });
    setActive("");
    setDeleteFilter("");
    setUsernameFilter("");

    //refresh layer history tab
    axios.get("/admin/get-layer-history", axiosConfig).then((res) => {
      console.log(res.data.data, "Layer History");
      setUserLogHistoryData(res.data.data);
    });
    setActionFilterHistory("");
    setUserNameHistory("");

    //refresh layer upload history tab
    axios.get("/admin/get-uploaded-files-history", axiosConfig).then((res) => {
      console.log(res.data.data, "Uploaded Files History");
      setFilesHistoryData(res.data.data);
    });
    setActionFilterUpload("");
    setUserNameUpload("");

    //refresh feedback management tab
    axios.get("/admin/get-feedback-list", axiosConfig).then((res) => {
      console.log(res.data.data, "Feedback Management");
      setFeedbackData(res.data.data);
    });
    setResponseFilter("");
    setFeedbackNameFilter("");
  };

  //handle redirect to dashboard page
  function handleHomeLogo() {
    console.log("home logo");
    window.location.replace("/dashboard");
  }

  return (
    <>
      <Box
        sx={{
          marginTop: "85px",
        }}
        className="nashiksmartcityfont"
      >
        <CssBaseline />
        <span
          style={{
            position: "fixed",
            bottom: "35px",
            right: "20px",
          }}
          onClick={handleGoBack}
        >
          <Tooltip title="Go Back" placement="right">
            <Button
              variant="contained"
              style={{ backgroundColor: "white" }}
              onClick={handleGoBack}
            >
              <img src="./backOption.png" alt="Back Icon" height={"35vh"} />
            </Button>
          </Tooltip>
        </span>

        <div className="tabs-container">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            onSelect={handleTabSelect}
            className="mb-3 vertical-tabs"
            fill
          >
            {/* User Registeration  */}
            <Tab eventKey="home" title="User Registration">
              <div
                style={{
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "10px",
                  borderRadius: "30px",
                  background: "white",
                  width: "80%",
                }}
              >
                {/* Left Side Image */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="./registeration.jpg"
                    alt="User Icon"
                    height={"500px"}
                    width={"500px"}
                  />
                </div>

                {/* Right Side Form */}
                <div
                  style={{
                    flex: 2,
                    padding: "30px 80px",
                  }}
                >
                  <Form style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        height: "65vh",
                        marginTop: "10px",
                        borderRadius: "30px",
                        background: "white",
                        width: "85%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <span style={{ color: "#1C3B68", fontWeight: "500" }}>
                        <h5> Add New User</h5>
                        <h6> Admin Can Register New User Here!</h6>
                      </span>
                      <Form style={{ marginTop: "10px" }}>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={handleNameChange}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Control
                            type="text"
                            placeholder="Enter User Name"
                            value={userName}
                            onChange={handleUserNameChange}
                          />
                        </Form.Group>
                        <span style={{ color: "red", fontSize: "12px" }}>
                          {phoneNumberMessage}
                        </span>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="number"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={handleEmailChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          {/* <Form.Select
                            aria-label="Select Group"
                            onChange={handleGroupChange}
                            value={group}
                          >
                            <option value="">--Select Group--</option>
                            <option value="View_and_edit">View and edit</option>
                            <option value="View_and_nonspatial_edit">
                              View and nonspatial edit
                            </option>
                          </Form.Select> */}
                          <Form.Select
                            aria-label="Select Group"
                            onChange={handleGroupChange}
                            value={group}
                          >
                            <option value="">--Select Group--</option>
                            {groupData &&
                              groupData.map((permission, index) => (
                                <option key={index} value={permission.name}>
                                  {permission.name}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Form>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Button
                          variant="contained"
                          style={{ backgroundColor: "#1C3B68" }}
                          onClick={submitHandler}
                        >
                          Submit
                        </Button>
                      </div>
                      <span style={{ fontSize: "12px" }}>
                        <span style={{ color: "red" }}>*</span> password must
                        contain 1 number (0-9), 1 uppercase and 1 lowercase
                        letters, 1 non-alpha numeric number and is 8-16
                        characters with no space.
                      </span>
                    </div>
                  </Form>
                </div>
              </div>
            </Tab>

            {/* User Management */}
            <Tab eventKey="profile" title="User Management">
              <Row style={{ paddingLeft: "10px" }}>
                <Col md={2} style={{ display: "flex", alignItems: "center" }}>
                  <Form.Select
                    value={actionFilter}
                    onChange={handleActionFilterChange}
                  >
                    <option value="">--Select Permission--</option>
                    {permissionData &&
                      permissionData.map((permission, index) => (
                        <option key={index} value={permission.name}>
                          {permission.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>

                <Col md={1}>
                  <span onClick={handleUserManageFilter}>
                    <Tooltip title="Apply Filter">
                      <img
                        src="./filter.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    onClick={handleUserManagementCsv}
                  >
                    <Tooltip title="Download Csv">
                      <img
                        src="./csv_icon.png"
                        alt="Download CSV"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                </Col>
                <Col md={1}></Col>
              </Row>
              <div
                style={{
                  margin: "20px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table class="table table-striped table-sm table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#1C3B68",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Permission</th>
                      <th scope="col">Edit Option</th>
                      <th scope="col">Delete Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userTableDataPaginated && userTableDataPaginated ? (
                      userTableDataPaginated.map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.is_active ? (
                              <>
                                <span className="active-circle"></span>
                                <span style={{ marginLeft: "5px" }}>
                                  Active
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="inactive-circle"></span>
                                <span style={{ marginLeft: "5px" }}>
                                  Inactive
                                </span>
                              </>
                            )}
                          </td>
                          <td>{user.groups[0].name}</td>
                          <td>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#1C3B68",
                                transform: "scale(0.8)",
                              }}
                              onClick={() => handleUserEdit(user)}
                            >
                              <i className="fa fa-edit"></i>
                              <span
                                style={{
                                  marginLeft: "10px",
                                  textTransform: "none",
                                }}
                              >
                                Edit
                              </span>
                            </Button>
                          </td>
                          <td>
                            {user.username === "admin" ? (
                              "" // Show blank when username is 'admin'
                            ) : (
                              <Button
                                variant="contained"
                                style={{
                                  backgroundColor: "#1C3B68",
                                  transform: "scale(0.8)",
                                }}
                                onClick={() => handleUserDelete(user.id)}
                              >
                                <i className="fa fa-trash"></i>
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    textTransform: "none",
                                  }}
                                >
                                  Disable
                                </span>
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No user data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>

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
                      {currentPage !== totalPages - 2 && (
                        <Pagination.Ellipsis />
                      )}
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
            </Tab>

            {/* User Logs */}
            <Tab eventKey="longer-tab" title="User Logs">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              ></div>

              <Row
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                  // justifyContent: "center",
                }}
              >
                <Col
                  md={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "30px",
                  }}
                >
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={active}
                      onChange={handleActiveChange}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Active Users
                    </label>
                  </div>
                </Col>
                <Col
                  md={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "20px",
                  }}
                >
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked={deleteFilter}
                      onChange={handleDeleteChange}
                    />
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault"
                    >
                      Deleted Users
                    </label>
                  </div>
                </Col>
                <Col md={2}>
                  <Form.Select
                    value={actionFilter}
                    onChange={handleActionFilterChange}
                  >
                    <option value="">--Select Action--</option>
                    <option value="Create">Create</option>
                    <option value="Update">Update</option>
                    <option value="Disable">Disable </option>
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={usernameFilter}
                      onChange={handleUsernameFilterChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={1}>
                  <span onClick={handleUserLogFilter}>
                    <Tooltip title="Apply Filter">
                      <img
                        src="./filter.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                  <span
                    onClick={handleUserLogsCsv}
                    style={{ marginLeft: "10px" }}
                  >
                    <Tooltip title="Download Csv">
                      <img
                        src="./csv_icon.png"
                        alt="CSV Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  margin: "20px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table class="table table-striped table-sm table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#1C3B68",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Action</th>
                      <th scope="col">Active User Status</th>
                      <th scope="col">Deleted User Status</th>
                      <th scope="col">User Modified By</th>
                      <th scope="col">Modification/Creation Datetime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userLogDataPaginated ? (
                      userLogDataPaginated.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.phone_number}</td>
                          <td>{user.action}</td>
                          <td>{user.is_active ? "true" : "false"}</td>
                          <td>{user.is_delete ? "true" : "false"}</td>
                          <td>{user.created_or_updated_by}</td>
                          <td>
                            {user.modified_at
                              ? new Date(user.modified_at).toLocaleString()
                              : "N/A"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">No user logs available</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <Pagination className="custom-pagination">
                  <Pagination.Prev
                    disabled={currentPageLogs === 1}
                    onClick={() => handlePageChangeLogs(currentPageLogs - 1)}
                  />
                  {currentPageLogs > 2 && (
                    <>
                      <Pagination.Item onClick={() => handlePageChangeLogs(1)}>
                        1
                      </Pagination.Item>
                      {currentPageLogs !== 3 && <Pagination.Ellipsis />}
                    </>
                  )}
                  {currentPageLogs > 1 && (
                    <Pagination.Item
                      onClick={() => handlePageChangeLogs(currentPageLogs - 1)}
                    >
                      {currentPageLogs - 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Item active style={{ background: "red" }}>
                    {currentPageLogs}
                  </Pagination.Item>
                  {currentPageLogs < totalPagesLogs && (
                    <Pagination.Item
                      onClick={() => handlePageChangeLogs(currentPageLogs + 1)}
                    >
                      {currentPageLogs + 1}
                    </Pagination.Item>
                  )}
                  {currentPageLogs < totalPagesLogs - 1 && (
                    <>
                      {currentPageLogs !== totalPagesLogs - 2 && (
                        <Pagination.Ellipsis />
                      )}
                      <Pagination.Item
                        onClick={() => handlePageChangeLogs(totalPagesLogs)}
                      >
                        {totalPagesLogs}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    disabled={currentPageLogs === totalPagesLogs}
                    onClick={() => handlePageChangeLogs(currentPageLogs + 1)}
                  />
                </Pagination>
              </div>
            </Tab>

            {/* Layer History */}
            <Tab eventKey="history" title="Layer History">
              <Row
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                }}
              >
                <Col md={2}>
                  <Form.Select
                    value={actionFilterHistory}
                    onChange={handleActionFilterHistoryChange}
                  >
                    <option value="">--Select Action--</option>
                    <option value="Create">Create</option>
                    <option value="Delete">Delete</option>
                    <option value="Update">Update</option>
                  </Form.Select>
                </Col>

                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={userNameHistory}
                      onChange={handleUsernameHistoryChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={1}>
                  <span onClick={handleLayerHistoryFilter}>
                    <Tooltip title="Apply Filter">
                      <img
                        src="./filter.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                  <span
                    onClick={handleLayerHistoryCsv}
                    style={{ marginLeft: "10px" }}
                  >
                    <Tooltip title="Download Csv">
                      <img
                        src="./csv_icon.png"
                        alt="CSV Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  margin: "20px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table class="table table-striped table-sm table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#1C3B68",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Layergroup Name</th>
                      <th scope="col">Layer Name</th>
                      <th scope="col">Layer Title</th>
                      <th scope="col">Layer Description</th>
                      <th scope="col">Layer Type</th>
                      <th scope="col">Layer Upload Datetime</th>
                      <th scope="col">Projection</th>
                      <th scope="col">User Action</th>
                      <th scope="col">User</th>
                    </tr>
                  </thead>

                  <tbody>
                    {userLogHistoryDataPaginated ? (
                      userLogHistoryDataPaginated.map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.layergroup_name}</td>
                          <td>{user.name}</td>
                          <td>{user.title}</td>
                          <td>{user.abstract}</td>
                          <td>{user.type}</td>
                          <td>
                            {user.created_date
                              ? new Date(user.created_date).toLocaleString()
                              : "N/A"}
                          </td>
                          <td>{user.native_srs}</td>
                          <td>{user.action}</td>
                          <td>{user.created_by}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">No Layer History available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination className="custom-pagination">
                  <Pagination.Prev
                    disabled={currentPageLayerHistory === 1}
                    onClick={() =>
                      handlePageChangeLayerHistory(currentPageLayerHistory - 1)
                    }
                  />
                  {currentPageLayerHistory > 2 && (
                    <>
                      <Pagination.Item
                        onClick={() => handlePageChangeLayerHistory(1)}
                      >
                        1
                      </Pagination.Item>
                      {currentPageLayerHistory !== 3 && <Pagination.Ellipsis />}
                    </>
                  )}
                  {currentPageLayerHistory > 1 && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeLayerHistory(
                          currentPageLayerHistory - 1
                        )
                      }
                    >
                      {currentPageLayerHistory - 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Item active>
                    {currentPageLayerHistory}
                  </Pagination.Item>
                  {currentPageLayerHistory < totalPagesLayerHistory && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeLayerHistory(
                          currentPageLayerHistory + 1
                        )
                      }
                    >
                      {currentPageLayerHistory + 1}
                    </Pagination.Item>
                  )}
                  {currentPageLayerHistory < totalPagesLayerHistory - 1 && (
                    <>
                      {currentPageLayerHistory !==
                        totalPagesLayerHistory - 2 && <Pagination.Ellipsis />}
                      <Pagination.Item
                        onClick={() =>
                          handlePageChangeLayerHistory(totalPagesLayerHistory)
                        }
                      >
                        {totalPagesLayerHistory}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    disabled={
                      currentPageLayerHistory === totalPagesLayerHistory
                    }
                    onClick={() =>
                      handlePageChangeLayerHistory(currentPageLayerHistory + 1)
                    }
                  />
                </Pagination>
              </div>
            </Tab>

            {/* Uploaded Files History */}
            <Tab eventKey="fileshistory" title="Uploaded Files History">
              <Row
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                }}
              >
                <Col md={2}>
                  <Form.Select
                    value={actionFilterUpload}
                    onChange={handleActionFilterUploadChange}
                  >
                    <option value="">--Select Action--</option>
                    <option value="Create">Create</option>
                    <option value="Delete">Delete</option>
                    <option value="Update">Update</option>
                  </Form.Select>
                </Col>

                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={userNameUpload}
                      onChange={handleUsernameUploadChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={1}>
                  <span onClick={handleLayerUploadFilter}>
                    <Tooltip title="Apply Filter">
                      <img
                        src="./filter.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                  <span
                    onClick={handleLayerUploadCsv}
                    style={{ marginLeft: "10px" }}
                  >
                    <Tooltip title="Download Csv">
                      <img
                        src="./csv_icon.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  margin: "20px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table class="table table-striped table-sm table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#1C3B68",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">File Name</th>
                      <th scope="col">File Type</th>
                      <th scope="col">File Creation Mode</th>
                      <th scope="col">File Upload Datetime</th>
                      <th scope="col">User Action</th>
                      <th scope="col">User</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filesHistoryDataPaginated ? (
                      filesHistoryDataPaginated.map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.fileName}</td>
                          <td>{user.fileType}</td>
                          <td>{user.creationMode}</td>
                          <td>
                            {user.created_at
                              ? new Date(user.created_at).toLocaleString()
                              : "N/A"}
                          </td>
                          <td>{user.action}</td>
                          <td>{user.user}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Uploaded Files History available</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <Pagination className="custom-pagination">
                  <Pagination.Prev
                    disabled={currentPageUploadHistory === 1}
                    onClick={() =>
                      handlePageChangeUploadHistory(
                        currentPageUploadHistory - 1
                      )
                    }
                  />
                  {currentPageUploadHistory > 2 && (
                    <>
                      <Pagination.Item
                        onClick={() => handlePageChangeUploadHistory(1)}
                      >
                        1
                      </Pagination.Item>
                      {currentPageUploadHistory !== 3 && (
                        <Pagination.Ellipsis />
                      )}
                    </>
                  )}
                  {currentPageUploadHistory > 1 && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeUploadHistory(
                          currentPageUploadHistory - 1
                        )
                      }
                    >
                      {currentPageUploadHistory - 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Item active>
                    {currentPageUploadHistory}
                  </Pagination.Item>
                  {currentPageUploadHistory < totalPagesUploadHistory && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeUploadHistory(
                          currentPageUploadHistory + 1
                        )
                      }
                    >
                      {currentPageUploadHistory + 1}
                    </Pagination.Item>
                  )}
                  {currentPageUploadHistory < totalPagesUploadHistory - 1 && (
                    <>
                      {currentPageUploadHistory !==
                        totalPagesUploadHistory - 2 && <Pagination.Ellipsis />}
                      <Pagination.Item
                        onClick={() =>
                          handlePageChangeUploadHistory(totalPagesUploadHistory)
                        }
                      >
                        {totalPagesUploadHistory}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    disabled={
                      currentPageUploadHistory === totalPagesUploadHistory
                    }
                    onClick={() =>
                      handlePageChangeUploadHistory(
                        currentPageUploadHistory + 1
                      )
                    }
                  />
                </Pagination>
              </div>
            </Tab>

            {/* Feedback Management  */}
            <Tab eventKey="feedbackmanagement" title="Feedback Management">
              <Row
                style={{
                  paddingLeft: "10px",
                  display: "flex",
                }}
              >
                <Col md={2}>
                  <Form.Select
                    value={responseFilter}
                    onChange={handleResponseFilterChange}
                  >
                    <option value="">--Select Admin Response--</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Select>
                </Col>

                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={feedbackNameFilter}
                      onChange={handleFeedbackNameFilterChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      value={feedbackStatusFilter}
                      onChange={handleFeedbackStatusFilterChange}
                    >
                      <option value="">Select Status</option>
                      <option value="Open">Open</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Pending">Pending</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={1}>
                  <span onClick={handleFeedbackFilter}>
                    <Tooltip title="Apply Filter">
                      <img
                        src="./filter.png"
                        alt="GRam Logo"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                  <span
                    onClick={handleFeedbackCsv}
                    style={{ marginLeft: "10px" }}
                  >
                    <Tooltip title="Download Csv">
                      <img
                        src="./csv_icon.png"
                        alt="Feedback"
                        height={"25hv"}
                        style={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  margin: "20px",
                  maxHeight: "500px",
                  overflowY: "auto",
                }}
              >
                <table class="table table-striped table-sm table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#1C3B68",
                      color: "white",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col-2">Full Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Admin Response</th>
                      <th scope="col">Comment</th>
                      <th scope="col">Feedback Datetime</th>
                      <th scope="col">File</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {feedbackDataPaginated ? (
                      feedbackDataPaginated.map((user, index) => (
                        <tr key={index + 1}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.fullName}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.is_responded ? "Yes" : "No"}</td>
                          <td>{user.comment}</td>
                          <td>
                            {user.created_at
                              ? new Date(user.created_at).toLocaleString()
                              : "N/A"}
                          </td>
                          <td>
                            {user.file && (
                              <a
                                href={user.file}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i
                                  class="fa fa-eye"
                                  aria-hidden="true"
                                  style={{ color: "#1C3B68" }}
                                ></i>
                              </a>
                            )}
                          </td>
                          <td>
                            {user.status === "Open" ? (
                              <>
                                <span className="open-circle"></span>
                                <span style={{ marginLeft: "5px" }}>Open</span>
                              </>
                            ) : user.status === "Resolved" ? (
                              <>
                                <span className="resolved-circle"></span>
                                <span style={{ marginLeft: "5px" }}>
                                  Resolved
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="pending-circle"></span>
                                <span style={{ marginLeft: "5px" }}>
                                  Pending
                                </span>
                              </>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#1C3B68",
                                transform: "scale(0.7)",
                              }}
                              onClick={() =>
                                handleResponseEmail(user.id, user.status)
                              }
                            >
                              Respond
                              <img
                                src="replybutton.png"
                                style={{
                                  height: "25px",
                                  paddingLeft: "4px",
                                  textDecoration: "none",
                                }}
                                alt="Email Response"
                              />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No Feedback History available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <Pagination className="custom-pagination">
                  <Pagination.Prev
                    disabled={currentPageFeedback === 1}
                    onClick={() =>
                      handlePageChangeFeedback(currentPageFeedback - 1)
                    }
                  />
                  {currentPageFeedback > 2 && (
                    <>
                      <Pagination.Item
                        onClick={() => handlePageChangeFeedback(1)}
                      >
                        1
                      </Pagination.Item>
                      {currentPageFeedback !== 3 && <Pagination.Ellipsis />}
                    </>
                  )}
                  {currentPageFeedback > 1 && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeFeedback(currentPageFeedback - 1)
                      }
                    >
                      {currentPageFeedback - 1}
                    </Pagination.Item>
                  )}
                  <Pagination.Item active>
                    {currentPageFeedback}
                  </Pagination.Item>
                  {currentPageFeedback < totalPagesFeedback && (
                    <Pagination.Item
                      onClick={() =>
                        handlePageChangeFeedback(currentPageFeedback + 1)
                      }
                    >
                      {currentPageFeedback + 1}
                    </Pagination.Item>
                  )}
                  {currentPageFeedback < totalPagesFeedback - 1 && (
                    <>
                      {currentPageFeedback !== totalPagesFeedback - 2 && (
                        <Pagination.Ellipsis />
                      )}
                      <Pagination.Item
                        onClick={() =>
                          handlePageChangeFeedback(totalPagesFeedback)
                        }
                      >
                        {totalPagesFeedback}
                      </Pagination.Item>
                    </>
                  )}
                  <Pagination.Next
                    disabled={currentPageFeedback === totalPagesFeedback}
                    onClick={() =>
                      handlePageChangeFeedback(currentPageFeedback + 1)
                    }
                  />
                </Pagination>
              </div>
            </Tab>
          </Tabs>
        </div>

        <AppBar position="fixed" sx={{ bgcolor: "#1C3B68" }}>
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
                style={{ height: "42px", margin: "5px" }}
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
              sx={{ flexGrow: 4, textAlign: "center", fontSize: "16px" }}
            >
              Nashik Municipal Smart City Development Corporation Limited
            </Typography>
            <Button color="inherit" style={{ transform: "scale(0.9)" }}>
              {fname ? `Welcome, ${fname}` : null}
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
          </Toolbar>
        </AppBar>

        {/* Edit Option in User Management */}
        <Modal
          show={editModal}
          onHide={handleEditModalClose}
          backdrop="static"
          size="lg"
          centered
        >
          <Modal.Header
            style={{ color: "white", background: "#1C3B68", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>Edit Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <b>Name</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={handleNameEdit}
                />
              </Col>
              <Col>
                <b>Username</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={userName}
                  onChange={handleUserNameEdit}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <b>Email</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={handleEmailEdit}
                />
              </Col>
              <Col>
                <b>Permission</b>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Select Permission"
                  value={group}
                  onChange={handleGroupEdit}
                >
                  <option value="">--Select Group--</option>
                  <option value="View_and_edit">View and edit</option>
                  <option value="View_and_nonspatial_edit">
                    View and nonspatial edit
                  </option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <b>Phone Number</b>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  // onChange={handleInputFeature}
                />
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="contained"
              style={{ backgroundColor: "#1C3B68", textTransform: "none" }}
              onClick={updateHandler}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showModal}
          onHide={handleCloseModal}
          backdrop="static"
          size="lg"
          centered
        >
          <Modal.Header
            style={{ color: "white", background: "#1C3B68", padding: "10px" }}
            closeButton
          >
            <Modal.Title style={{ fontSize: "14px" }}>
              Feedback Action
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="mb-3">
              <Col md={2}>
                <p>Comment:</p>
              </Col>
              <Col md={6}>
                <Form.Group controlId="commentTextArea">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                <p>Status:</p>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Select
                    // value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <p>User mail trail Here!</p>
              <div style={{ height: "300px", overflowY: "auto" }}>
                {mailTrail ? (
                  mailTrail.map((trailItem) => (
                    <div
                      key={trailItem.id}
                      className="card mb-3"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                      }}
                    >
                      <div
                        className="card-body"
                        style={{ background: "#fafafa" }}
                      >
                        <div key={trailItem.id} className="mb-3">
                          <Row>
                            <Col
                              sm={4}
                              style={{ borderRight: "2px solid #33bd6f" }}
                            >
                              <p
                                className="card-text"
                                style={{ fontWeight: "500" }}
                              >
                                {` ${
                                  trailItem.timestamp
                                    ? new Date(
                                        trailItem.timestamp
                                      ).toLocaleString()
                                    : "N/A"
                                }`}
                              </p>
                            </Col>
                            <Col sm={8}>
                              <p className="card-text">{`Feedback User: ${
                                trailItem.feedback_user ?? "N/A"
                              }`}</p>
                              <p className="card-text">{`User: ${
                                trailItem.user ?? "N/A"
                              }`}</p>
                              <p className="card-text">{`Comment: ${
                                trailItem.comment ?? "N/A"
                              }`}</p>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No mail trail available.</p>
                )}
              </div>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleFeedback}>
              Apply
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Footer Part */}
        <AppBar
          position="fixed"
          style={{
            top: "auto",
            bottom: 0,
            display: "flex",
            padding: "0 20px",
          }}
          sx={{ bgcolor: "#1C3B68" }}
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
      </Box>
    </>
  );
};

export default Usermanagement;
