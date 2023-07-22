import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Tabs, Tab } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import IconButton from "@mui/material/IconButton";
import AppsIcon from "@mui/icons-material/Apps"
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DataGuardCards from "./DataGuardCards";
import dataGuardService from "../services/DataGuardServices";
import "../styles/DataGuardTabs.scss";

function DataGuardTabs() {
  const activeColor = "#5ac88d";
  const inactiveColor = "#c52f3f";
  const [tabsData, setTabsData] = useState([]);
  const [value, setValue] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleIconClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataGuardService.get();
        setTabsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //on page reload
  useEffect(() => {
    if (window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }, []);

  const iconMap = {
    "Marketing": <AppsIcon />,
    "Finance": <FiberSmartRecordIcon/> ,
    "Personnel": <EventAvailableIcon />
  };

  return (
    <Grid container className="data-guard-wrapper">
     {tabsData.tabdata && (
      <>
      <Grid item xs={4} md={2} className="data-guard-tabs">
        <h1>Data<span>Guard</span></h1>
        <Tabs className="tabs-content" orientation="vertical" variant="scrollable" value={value} onChange={handleChange}
            TabIndicatorProps={{
                className: "indicator",
            }} sx={{ borderRight: 1, borderColor: "divider" }}>
            {Object.entries(tabsData.tabdata).map(([tabKey, tab]) => (
                <Tab className="data-guard-tab-name" icon={iconMap[tab.title]} iconPosition="start" label={tab.title} component={Link} to={tab.title} key={tabKey}/>
            ))}
        </Tabs>

        <div className={`all-plugins ${isLiked ? "turn-off" : "turn-on"}`}>
          <span>All plugins {isLiked ? "disabled" : "enabled"}</span>
          <IconButton onClick={handleIconClick}>{isLiked ? (
              <ToggleOffIcon style={{ color: inactiveColor }} sx={{ fontSize: 50 }} />) 
              : (<ToggleOnIcon style={{ color: activeColor }} sx={{ fontSize: 50 }} />)}
          </IconButton>
        </div>
      </Grid>

      <Grid item xs={8} md={10} className="data-guard-tab-content">
          <DataGuardCards
            cardDetails={tabsData.tabdata[Object.keys(tabsData.tabdata)[value]]} tabTitle={Object.keys(tabsData.tabdata)[value]}
            plugins={tabsData.plugins} allPlugins={isLiked} allData={tabsData}
          />
      </Grid>
      </>
      )}
    </Grid>
  );
}

export default DataGuardTabs;
