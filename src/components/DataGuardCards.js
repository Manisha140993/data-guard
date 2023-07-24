import React from "react";
import { Grid, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useDataGuardCards } from "../hooks/useDataGuardHooks";
import "../styles/DataGuardCards.scss";

function DataGuardCards(props) {
  const activeColor = "#5ac88d";
  const inactiveColor = "#c52f3f";
  const { cardDetails, tabTitle, plugins,allPluginsEnabled, allData } = props;
  const { result, handleIconClick } = useDataGuardCards({ cardDetails, plugins, tabTitle, allPluginsEnabled, allData });

  return (
    <div className="data-guard-card">
      <h4>{cardDetails.title} Plugins</h4>
      <Grid container spacing={5} className="data-guard-grid">
        {result.map((item) => (
          <Grid item xs={12} md={4} sm={6} className={`data-guard-grid-item ${item.status === "disabled" || allPluginsEnabled ? "" : "disabled"}`} key={item.id}>
            <Card>
              <CardHeader className="data-guard-card-header"
                action={
                <>
                  <IconButton className="data-guard-card-icon" onClick={() => handleIconClick(item.id,allData)}>
                    {item.status === "active" ? (
                        <ToggleOnIcon style={{ color: activeColor }} sx={{ fontSize: 40 }} />
                    ) : (
                        <ToggleOffIcon style={{ color: inactiveColor }} sx={{ fontSize: 40 }} />
                    )}
                  </IconButton>
                  <Typography style={{ color: item.status === "active" ? activeColor : inactiveColor }} className="data-guard-card-icon-text">
                    {item.status === "active" ? "Allowed" : "Blocked"}
                  </Typography>
                </>
                }
                title={item.name}
              />
              <CardContent className="data-guard-description">{item.description}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DataGuardCards;
