import React from "react";
import { Typography, Grid, ListItemText } from "@mui/material";

const EmployeeInformation = ({ userData }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Employee ID</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.empId}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Designation</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.designation}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Base Location</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.baseLocation}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">
              Reporting Manager
            </Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.reportingManager}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Type of Employee</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.typeOfEmployee}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Department Name</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.department}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ListItemText
          primary={
            <Typography className="display-fields">Working Type</Typography>
          }
          secondary={
            <Typography className="display-values">
              {userData?.workingType}
            </Typography>
          }
          style={{ marginBottom: 20 }}
        />
      </Grid>
    </Grid>
  );
};

export default EmployeeInformation;
