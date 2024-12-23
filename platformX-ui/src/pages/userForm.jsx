import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  Button,
  FormHelperText,
  IconButton,
  duration,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateUserDetails } from "../services/user-service";

const buttonStyles = {
  backgroundColor: "black",
  color: "#bbd430",
};

const cancelButton = {
  backgroundColor: "#f0f0f0",
  color: "black",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10}$/, "Phone number must be a valid format")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required").nullable(),
  bloodGroup: Yup.string().required("Blood Group is required"),
  personalEmail: Yup.string()
    .email("Invalid email format")
    .required("Personal Email is required"),
  currentAddress: Yup.string().required("Current Address is required"),
  secondaryNumber: Yup.string().matches(
    /^\+?\d{10}$/,
    "Secondary Number must be a valid format"
  ),
});

const UserForm = ({ handleClose, userData, showAlert }) => {
  const formatDateToLocal = (isoString) => {
    const date = new Date(isoString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toISOString().split("T")[0];
  };

  const initialValues = {
    firstName: userData?.firstName ?? "",
    middleName: userData.middleName,
    lastName: userData.lastName,
    nationality: userData?.nationality ?? "",
    phoneNumber: userData?.phoneNumber ?? "",
    gender: userData?.gender ?? "",
    dob: userData?.dOb ? formatDateToLocal(userData.dOb) : "",
    bloodGroup: userData?.bloodGroup ?? "",
    personalEmail: userData?.personalEmail ?? "",
    currentAddress: userData?.currentAddress ?? "",
    permanentAddress: userData?.permanentAddress ?? "",
    secondaryNumber: userData?.secondaryNumber ?? "",
    userRole: userData.userRole ?? "",
  };

  const submitDetails = async (form, { setSubmitting }) => {
    const updatedUserData = {
      phoneNumber: form.phoneNumber,
      personalEmail: form.personalEmail,
      gender: form.gender,
      dob: form.dob,
      bloodGroup: form.bloodGroup,
      nationality: form.nationality,
      currentAddress: form.currentAddress,
      permanentAddress: form.permanentAddress,
      secondaryNumber: form.secondaryNumber,
      modifiedDate: new Date().toISOString().split("T")[0],
      modifiedBy: "",
    };

    try {
      await updateUserDetails(userData.empId, updatedUserData);
      handleClose("201");
      showAlert({
        severity: "success",
        content: "User details updated successfully",
        duration: 5000
      });
    } catch (_error) {
      showAlert({
        severity: "error",
        content: "Failed to update user details",
        duration: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box padding={2} maxWidth={600} mx="auto" position={"relative"}>
      <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        style={{ position: "absolute", top: 10, right: 15 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        variant="h5"
        paddingBottom={3}
        gutterBottom
        style={{ fontWeight: "bold" }}
      >
        User Details
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitDetails}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  InputProps={{
                    readOnly: true,
                    style: { backgroundColor: "#f0f0f0" },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Middle Name"
                  name="middleName"
                  value={values.middleName}
                  InputProps={{
                    readOnly: true,
                    style: { backgroundColor: "#f0f0f0" },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  InputProps={{
                    readOnly: true,
                    style: { backgroundColor: "#f0f0f0" },
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Personal Email"
                  size="small"
                  type="email"
                  name="personalEmail"
                  error={touched.personalEmail && !!errors.personalEmail}
                  helperText={<ErrorMessage name="personalEmail" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Phone Number"
                  size="small"
                  name="phoneNumber"
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={<ErrorMessage name="phoneNumber" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Secondary Number"
                  size="small"
                  name="secondaryNumber"
                  error={touched.secondaryNumber && !!errors.secondaryNumber}
                  helperText={<ErrorMessage name="secondaryNumber" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Date of Birth"
                  size="small"
                  type="date"
                  name="dob"
                  InputLabelProps={{ shrink: true }}
                  value={values.dob}
                  error={touched.dob && !!errors.dob}
                  helperText={<ErrorMessage name="dob" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.gender && !!errors.gender}
                >
                  <InputLabel>Gender</InputLabel>
                  <Field
                    as={Select}
                    name="gender"
                    label="Gender"
                    value={values.gender}
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Field>
                  {touched.gender && !!errors.gender && (
                    <FormHelperText>{errors.gender}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.bloodGroup && !!errors.bloodGroup}
                >
                  <InputLabel>Blood Group</InputLabel>
                  <Field
                    as={Select}
                    name="bloodGroup"
                    label="Blood Group"
                    value={values.bloodGroup}
                    onChange={(e) =>
                      setFieldValue("bloodGroup", e.target.value)
                    }
                  >
                    {bloodGroups.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.bloodGroup && !!errors.bloodGroup && (
                    <FormHelperText>{errors.bloodGroup}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Nationality"
                  size="small"
                  name="nationality"
                  error={touched.nationality && !!errors.nationality}
                  helperText={<ErrorMessage name="nationality" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Current Address"
                  size="small"
                  multiline
                  rows={3}
                  name="currentAddress"
                  error={touched.currentAddress && !!errors.currentAddress}
                  helperText={<ErrorMessage name="currentAddress" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Permanent Address"
                  size="small"
                  multiline
                  rows={3}
                  name="permanentAddress"
                  error={touched.permanentAddress && !!errors.permanentAddress}
                  helperText={<ErrorMessage name="permanentAddress" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  label="User Role"
                  name="userRole"
                  value={values.userRole}
                  InputProps={{
                    readOnly: true,
                    style: { backgroundColor: "#f0f0f0" },
                  }}
                  size="small"
                />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="right">
              <Button
                sx={{ mr: 2, textTransform: "none", fontWeight: "bold" }}
                variant="contained"
                style={cancelButton}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{ textTransform: "none", fontWeight: "bold" }}
                variant="contained"
                style={buttonStyles}
                type="submit"
                className="buttonStyles"
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;
