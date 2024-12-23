import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  EditCalendarOutlined,
  AccountBoxOutlined,
  BusinessCenterOutlined,
  DashboardOutlined,
  SettingsOutlined,
  KeyboardDoubleArrowLeftOutlined,
  KeyboardDoubleArrowRightOutlined,
  GroupIcon,
} from "@mui/icons-material";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { NavLink } from "react-router-dom";
import "../styles/layout.css";

const SideNavBar = ({ expanded, onToggle }) => {
  const [textVisible, setTextVisible] = useState(expanded);

  useEffect(() => {
    let timer;
    if (expanded) {
      timer = setTimeout(() => setTextVisible(true), 200);
    } else {
      setTextVisible(false);
    }
    return () => clearTimeout(timer);
  }, [expanded]);

  const toggleText = {
    fontWeight: "500",
    fontSize: "18px",
    marginLeft: "20px",
    opacity: textVisible ? 1 : 0,
    transition: "opacity 0.3s",
  };

  const menuItemTextStyle = {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "21.79px",
    opacity: textVisible ? 1 : 0,
    transition: "opacity 0.3s",
  };

  const activeStyle = {
    backgroundColor: "#81A9B4",
    color: "black",
  };

  const handleItemClick = () => {
    if (expanded) {
      onToggle();
    }
  };

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open={expanded}
        sx={{
          "& .MuiDrawer-paper": {
            width: expanded ? 240 : 80,
            position: "relative",
            overflowX: "hidden",
            transition: "width 0.3s",
            backgroundColor: "#A1D6E2",
            alignItems: expanded ? "left" : "center",
            paddingLeft: expanded ? "10px" : "0",
          },
        }}
      >
        <div className={`${expanded ? "expanded" : "collapsed"}`}>
          <List
            sx={{
              width: "100%",
              paddingTop: "30px",
              paddingBottom: 0,
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            <Tooltip title="Dashboard" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <DashboardOutlined sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    Dashboard
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="Timesheets" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/timesheets"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <EditCalendarOutlined sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    Timesheets
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="Manager's View" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/managers-view"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <AccountBoxOutlined sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    Manager's view
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="Client Management" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/customers"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <BusinessCenterOutlined sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    Client Management
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="User Management" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/userroles"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <PeopleAltIcon sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    User Management
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>

            <Tooltip title="Settings" placement="right" disableHoverListener={expanded}>
              <ListItemButton
                component={NavLink}
                to="/settings"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                onClick={handleItemClick}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: expanded ? 3 : 0, color: "black" }}
                >
                  <SettingsOutlined sx={{ fontSize: 28 }} />
                </ListItemIcon>
                {textVisible && (
                  <Typography component="span" style={menuItemTextStyle}>
                    Settings
                  </Typography>
                )}
              </ListItemButton>
            </Tooltip>
          </List>
        </div>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            paddingLeft: expanded ? "10px" : "",
          }}
        >
          <IconButton onClick={onToggle} sx={{ color: "black" }}>
            {expanded ? (
              <>
                <KeyboardDoubleArrowLeftOutlined sx={{ fontSize: 28 }} />
                <span style={Object.assign({}, toggleText, menuItemTextStyle)}>
                  Close Menu
                </span>
              </>
            ) : (
              <KeyboardDoubleArrowRightOutlined sx={{ fontSize: 28 }} />
            )}
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
};

export default SideNavBar;