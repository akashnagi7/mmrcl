import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const store = createStore(reducer);
const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 10,
      fontFamily: [
        "Avenir Next W01",
        "Avenir Next W00",
        "Avenir Next",
        "Avenir",
        "Helvetica Neue",
        "sans-serif",
      ].join(","),
    },
    body1: {
      fontWeight: 500,
      fontSize: 12,
      fontFamily: [
        "Avenir Next W01",
        "Avenir Next W00",
        "Avenir Next",
        "Avenir",
        "Helvetica Neue",
        "sans-serif",
      ].join(","),
    },
    button: {
      fontFamily: [
        "Avenir Next W01",
        "Avenir Next W00",
        "Avenir Next",
        "Avenir",
        "Helvetica Neue",
        "sans-serif",
      ].join(","),
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
