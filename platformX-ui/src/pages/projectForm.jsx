import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage  } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Button,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getMetaDataProjectPosting,
  getMetaDataLocations,
  addProject,
  getMetaDataWipMethod,
  getClientById,
  getSowByNo,
  updateProject
} from "../services/client-service";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Adjust import based on your library
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "../styles/user-style.css";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  projectCreatedDate: Yup.date().required('Project Creation Date is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required'),
});

let profiles = JSON.parse(sessionStorage.getItem("profileData"));

const defaultInitialValues = {
  description: "",
  projectPostingGroupId: null,
  wipMethodId: null,
  locationId: null,
  startDate: "",
  endDate: "",
  projectCreatedDate: "",
};




const ProjectForm = ({ onClose, initialValues = defaultInitialValues,clientId, sowNo,sowData,sowDetail,onChange }) => {
  const [projectPostingGroups, setProjectPostingGroup] = useState([]);
  const [wipMethods, setWipMethods] = useState([]); 
  const [locationCodes, setLocationCodes] = useState([]);
  const [projectPostings, setProjectPostings] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [description, setDescription] = useState("");
  const [projectPostingGroupId, setProjectPostingGroupId] = useState("");
  const [wipMethodId, setWipMethodId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [projectCreatedDate, setProjectCreatedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flag, setFlag] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  console.log("sowDetail",sowDetail);

  const shouldDisableProjectCreatedDate = (date,startDate) => {
   // const projectDate = new Date(projectCreatedDate);
    const startDateValue = startDate ? new Date(startDate) : null; // Check if endDate has a value
    //const endDateValue = endDate ? new Date(endDate) : null; // Check if endDate has a value
   // const endDate = new Date(); // End date can be set as required
    
    // Add one day to projectDate
  if (startDateValue) {
    startDateValue.setDate(startDateValue.getDate());
    return date > startDateValue
  }
 ;
}

  const shouldDisableDate = (date, projectCreatedDate, endDate) => {
    console.log("projectCreatedDate", projectCreatedDate);
    
    // Convert projectCreatedDate to a Date object
    const projectDate = new Date(projectCreatedDate);
    console.log("projectDate", projectDate);
    
    // Check if endDate has a value
    const endDateValue = endDate ? new Date(endDate) : null;

    // Add one day to projectDate
    projectDate.setDate(projectDate.getDate() + 1);
    
    // If endDate exists, subtract one day for comparison
    if (endDateValue) {
        endDateValue.setDate(endDateValue.getDate() - 1);
        console.log("End Date - 1 Day:", endDateValue);
    }
    
    console.log("Selected Date:", date);
    console.log("Project Created Date + 1 Day:", projectDate);

    // Disable dates that are before projectDate + 1 day or after endDate
    return date < projectDate || (endDateValue && date > endDateValue);

  };

  const shouldDisableEndDate = (date,startDate) => {
    const projectDate = new Date(startDate);
  
  // Add one day to projectDate
  projectDate.setDate(projectDate.getDate() + 1);

  console.log("Selected Date:", date);
  console.log("Project Created Date + 1 Day:", projectDate);

  // Disable dates that are before or equal to projectDate + 1 day
  return date < projectDate;
  };

  const handleStartDate = (date,setFieldValue)=>{
    setFieldValue('startDate',date)
  }

  const handleEndDate = (date,setFieldValue)=>{
   // setEndDate(date)
    setFieldValue('endDate',date)
  }
  
  
 // startDate.setDate(projectCreatedDate.getDate() + 1); 

 
  

  useEffect(()=>{
    const wipMethodsDropdown = async()=>{
      try {
        const wipMethodss = await getMetaDataWipMethod();
        setWipMethods(wipMethodss)
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchProjectPosting = async () => {
      try {
        const projectPostings = await getMetaDataProjectPosting();
        setProjectPostingGroup(projectPostings)
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchLocations = async () => {
      try {
        const locations = await getMetaDataLocations();
        setLocationCodes(locations)
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
   
    wipMethodsDropdown();
    fetchLocations();
    fetchProjectPosting();
   
  
  },[]);

  const removeNullFields = obj => 
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== "") {
        acc[key] = value;
        acc["sowNo"] = sowDetail.sowNo;
        acc["createdBy"] = profiles.displayName;
      }
      return acc;
  }, {});

 
  const handleSubmit = async (values) => {
   //console.log("values",values);return;
   try { 
    setIsFormValid(true)
    let filteNullValues = removeNullFields(values);
    if(clientId && sowNo && sowData && sowData.id){
        const changedValues = Object.keys(values).reduce((acc, key) => {
          if (values[key] !== initialValues[key]) {
            acc[key] = values[key];
            acc["sowNo"] = sowDetail.sowNo;
            acc["modifiedBy"] = profiles.displayName;
          }
          if(validationSchema.fields.hasOwnProperty(key) ) {
            acc[key] = values[key];
          }
          return acc;
        }, {});
        
        console.log("changedValues",changedValues);
      await updateProject(clientId,sowNo,sowData.id,changedValues);
      onClose("202");
    } else {
      await addProject(clientId,sowNo,filteNullValues);
      onClose("201");
    }
  } catch (error) {
    console.error(error);
  }
  };

  const handleCreatedDate = (date,setFieldValue)=>{
    const currDate = new Date();
    //setProjectCreatedDate(date)
    setFieldValue('projectCreatedDate',date)
    console.log("Current Date:", currDate);
  }

  const handleFieldChange = (event) => {
    // Handle field change logic
    onChange(); // Mark as having unsaved changes
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize // This is important for ensuring Formik reinitializes with new values
    >
      {({ errors, touched, setFieldValue, values, handleBlur, isValid, dirty ,handleChange   }) => (
        <Form>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "736px",
              margin: "0 auto",
              height: "600px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                padding: "10px",
                marginLeft: "10px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 className="form-sub-heding">
                {initialValues && initialValues.id ? "Edit Project" : "Add New Project"}
              </h3>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: "20px",
              }}
            >
               
               
              <Grid container spacing={4}>
              <Grid item xs={6}>
                  <Field
                    name="customerNo"
                    as={TextField}
                    disabled={true}
                    label="Customer No"
                    fullWidth
                    value={sowDetail.customerNo}
                  />
                </Grid>
                <Grid item xs={6}>
                    <Field
                      name="sowNo"
                      as={TextField}
                      disabled={true}
                      label="SOW No."
                      fullWidth
                      value={sowDetail.sowNo}
                    />
                </Grid>  
              {initialValues && initialValues.id ? (
                  <>
                    <Grid item xs={6}>
                      <Field
                        name="projectNo"
                        as={TextField}
                        disabled={true}
                        label="Project No*"
                        value={initialValues.projectNo} // Access directly, initialValues is already checked
                        fullWidth
                      />
                    </Grid>
                  </>
                ) : null}
               
                <Grid item xs={6}>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description*"
                    fullWidth
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="projectPostingGroupId"
                    as={TextField}
                    select
                    label="Project Posting group"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!projectPostingGroups.length}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                    {projectPostingGroups.map((projectPostingGroup, index) => (
                      <MenuItem key={index} value={projectPostingGroup.id}>
                        {projectPostingGroup.description}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

              

                <Grid item xs={6}>
                  <Field
                    name="wipMethodId"
                    as={TextField}
                    select
                    label="WIP Method"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!wipMethods.length}
                    onChange={(e) => {
                      const selectedId = e.target.value; // Get the selected country ID
                      setFieldValue("wipMethodId", selectedId);
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                   {wipMethods.map((wipMethod, index) => (
                    <MenuItem key={index} value={wipMethod.id}>
                      {wipMethod.code}
                    </MenuItem>
                  ))} 
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="locationId"
                    as={TextField}
                    select
                    label="Location Code"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!locationCodes.length}
                    onChange={(e) => {
                      const selectedId = e.target.value; // Get the selected country ID
                      setFieldValue("locationId", selectedId);
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                     {locationCodes.map((locationCode, index) => (
                      <MenuItem key={index} value={locationCode.id}>
                        {locationCode.name}
                      </MenuItem>
                    ))} 
                  </Field>
                </Grid>

                <Grid item xs={6}>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  
                <DatePicker
                      label="Project Creation Date"
                      value={values ? values.projectCreatedDate:""} // Bind to Formik state
                      onChange={(newValue) => handleCreatedDate(newValue, setFieldValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={touched.projectCreatedDate && !!errors.projectCreatedDate}
                        helperText={touched.projectCreatedDate && errors.projectCreatedDate}
                        sx={{
                          width: "200px", // Set your desired width
                          height: "50px", // Set your desired height
                          "& input": {
                            fontSize: "14px", // Adjust font size if needed
                          },
                        }}
                      />
                    )}
                    shouldDisableDate={(date) => shouldDisableProjectCreatedDate(date, values.startDate)} // Pass values from Formik
                  /></LocalizationProvider>
                
                </Grid>

                <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                     label="Start Date"
                     value={values ? values.startDate:""} // Bind to Formik state
                     onChange={(newValue) => handleStartDate(newValue, setFieldValue)}
                     renderInput={(params) => (
                      <TextField
                        {...params}
                        error={touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                        sx={{
                          width: "200px", // Set your desired width
                          height: "50px", // Set your desired height
                          "& input": {
                            fontSize: "14px", // Adjust font size if needed
                          },
                        }}
                      />
                    )}
                    shouldDisableDate={(date) => shouldDisableDate(date, values.projectCreatedDate, values.endDate)} // Pass values from Formik

                  /></LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                   label="End Date"
                   value={values ? values.endDate:""} // Bind to Formik state
                   onChange={(newValue) => handleEndDate(newValue, setFieldValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={touched.endDate && !!errors.endDate}
                        helperText={touched.endDate && errors.endDate}
                        sx={{
                          width: "200px", // Set your desired width
                          height: "50px", // Set your desired height
                          "& input": {
                            fontSize: "14px", // Adjust font size if needed
                          },
                        }}
                      />
                    )}
                    shouldDisableDate={(date) => shouldDisableEndDate(date, values.startDate)} // Pass values from Formik
                  /></LocalizationProvider>
                </Grid>
                </Grid>
            

                
             
            </Box>

            <Box
              sx={{
                padding: "20px",
                borderTop: "1px solid #ddd",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                onClick={onClose}
                className="display-fields"
                type="button"
                sx={{
                  borderColor: "black",
                  color: "black",
                  width: "91px",
                  height: "46px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="display-fields"
                sx={{
                  width: "91px",
                  height: "46px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                disabled={!isValid || !dirty || isFormValid} // Disable if form is not valid or not modified
              >
                {initialValues && initialValues.id ? 'Update' : 'Save'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ProjectForm;
