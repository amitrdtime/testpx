import { Typography } from "@mui/material";
import React from "react";

const homeStyles = {
  textAlign: "center",
  padding: "10px",
  fontSize: "30px",
  fontFamily: "Roboto",
};

const TimeSheetComponent = () => {
  return (
    <>
      <Typography style={homeStyles}> Welcome to TimeSheet! </Typography>
    </>
  );
};

export default TimeSheetComponent;
