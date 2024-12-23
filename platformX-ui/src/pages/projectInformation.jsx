import {
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Divider,
  Dialog,
  MenuItem, 
  Select,
  FormControl,
  DialogActions, 
  DialogContent, 
  DialogTitle,
} from "@mui/material";

import * as Yup from "yup";
import { FaPlus } from "react-icons/fa";
import ProjectForm from "./projectForm.jsx";
import FormAccordionComponent from "../components/formAccordionComponent";
import FormComponent from "../components/formComponent";
import Breadcrumbs from "../components/breadcrumb";
import CustomAccordion from "../components/custom-accordion";
import CardDetails from "../components/card-details";
import { useParams } from "react-router-dom";
import useSowDetails from "../hooks/sow-details-hooks";
import Spinner from "../components/spinner";
import { sowDetails } from "../contexts/card-details-config";
import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
} from "../styles/search-styles";

import { useMemo, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from '@mui/icons-material/Download';
import GridComponent from "../components/Grid";
import { projectTaskColumns } from "../contexts/column-config";
import getProjects from "../hooks/project-hooks";
import CustomAlert from "../components/alert.jsx";
import { format, parseISO } from 'date-fns'; // Import date-fns methods
import {
  getMetaDataProjectPosting,
  getMetaDataLocations,
  addProject,
  getMetaDataWipMethod,
  getClientById,
  getSowByNo,
  updateProject
} from "../services/client-service";
import { downloadProjectsRecords } from "../utils/download-records-helper.js";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
});


const ProjectInfo = () => {
  const { clientId,sowNo } = useParams();
  const [clientData, setclientData] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(10); 
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearchInput] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [reload, setReload] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [sowData, setSowData] = useState("");
  const [sowNumber, setSowNumber] = useState("");
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    content: "",
  });

  let profiles = JSON.parse(sessionStorage.getItem("profileData"));
  

  const convertToDate = (dateString) => {
    // Create a Date object from the string
    const date = new Date(dateString);
    return isNaN(date) || date.getTime() === new Date('1970-01-01T00:00:00Z').getTime() ? "" : formatDate(date); // Return null if the date is invalid
  };

  // Format the date to mm/dd/yyyy
  const formatDate = (date) => {
    return date ? format(date, 'MM/dd/yyyy') : '';
  };


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


    const fetchSOWDetails = async (clientId,sowId) => {
      try {
        const sowList = await getSowByNo(clientId, sowId);
        setSowNumber(sowList.sowNo)
        setClientName(sowList.customerName)
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
   
    wipMethodsDropdown();
    fetchLocations();
    fetchProjectPosting();
    fetchSOWDetails(clientId, sowNo);
  
  },[]);

  const breadcrumbs = [
    { label: "Client management", href: "/customers" },
    { label: clientName, href: `/customers/${clientId}` },
    { label: "Project", href: "/" },
  ];


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

  // Function to convert Project data into CSV and trigger download
  const downloadRecords = () => {
    downloadProjectsRecords(clientId,sowNo); 
  }; 

  const removeNullFields = obj => 
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== "") acc[key] = value;
      return acc;
  }, {});

  const defaultParams = useMemo(
    () => ({
      pageNumber: page,
      pageSize: pageSize,
      searchTerm: searchText,
      sortField: sortField,
      sortOrder: sortOrder,
    }),
    [page, pageSize, sortOrder, sortField, search,searchText]
  );

  const { sowDetail, loading, error } = useSowDetails(clientId,sowNo);
  const projectList = getProjects(clientId,sowNo, defaultParams, reload);

  // const handleEditClick = (row) => {
  //   console.log("row",row);
  //   setIsEditMode(true);
  //   setclientData(row);
  //   setOpen(true);
  // };
 

  const defaultInitialValues = {
    projectNo: sowData ? sowData.projectNo: "",
    description: sowData ? sowData.description: "",
    projectPostingGroupId: sowData ? sowData.projectPostingGroupId: "",
    wipMethodId: sowData ? sowData.wipMethodId: "",
    locationId: sowData ? sowData.locationId: "",
    startDate:sowData ? sowData.startDate: "",
    endDate:sowData ? sowData.endDate: "",
    projectCreatedDate:sowData ? sowData.projectCreatedDate: "",
    sowNo:sowDetail ? sowDetail.sowNo: "",
    createdBy:profiles.displayName
   
  };

  
 

  const formFields = [ 
          {
            name: 'projectNo',
            label: 'Project No',
            type: 'text',
            disabled: true,
          },
          {
            name: 'description',
            label: 'Description',
            type: 'text',
            value:description,
            onChange:(e) => {
              setDescription(e.target.value);
            }
          },
          {
            name: 'projectPostingGroupId',
            label: 'Project Posting Group',
            type: 'select',
            value:projectPostingGroupId,
            onChange:(e) => {
              setProjectPostingGroupId(e.target.value);
            },
            options: projectPostingGroups.map((projectPostingGroup) => ({ 
                label: projectPostingGroup.description, 
                value: projectPostingGroup.id
              })),
          },
          {
            name: 'wipMethodId',
            label: 'WIP Method',
            type: 'select',
            value:wipMethodId,
            onChange:(e) => {
              setWipMethodId(e.target.value);
            },
            options: wipMethods.map((wipMethod) => ({ 
              label: wipMethod.code, 
              value: wipMethod.id 
            })),
          },
          {
            name: 'locationId',
            label: 'Location Code',
            type: 'select',
            value:locationId,
            onChange:(e) => {
              setLocationId(e.target.value);
            },
            options: locationCodes.map((locationCode) => ({ 
              label: locationCode.name, 
              value: locationCode.id
            })),
          },
          {
            name: 'projectCreatedDate',
            label: 'Project Creation Date',
            type: 'date',
            value:projectCreatedDate || (sowData?.projectCreatedDate || null),
            onChange:(e) => {
              const stDate = startDate || (sowData?.startDate || null);
              if(stDate && new Date(e).getTime() < new Date(stDate).getTime()){
                setProjectCreatedDate(e)
              } 
              if( (stDate === undefined || stDate === null) ){
                setProjectCreatedDate(e)
              } 
            }
          },
          {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            value:startDate || (sowData?.startDate || null),
            onChange:(e) => {
              const etDate = endDate || (sowData?.endDate || null);
              const projectCreatedate = projectCreatedDate || (sowData?.projectCreatedDate || null);
              if(projectCreatedate && new Date(e).getTime() > new Date(projectCreatedate).getTime() && (etDate === undefined || etDate === null)){
                setStartDate(convertToDate(e));
              } if(projectCreatedate && new Date(e).getTime() > new Date(projectCreatedate).getTime() && etDate && new Date(e).getTime()<new Date(etDate).getTime()){
                setStartDate(convertToDate(e));
              }

            },
          },
          {
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            value:endDate || (sowData?.endDate || null),
            onChange:(e) => {
              const stDate = startDate || (sowData?.startDate || null);
             // const currEnd = endDate || (sowData?.endDate || null)
              if(new Date(e).getTime() > new Date(stDate).getTime()){ 
                setEndDate(convertToDate(e));
              }
            },
          }
];


  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchInput(!search);
      setPage(1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (projectList?.sowList.data?.length) {
      setTotalPages(Math.ceil(projectList.sowList.totalRecords / defaultParams.pageSize));
    }
  }, [projectList]);

  const handleSort = (columnId) => {
    const isAsc = sortField === columnId && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(columnId);
  };

  const handleEditClick = (row) => {
    console.log("row",row)
    setIsEditMode(true);
    setSowData(row);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setIsEditMode(false);
    setSowData(null);
    setOpen(true);
  };

  const handleClose = (code) => {
    setSowData(null);
    setDescription("");
    setProjectPostingGroupId("");
    setWipMethodId("");
    setLocationId("");
    setProjectCreatedDate("");
    setStartDate("");
    setEndDate("");
    if (code === "201") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "New Project added successfully.",
      });
    }
    if (code === "202") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "Project updated successfully.",
      });
    }
    setOpen(false);
  };

  const handleSubmit = async(values) => {
    // Handle form submission logic here
    try { 
      let filteNullValues = removeNullFields(values);
      if(clientId && sowNo && sowData && sowData.id){
          const changedValues = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== defaultInitialValues[key]) {
              acc[key] = values[key];
              acc["modifiedBy"] = profiles.displayName;
            }
            if(validationSchema.fields.hasOwnProperty(key) ) {
              acc[key] = values[key];
            }
            return acc;
          }, {});
          

        await updateProject(clientId,sowNo,sowData.id,changedValues);
        handleClose("202");
      } else {
        await addProject(clientId,sowNo,filteNullValues);
        handleClose("201");
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value); // Update pageSize state
    setPage(1); // Reset to first page when page size changes
  };


  const onCloseCallback= (flag)=>{
    if(flag){
         setAlert({
          show: false
        });
        setFlag(false)
    }
  }

  const handleDialogClose = () => {
    if (hasUnsavedChanges) {
      setShowConfirmation(true); // Show the custom confirmation dialog
    } else {
      handleClose();
    }
  };

  const handleConfirmClose = () => {
    handleClose();
    setShowConfirmation(false);
  };

  const handleFormChange = () => {
    setHasUnsavedChanges(true); // Mark that there are unsaved changes
  };

  const handleCancelClose = () => {
    setShowConfirmation(false);
  };


  if (loading) return <Spinner />;
  //if (error) return <p>Error loading data.</p>;

  return (
    <>
      <Grid
        container
        sx={{
          overflow: "auto",
          maxWidth: "calc(100vw - 105px)",
        }}
      >
         {alert.show && (
          <CustomAlert
            severity={alert.severity}
            content={alert.content}
            duration={3000}
            onCloseCallback={onCloseCallback}
          />
        )}
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            height: "100%",
            width: "100%",
            padding: "20px",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Breadcrumbs breadcrumbs={breadcrumbs} />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  textTransform: "none",
                  fontWeight: "bold",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#1995ad ",
                  color: "#fff",
                  "&:hover": {
                    boxShadow: 4,
                    border: "none",
                    color: "#000",
                  backgroundColor: "#5fc0d2 ",
                  },
                }}
                onClick={handleClickOpen}
              >
                <FaPlus style={{ marginRight: 10 }} />
                Add Project
              </Button>
            </Box>
            <Dialog open={open} onClose={handleDialogClose}>
            <ProjectForm
              onClose={handleClose}
              initialValues={isEditMode ? sowData : undefined}
              clientId={clientId}
              sowNo={sowNo}
              sowData={sowData}
              sowDetail={sowDetail}
              onChange={handleFormChange}
            />
            </Dialog>
            <Dialog
            open={showConfirmation}
            onClose={handleCancelClose}
          >
            <DialogTitle>Discard Changes?</DialogTitle>
            <DialogContent>
              <p>You have unsaved changes. Are you sure you want to discard them?</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleConfirmClose} color="secondary">
                Discard
              </Button>
            </DialogActions>
          </Dialog>
            <CustomAccordion title="SOW Details" defaultExpanded={true}>
              <CardDetails details={sowDetails(sowDetail)} />
            </CustomAccordion>
            <CustomAccordion title="Project List" defaultExpanded={true}>
              <Box sx={{ width: "100%", marginTop: "0px !important" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "0px !important",
                    paddingTop: "0px !important",
                  }}
                >
                  <Box sx={{ width: "100%", paddingTop: "0px !important", marginTop: "0px !important" }}>
                    <Box sx={{ width: "300px", float: "left", paddingTop: "0px !important", marginTop: "0px !important" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        sx={{
                          borderRadius: 2,
                          boxShadow: 3,
                          textTransform: "none",
                          fontWeight: "bold",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#1995ad ",
                          color: "#fff",
                          marginTop: "16px",
                          "&:hover": {
                            boxShadow: 4,
                            border: "none",
                            color: "#000",
                            backgroundColor: "#5fc0d2 ",
                          },
                        }}
                        onClick={downloadRecords}
                        disabled={projectList && projectList.sowList.data && projectList.sowList.data.length === 0}
                      >
                        Download
                      </Button>
                    </Box>
                    <Box sx={{ width: "300px", float: "right" }}>
                      <Search>
                        <StyledInputBase
                          value={searchText}
                          onChange={handleSearchChange}
                          onKeyDown={handleSearchKeyPress}
                          placeholder="Search..."
                          inputProps={{ "aria-label": "search" }}
                        />
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                      </Search>
                    </Box>
                    
                  </Box>
                </Box>
              
                {projectList && projectList.sowList.data && projectList.sowList.data.length > 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "40px",
                  }}
                >
                  <GridComponent
                    columns={projectTaskColumns}
                    data={projectList?.sowList?.data}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onActionClick={handleEditClick}
                    basePath="/customers"
                    clientId={clientId}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      gap: "4px",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      disabled={page === 1}
                      onClick={() => handlePageChange(null, 1)}
                      size="small"
                    >
                      First
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={page === 1}
                      onClick={() => handlePageChange(null, page - 1)}
                      size="small"
                    >
                      Previous
                    </Button>
                    <Pagination
                      variant="outlined"
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      hidePrevButton
                      hideNextButton
                      shape="rounded"
                    />
                    <Button
                      variant="outlined"
                      disabled={page === totalPages}
                      onClick={() => handlePageChange(null, page + 1)}
                      size="small"
                    >
                      Next
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={page === totalPages}
                      onClick={() => handlePageChange(null, totalPages)}
                      size="small"
                    >
                      Last
                    </Button>
                    <FormControl variant="outlined" size="small" >
                        <Select
                          id="page-size-select"
                          value={pageSize}
                          onChange={handlePageSizeChange}
                        >
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                          <MenuItem value={15}>15</MenuItem>
                          <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                  </Box>
                </Box>
              ) : (
                <div>No data available</div>
              )}
            </Box>
          </CustomAccordion>
        </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectInfo;