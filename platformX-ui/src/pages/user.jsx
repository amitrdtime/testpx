import {
  Avatar,
  Box,
  Card,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { VscProject } from "react-icons/vsc";
import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { GrUpdate } from "react-icons/gr";
import { GrEdit } from "react-icons/gr";
import "../styles/user-style.css";
import EmployeeInformation from "./employeeInfo";
import UserProjectAllocation from "./userProjectAllocation.jsx";
import ProfileOverview from "./profileOverview.jsx";
import useUserStore from "../store/useUserStore";
import useFetchUserById from "../hooks/user-hooks";
import Spinner from "../components/spinner.jsx";
import { updateUserDetails } from "../services/user-service";
import CustomAlert from "../components/alert.jsx";
import {getInitials} from "../utils/use-helper.js";

const UserComponent = () => {
  const { userData, profileImage } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const formikRef = useRef(null); // Reference to Formik instance
  const [selectedSection, setSelectedSection] = useState("Profile Overview");
  const [reload, setReload] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    content: "",
  });

  const userEmail = userData?.mail ?? "";
  const { data, loading, error } = useFetchUserById(userEmail, reload);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async (values) => {
    setEditMode(false);
    try {
      const response = await updateUserDetails(data.empId, values);
      if (response.status === 200) {
        setReload(!reload);
        setAlert({
          show: true,
          severity: "success",
          content: "Your changes were successfully Updated.",
        });
      }
    } catch (_error) {
      console.log(_error);
      setAlert({
        show: true,
        severity: "error",
        content: "Failed to update user details.",
      });
    }
  };

  const getUserName = (firstName, lastName) => {
    const username = `${firstName} ${lastName}`;
    return username;
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error loading data.</p>;

  return (
    <>
      <Grid container spacing={3} sx={{ margin: 2, marginLeft: "35px" }}>
        <Grid item xs={4} md={3} p={2}>
          <Card
            sx={{
              p: 2,
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Box
              p={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                alt="User Photo"
                src={profileImage ?? "/static/images/avatar/1.jpg"}
                sx={{ width: 165, height: 165, fontSize: 50 }}
              >
                {!profileImage && getInitials(data?.firstName, data?.lastName)}
              </Avatar>
              <Typography
                variant="h6"
                mt={2}
                className={`text-style text-weight`}
              >
                {getUserName(data?.firstName, data?.lastName)}
              </Typography>
              <Typography
                variant="h6"
                mt={1}
                className={`text-style light-text-weight`}
              >
                {data?.officialEmail}
              </Typography>
            </Box>
            <Box sx={{ paddingLeft: 2, paddingRight: 1 }}>
              <List>
                <ListItemButton
                  selected={selectedSection === "Profile Overview"}
                  onClick={() => setSelectedSection("Profile Overview")}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CgProfile size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={`text-style light-text-weight`}>
                        Profile Overview
                      </Typography>
                    }
                  />
                </ListItemButton>
                <ListItemButton
                  selected={selectedSection === "Employee Information"}
                  onClick={() => setSelectedSection("Employee Information")}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <ImProfile size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={`text-style light-text-weight`}>
                        Employee Information
                      </Typography>
                    }
                  />
                </ListItemButton>
                <ListItemButton
                  selected={selectedSection === "Project Allocation"}
                  onClick={() => setSelectedSection("Project Allocation")}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <VscProject size={22} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography className={`text-style light-text-weight`}>
                        Project Allocation
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={8}>
          {alert.show && (
            <CustomAlert
              severity={alert.severity}
              content={alert.content}
              duration={3000}
            />
          )}
          <Card
            sx={{
              padding: "20px",
              position: "relative",
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" className={`text-style text-weight`}>
              {selectedSection}
            </Typography>
            {selectedSection === "Profile Overview" && (
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  display: "flex",
                  gap: 1,
                }}
              >
                {/* {!editMode && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleEdit}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      border: "none",
                      "&:hover": {
                        boxShadow: 4,
                        border: "none",
                      },
                    }}
                  >
                    <GrEdit style={{ marginRight: 8 }} />
                    Edits
                  </Button>
                )} */}
                {editMode && (
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => {
                        const formValues = formikRef.current.values; // Access the form values
                        console.log("formValues before modification:", formValues); // Log the form values
                        // Change a specific key value
                        console.log("formValuess",formValues.dob);
                        const splitDob = formValues.dob.split("-"); // Split by comma
                        formValues.dob = splitDob[1]+"/"+splitDob[2]+"/"+splitDob[0];//"10/09/2024"; // Update the 'name' field
                        
                        const date = new Date(); // Get the current date
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (0-based, so add 1) and pad with zero
                        const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad with zero
                        const year = date.getFullYear(); // Get the year
                        formValues.updatedAt = month+"/"+day+"/"+year;
                        // If you need to update the form values in Formik state, use setValues
                        formikRef.current.setValues(formValues); // Update Formik state with modified values
                        // Now you can submit the form
                        formikRef.current.submitForm(); // Trigger form submission
                    }}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 3,
                      textTransform: "none",
                      fontWeight: "bold",
                      border: "none",
                      "&:hover": {
                        boxShadow: 4,
                        border: "none",
                      },
                    }}
                  >
                    <GrUpdate style={{ marginRight: 8 }} />
                    Update
                  </Button>
                )}
              </Box>
            )}
            <Box sx={{ mt: 5 }}>
              {selectedSection === "Profile Overview" && (
                <ProfileOverview
                  editMode={editMode}
                  onUpdate={handleUpdate}
                  formikRef={formikRef}
                  userData={data}
                />
              )}
              {selectedSection === "Employee Information" && (
                <EmployeeInformation userData={data} />
              )}
              {selectedSection === "Project Allocation" && (
                <UserProjectAllocation userData={data} />
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default UserComponent;
