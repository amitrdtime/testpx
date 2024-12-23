import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import Divider from "@mui/material/Divider";
import "../App.css";
import { Link,useNavigate} from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { getInitials } from "../utils/use-helper";

const pages = [
  { key: "mytimesheet", value: "MY TIMESHEETS" },
  { key: "ManagerView", value: "MANAGER VIEW" },
];
const settings = ["Logout"];

function ResponsiveAppBar() {
  const { userData, profileImage } = useUserStore();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [menudata, setMenudata] = useState(null);
  const [profile, setProfile] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState();

  const name = userData?.displayName ?? "";
  const Title = userData?.jobTitle ?? "";
  const searchParams = new URLSearchParams(document.location.search);
  const navigate = useNavigate();

  if (menudata === undefined || menudata === null) {
    setMenudata("MY TIMESHEETS");
    setValue(0);
  }
  if (searchParams.get("viewname") === "mytimesheet") {
    if (menudata !== "MY TIMESHEETS") {
      setMenudata("MY TIMESHEETS");
      setValue(0);
    }
  }
  if (searchParams.get("viewname") === "ManagerView") {
    if (menudata !== "MANAGER VIEW") {
      setMenudata("MANAGER VIEW");
      setValue(1);
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setProfile(null);
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setIsFocused(!isFocused);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };
  if (profile === "Logout") {
    handleLogout("redirect");
    localStorage.removeItem("isAlertShown");
  }
  const closeMenu = ()=>{
    setProfile(null);
    setAnchorElUser(null)
    navigate("/user")
    
  }

  return (
    <>
      <AppBar position="static" className="appbar-style">
        <Container maxWidth={false} disableGutters>
          <Toolbar disableGutters>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                fontFamily: "Source Sans Pro,sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {/* <img src={"logo.png"} alt={"logo"} style={{ width: "120px" }} /> */}
              <p className="nameStyle">PLATFORMX</p>
            </Typography>

            <Box sx={{ flexGrow: 0, marginRight: "30px" }}>
              <Tooltip title="Open profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User Photo"
                    src={profileImage ?? "/static/images/avatar/1.jpg"}
                  >
                    {!profileImage &&
                      getInitials(userData?.givenName, userData?.surname)}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem component={Link}  onClick={closeMenu}>
                  <Typography> View profile</Typography>
                </MenuItem>
                <Divider />

                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      setProfile(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default ResponsiveAppBar;
