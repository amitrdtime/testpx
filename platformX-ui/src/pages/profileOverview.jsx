import React from "react";
import { Formik, Field, Form } from "formik";
import {
  Grid,
  TextField,
  MenuItem,
  ListItemText,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genderType = ["Male", "Female", "Other"];

const validationSchema = Yup.object({
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string().matches(
    /^\+?\d{10}$/,
    "Phone number must be a valid format"
  ),
  secondaryNumber: Yup.string().matches(
    /^\+?\d{10}$/,
    "Secondary Number must be a valid format"
  ),
  personalEmail: Yup.string()
    .email("Invalid email format")
    .required("Personal Email is required"),
});

const ProfileOverview = ({ editMode, onUpdate, formikRef, userData }) => {
  
  const formatDateToLocal = (isoString) => {
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().split("T")[0];
    //return actualDate[1]-actualDate[2]-actualDate[0];
  };
 

  const initialValues = {
  
    gender: userData?.gender ?? "",
    nationality: userData?.nationality ?? "",
    phoneNumber: userData?.phoneNumber ?? "",
    dob: userData?.dob ? formatDateToLocal(userData.dob) : "",
    bloodGroup: userData?.bloodGroup ?? "",
    personalEmail: userData?.personalEmail ?? "",
    secondaryNumber: userData?.secondaryNumber ?? "",
    currentAddress: userData?.currentAddress ?? "",
    permanentAddress: userData?.permanentAddress ?? "",
    updatedAt: new Date().toISOString().split("T")[0],
    modifiedBy: userData?.firstName ?? "",
  };

  return (
    <>
      <Formik
        innerRef={formikRef} // Assign Formik ref
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onUpdate}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            {editMode ? (
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="gender"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      label="Gender"
                      select
                      size="small"
                      onChange={handleChange}
                      value={values.gender}
                    >
                      {genderType.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="nationality"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      label="Nationality"
                      size="small"
                      onChange={handleChange}
                      value={values.nationality}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Field
                      name="phoneNumber"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      size="small"
                      label="Phone Number"
                      onChange={handleChange}
                      value={values.phoneNumber}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="dob"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      size="small"
                      label="Date of Birth"
                      type="date"
                      onChange={handleChange}
                      value={values.dob}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field
                      name="bloodGroup"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      size="small"
                      label="Blood Group"
                      select
                      onChange={handleChange}
                      value={values.bloodGroup}
                    >
                      {bloodGroups.map((group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      name="personalEmail"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      size="small"
                      label="Personal Email"
                      type="email"
                      helperText={touched.personalEmail && errors.personalEmail}
                      error={
                        touched.personalEmail && Boolean(errors.personalEmail)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4} mr={30}>
                    <Field
                      name="secondaryNumber"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      size="small"
                      label="Secondary Number"
                      onChange={handleChange}
                      value={values.secondaryNumber}
                      helperText={
                        touched.secondaryNumber && errors.secondaryNumber
                      }
                      error={
                        touched.secondaryNumber &&
                        Boolean(errors.secondaryNumber)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="currentAddress"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      rows={3}
                      multiline
                      label="Current Address"
                      onChange={handleChange}
                      value={values.currentAddress}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="permanentAddress"
                      as={TextField}
                      fullWidth
                      margin="normal"
                      rows={3}
                      multiline
                      label="Permanent Address"
                      onChange={handleChange}
                      value={values.permanentAddress}
                    />
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">Gender</Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.gender}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Nationality
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.nationality}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Phone Number
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.phoneNumber}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Date of Birth
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {formatDate(values.dob)}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Blood Group
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.bloodGroup}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Personal Email
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.personalEmail}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Secondary Number
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.secondaryNumber}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Current Address
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.currentAddress}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <ListItemText
                    primary={
                      <Typography className="display-fields">
                        Permanent Address
                      </Typography>
                    }
                    secondary={
                      <Typography className="display-values">
                        {values.permanentAddress}
                      </Typography>
                    }
                    style={{ marginBottom: 20 }}
                  />
                </Grid>
              </Grid>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProfileOverview;
