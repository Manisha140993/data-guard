import React, { useState , useEffect } from "react";
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
import { useNavigate } from 'react-router-dom';

function DataGuardTabs(props) {
  const navigate = useNavigate();
  const activeTab = parseInt(props.activeTabValue);
  const activeColor = "#5ac88d";
  const blockedColor = "#c52f3f";
  const [tabsData, setTabsData] = useState([]);
  const [value, setValue] = useState(0);
  const [allPluginsEnabled, setAllPluginsState] = useState(tabsData.isAllPluginsEnabled);

  const handleChange = (event, newValue) => {
    navigate(`/${event.target.textContent}`);
    setValue(newValue);
  };

  const handleIconClick = () => {
    setAllPluginsState((prevIsLiked) => !prevIsLiked);
  };

  useEffect(() => {
    setValue(activeTab);
  }, [activeTab])

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

  const navigateToFirstTab = () => {
    navigate(`/Marketing`);
    setValue(0);
  }

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
        <h1 onClick={navigateToFirstTab}>Data<span>Guard</span></h1>
        <Tabs className="tabs-content" orientation="vertical" variant="scrollable" value={value} onChange={handleChange}
            TabIndicatorProps={{className: "indicator"}}> 
               {Object.entries(tabsData.tabdata).map(([tabKey, tab]) => (
                  <Tab className="data-guard-tab-name" icon={iconMap[tab.title]} iconPosition="start" label={tab.title} key={tabKey}/>
            ))}
        </Tabs>

        <div className="all-plugins">
          <span>All plugins {allPluginsEnabled ? "enabled" : "disabled"}</span>
          <IconButton onClick={handleIconClick}>{allPluginsEnabled ? (
            <ToggleOnIcon style={{ color: activeColor }} sx={{ fontSize: 50 }} />)
              : (<ToggleOffIcon style={{ color: blockedColor }} sx={{ fontSize: 50 }} />)}
          </IconButton>
        </div>
      </Grid>
      
      <Grid item xs={8} md={10} className="data-guard-tab-content">
          <DataGuardCards
            cardDetails={tabsData.tabdata[Object.keys(tabsData.tabdata)[value]]} tabTitle={Object.keys(tabsData.tabdata)[value]}
            plugins={tabsData.plugins} allPluginsEnabled={allPluginsEnabled} allData={tabsData}
          />
      </Grid>
      </>
      )}
    </Grid>
  );
}

export default DataGuardTabs;
