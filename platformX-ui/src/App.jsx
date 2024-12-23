import React, { useState, useEffect } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useIsAuthenticated,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import axios from "axios";
import AppRoute from "./AppRoute.js";
import { BaseConfig } from "./baseConfig.js";
import { loginRequest } from "./authConfig.js";
import { ColorModeContext, useMode } from "./theme.js";
import {
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import innoverLogoIcon from "./assets/bulb-img.png";
import CustomAlert from "../src/components/alert.jsx";
import AppSessionNew from "./components/appsession/appSession.js";

axios.defaults.headers.common["Authorization"] = `Bearer ${BaseConfig.ApiKey}`;

/**
 * If a user is authenticated the Bulkmatic Main Page is rendered.
 * Otherwise a message indicating it is starting the user session.
 */

export default function App() {
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [theme, colorMode] = useMode();

  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    content: "",
  })


  useEffect(() => {
    if (isAuthenticated) {
      const isAlertShown = localStorage.getItem("isAlertShown");
      if (!isAlertShown) {
        setAlert({
          show: true,
          severity: "success",
          content: "Logged in successfully!",
        });
        setTimeout(() => {
          localStorage.setItem("isAlertShown", "true");
        }, 1000);
      }
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   console.log(inProgress, instance, isAuthenticated);
  //   if (!isAuthenticated && inProgress === InteractionStatus.None)
  //     instance.loginRedirect(loginRequest).catch((e) => {
  //       console.log("e", e);
  //     });
  //   return () => {};
  // }, [inProgress, instance, isAuthenticated]);

  return (
    <>
      <AuthenticatedTemplate>
        <AppSessionNew>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {alert.show && (
                <CustomAlert
                  severity={alert.severity}
                  content={alert.content}
                  duration={3000}
                />
              )}
              <AppRoute />
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AppSessionNew>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {(!isAuthenticated && inProgress === InteractionStatus.None) ? (<div className="login_button_section">
          <Container maxWidth="xs" className="login_container">
            <img src={innoverLogoIcon} alt="TimeSheet" />
            <Typography variant="h5" gutterBottom>
              Welcome to Innover
            </Typography>
            <Button
              variant="contained"
              color="success"
              className="login_button"
              onClick={() => instance.loginRedirect(loginRequest)}
            >
              Sign In
            </Button>
          </Container>
        </div>) : null}
      </UnauthenticatedTemplate>
    </>
  );
}
