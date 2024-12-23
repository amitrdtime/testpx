import { Typography } from "@mui/material";
import React from "react";

const homeStyles = {
  textAlign: "center",
  padding: "10px",
  fontSize: "30px",
  fontFamily: "Roboto",
};

const HomeComponent = () => {
  return (
    <>
      <Typography style={homeStyles}> Welcome to home page! </Typography>
    </>
  );
};

export default HomeComponent;
