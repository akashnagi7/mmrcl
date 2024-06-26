/**
 * The App function is the main component of the JavaScript application, which sets up the routes for
 * different pages and components.
 */
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import NashikHomeNew from "./MyComponents/Layout/NashikHomeNew";
import "ol/ol.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Error } from "./MyComponents/Auth/Error/Error";
import { Login } from "./MyComponents/Auth/Login/Login";
import Protected from "./MyComponents/Auth/Protected";
import Usermanagement from "./MyComponents/UserManagement/Usermanagement";
import { Dashboard } from "./MyComponents/Dashboard/Dashboard";
import { About } from "./MyComponents/About/About";
import { Contact } from "./MyComponents/Contact/Contact";
import { Test } from "./MyComponents/Test/Test";
import Forgot from "./MyComponents/Auth/Login/Forgot";
import Reset from "./MyComponents/Auth/Login/Reset";
import Otp from "./MyComponents/Auth/Login/Otp";
import DashboardGis from "./MyComponents/Dashboard/DashboardGis";
// axios.defaults.baseURL = "http://192.168.1.17:9023/nmscdcl/";
// axios.defaults.baseURL = "http://10.202.101.108:9023/nmscdcl/";
// axios.defaults.baseURL = "http://192.168.1.136:9000/nmscdcl/";
// axios.defaults.baseURL = "http://10.202.100.7:8000/nmscdcl/";
// axios.defaults.baseURL = "http://172.16.0.10:9007/nmscdcl/";
// axios.defaults.baseURL = "https://dev.nashikgeoportal.com/nmscdcl/";
axios.defaults.baseURL = "http://172.16.0.10:8000/nmscdcl/";
// axios.defaults.baseURL = "http://202.189.224.222:9023/nmscdcl/";
// axios.defaults.baseURL = "http://localhost:9023/nmscdcl/";
// axios.defaults.baseURL = "http://202.189.224.222:9058/nmscdcl/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/dashboard-gis" element={<DashboardGis />} />

      {/* <Route path="/" element={<Protected />}> */}
      <Route path="home" element={<NashikHomeNew />} />
      <Route path="Usermanagement" element={<Usermanagement />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      {/* </Route> */}
      <Route path="/*" element={<Error />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
