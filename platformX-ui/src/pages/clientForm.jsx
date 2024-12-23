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
  addClients,
  getTypes,
  getResources,
  updateClient,
  getMetaDataZipCode,
  getMetaDataCountry,
  getMetaDataLanguageCode,
  getMetaDataFormatRegion,
  getMetaDataContactDetails,
} from "../services/client-service";

import "../styles/user-style.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number'),
    mobilePhoneNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobilePhoneNo number'),
  email: Yup.string()
    .email('Invalid email address')
  //type: Yup.string().required("Type is required"),
});

let profiles = JSON.parse(sessionStorage.getItem("profileData"));
const defaultInitialValues = {
  name: "",
  address: "",
  address2: "",
  countryRegionId: null,
  city: "",
  state: "",
  zipCode: "",
  phoneNo: "",
  mobilePhoneNo: "",
  email: "",
  faxNo: "",
  website: "",
  languageId: null,
  formatRegionId: null,
  contactId: null,
  createdBy:profiles.displayName
};

const ClientForm = ({ onClose, initialValues = defaultInitialValues,onChange }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredPostalCodes, setFilteredPostalCodes] = useState([]);
  const [filteredLanguageCode, setFilteredLanguageCode] = useState([]);
  const [filteredFormatRegion, setFilteredFormatRegion] = useState([]);
  const [filteredContactDetails, setFilteredContactDetails] = useState([]);
  const [metaData, setMetaData] = useState([]);

  const [selectedContactCode, setSelectedContactCode] = useState('');
  const [selectedContactName, setSelectedContactName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  
  


  // Update contact name based on selected contact code
  useEffect(() => {
    if (selectedContactName) {
      console.log("selectedContactName",selectedContactName);
      console.log("filteredContactDetails",filteredContactDetails)
      const selectedContact = filteredContactDetails.find(
        (contact) => contact.id === selectedContactName
      );
     // console.log("selectedContact",...new Set(selectedContact))
      if (selectedContact) {
        setSelectedContactCode(selectedContact.number);
      } else {
        setSelectedContactCode('');
      }
    }
  }, [selectedContactName, filteredContactDetails]);

  useEffect(()=>{
    if(initialValues.contactId){
      console.log("initialValues.contactId",initialValues.contactId);
      setSelectedContactCode(initialValues.contactId)
    }
  },[initialValues]);

  // // Update contact code based on selected contact name
  // useEffect(() => {
  //   if (selectedContactName) {
  //     const selectedContact = filteredContactDetails.find(
  //       (contact) => contact.id === selectedContactName
  //     );
  //     if (selectedContact) {
  //       setSelectedContactCode(selectedContact.id);
  //     } else {
  //       setSelectedContactCode('');
  //     }
  //   }
  // }, [selectedContactName, filteredContactDetails]);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
 
  useEffect(() => {
    const fetchZipCodes = async () => {
      try {
        const countries = await getMetaDataCountry();
        setCountries(countries);
      } catch (error) {
        console.error("Error fetching client country details:", error);
      }
    };

    const fetchLanguageCode = async () => {
      try {
        const languageCodes = await getMetaDataLanguageCode();
        setFilteredLanguageCode(languageCodes);
      } catch (error) {
        console.error("Error fetching language Codes details:", error);
      }
    };

    const fetchFormatRegion = async () => {
      try {
        const formatRegions = await getMetaDataFormatRegion();
        setFilteredFormatRegion(formatRegions);
      } catch (error) {
        console.error("Error fetching format Regions details:", error);
      }
    };

    const fetchContactDetails = async () => {
      try {
        const contactDetails = await getMetaDataContactDetails();
        setFilteredContactDetails(contactDetails);
      } catch (error) {
        console.error("Error fetching contact Details:", error);
      }
    };

    fetchContactDetails()
    fetchFormatRegion()
    fetchLanguageCode();
    fetchZipCodes();

  }, []);

  useEffect(() => {
    if (initialValues.countryRegionCode) {
      handleCountryChangeUpdate(initialValues.countryRegionCode)
      handleStateChange(initialValues.state || "",initialValues.countryRegionCode || "");
    }
    if (initialValues.state) {
      handleCityChange(initialValues.city || "",initialValues.countryRegionCode);
    }
  }, [initialValues, metaData]);

  const handleCountryChange = async (countryCode) => {
    try {
      const metaData = await getMetaDataZipCode(countryCode);
      setMetaData(metaData);
     
      const filteredStaties = metaData
        .filter((zip) => zip.countryRegionCode === countryCode)
        .map((zip) => zip.state);
    
      setStates([...new Set(filteredStaties)]);
      setFilteredCities([]);

    }catch(err) {
      setStates([]);
      setFilteredCities([]);
      setFilteredPostalCodes([]);
    }
    
  };

  const handleCountryChangeUpdate = async (countryCode) => {
    try {
      const metaData = await getMetaDataZipCode(countryCode);
     
     
      const filteredStaties = metaData
        .filter((zip) => zip.countryRegionCode === countryCode)
        .map((zip) => zip.state);
    
      setStates([...new Set(filteredStaties)]);
      setFilteredCities([]);
      //setMetaData(metaData);

    }catch(err) {
      setStates([]);
      setFilteredCities([]);
      setFilteredPostalCodes([]);
    }
    
  };

  const handleStateChange = async (stateCode,countryCode="") => {
    try {
      if(metaData.length === 0){
        const metaDatas = await getMetaDataZipCode(countryCode ? countryCode:initialValues.countryRegionCode);
        const filteredCities = metaDatas
        .filter((zip) => zip.state === stateCode)
        .map((zip) => zip.city);
        setFilteredCities([...new Set(filteredCities)]);
        setFilteredPostalCodes([]);
      }else{
        const filteredCities = metaData
        .filter((zip) => zip.state === stateCode)
        .map((zip) => zip.city);
        setFilteredCities([...new Set(filteredCities)]);
        setFilteredPostalCodes([]);
      }
     
    }catch(err) {
      setFilteredCities([]);
      setFilteredPostalCodes([]);
    }
  };

  const handleCityChange = async (selectedCity,countryCode="") => {
    try {
      if(metaData.length === 0){
        const metaDatas = await getMetaDataZipCode(countryCode ? countryCode:initialValues.countryRegionCode);
        const filteredPostalCodes = metaDatas
        .filter((zip) => zip.city === selectedCity)
        .map((zip) => zip.code);
      setFilteredPostalCodes([...new Set(filteredPostalCodes)]);
      }else{
        const filteredPostalCodes = metaData
        .filter((zip) => zip.city === selectedCity)
        .map((zip) => zip.code);
      setFilteredPostalCodes([...new Set(filteredPostalCodes)]);
      }
     
    }catch(err) {
      setFilteredPostalCodes([]);
    }
  };

  const handleSubmit = async (values) => {
   //console.log("values",values);return;
    try {
      setIsFormValid(true)
      if (values.id) {
        const changedValues = Object.keys(values).reduce((acc, key) => {
          if (values[key] !== initialValues[key]) {
            acc[key] = values[key];
            acc["modifiedBy"] = profiles.displayName;
          }
          return acc;
        }, {});

        await updateClient(
          values.id,
          changedValues,
          initialValues["@odata.etag"]
        );
      } else {
        await addClients(values);
      }
      if (values.id) {
        onClose("202");
      } else {
        onClose("201");
      }
    } catch (error) {
      onClose("401");
      console.log(error);
    }
  };

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
                padding: "0px 10px",
                marginLeft: "10px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0px !important"
              }}
            >
              <h3 className="form-sub-heding">
                {initialValues.id ? "Edit Client" : "Add New Client"}
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
                    name="name"
                    as={TextField}
                    label="Customer Name*"
                    fullWidth
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="address"
                    as={TextField}
                    label="Address Line 1"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="address2"
                    as={TextField}
                    label="Address Line 2"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="countryRegionId"
                    as={TextField}
                    select
                    label="Country Region Code"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      const selectedId = e.target.value; // Get the selected country ID
                      setFieldValue("countryRegionId", selectedId);
                      setFieldValue("state", "");
                      setFieldValue("city", "");
                      setFieldValue("zipCode", "");
                      handleChange(e);
                      handleFieldChange(); // Track changes
                      // Find the selected country based on the selected ID
                      const selectedCountry = countries.find(country => country.id === selectedId);
                      if (selectedCountry) {
                        handleCountryChange(selectedCountry.code); // Pass the country code
                      }
                    }}
                  >
                    {countries.map((country, index) => (
                      <MenuItem key={index} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="state"
                    as={TextField}
                    select
                    label="State"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      setFieldValue("state", e.target.value);
                      setFieldValue("city", "");
                      setFieldValue("zipCode", "");
                      handleStateChange(e.target.value);
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                    disabled={!values.countryRegionId}
                  >
                    {states.map((state, index) => (
                      <MenuItem key={index} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="city"
                    as={TextField}
                    select
                    label="City"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      setFieldValue("city", e.target.value);
                      //setFieldValue("zipCode", "");
                      handleCityChange(e.target.value);
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                    disabled={!filteredCities.length}
                  >
                    {filteredCities.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="zipCode"
                    as={TextField}
                    select
                    label="ZIP Code"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!filteredPostalCodes.length}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                    {filteredPostalCodes.map((postalCode, index) => (
                      <MenuItem key={index} value={postalCode}>
                        {postalCode}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="phoneNo"
                    as={TextField}
                    label="Phone No."
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={touched.phoneNo && !!errors.phoneNo}
                    helperText={touched.phoneNo && errors.phoneNo}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="mobilePhoneNo"
                    as={TextField}
                    label="Mobile Phone"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={touched.mobilePhoneNo && !!errors.mobilePhoneNo}
                    helperText={touched.mobilePhoneNo && errors.mobilePhoneNo}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="faxNo"
                    as={TextField}
                    label="Fax No."
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="website"
                    as={TextField}
                    label="Home Page"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="languageId"
                    as={TextField}
                    select
                    label="Language Code"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!filteredLanguageCode.length}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                    {filteredLanguageCode.map((languageCode, index) => (
                      <MenuItem key={index} value={languageCode.id}>
                        {languageCode.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="formatRegionId"
                    as={TextField}
                    select
                    label="Format Region"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    disabled={!filteredFormatRegion.length}
                    onChange={(e) => {
                      handleChange(e);
                      handleFieldChange(); // Track changes
                    }}
                  >
                    {filteredFormatRegion.map((formatRegion, index) => (
                      <MenuItem key={index} value={formatRegion.id}>
                        {formatRegion.name}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="contactName"
                    as={TextField}
                    select 
                    label="Contact Name"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={selectedContactName}
                    onChange={(event) => {
                      setSelectedContactName(event.target.value)
                      handleChange(event);
                      handleFieldChange(); 
                      setFieldValue("contactId", event.target.value); // Update Formik state
                    }}
                    disabled={!filteredContactDetails.length}
                  >
                    {filteredContactDetails
                      .filter((contact) =>
                        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((contact, index) => (
                        <MenuItem key={index} value={contact.id}>
                          {contact.name}
                        </MenuItem>
                      ))}
                  </Field>

                </Grid>

                <Grid item xs={6}>
                  {/* {selectedContactCode ? selectedContactCode :""} */}
                  <Field
                    name="contactId"
                    as={TextField}
                    select
                    label="Contact Code"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => {
                      const value = event.target.value;
                      setFieldValue("contactId", value); // Update Formik state
                      setSelectedContactCode(value); // If you still need to manage this state separately
                    }}
                    disabled
                   
                  >
                    {filteredContactDetails.map((contact, index) => (
                      <MenuItem key={index} value={contact.id}>
                        {contact.number}
                      </MenuItem>
                    ))}
                  </Field>
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
                {initialValues.id ? 'Update' : 'Save'} {console.log("errors",errors)}
                
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ClientForm;
