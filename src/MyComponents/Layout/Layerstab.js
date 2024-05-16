/**
 * The below code is a React component that renders a tabbed interface with two tabs, each containing
 * different components.
 * The code is returning a React component called "Layerstab". This component renders a tabbed
 * interface with two tabs: "GIS Utility Layers" and "Water Consumer". Each tab displays different
 * content based on the selected tab.
 * The content for each tab is rendered using the "LayerData" and
 * "WaterData" components respectively.
 */
import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LayerData from "./LayerData";
import { Tooltip } from "@mui/material";
import WaterData from "./WaterData";
import "./LayerData.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Layerstab() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "auto", padding: "0px" }}>
      {/* <AppBar position="static" sx={{ bgcolor: "#1C3B68" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label={
              <Tooltip title="GIS Utility Layers">
                <div>
                  <img
                    src="gis_utility_layer.png"
                    alt="GIS Utility Layers"
                    height={"30px"}
                  />
                </div>
              </Tooltip>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <Tooltip title="Water Consumer">
                <div>
                  <img
                    src="waters_consumer.jpg"
                    alt="Water Consumer"
                    height={"30px"}
                  />
                </div>
              </Tooltip>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar> */}
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ padding: "0px" }}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}

        >
          <LayerData />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <WaterData />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
