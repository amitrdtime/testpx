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
    FormControl
  } from "@mui/material";
  import CardDetails from "../components/card-details";
  import { FaPlus } from "react-icons/fa";
  import FormComponent from "../components/formComponent";
  import Breadcrumbs from "../components/breadcrumb";
  import "../styles/user-style.css";
  import CustomAccordion from "../components/custom-accordion";
  import React, { useEffect, useMemo, useState } from "react";
  import GridComponent from "../components/Grid";
  import useSow from "../hooks/sow-hooks";
  import Spinner from "../components/spinner";
  import SearchIcon from "@mui/icons-material/Search";
  import DownloadIcon from '@mui/icons-material/Download';
  import {
    Search,
    StyledInputBase,
    SearchIconWrapper,
  } from "../styles/search-styles";
  import * as Yup from "yup";
  import { sowColumns } from "../contexts/column-config";
  import { clientDetails } from "../contexts/card-details-config";
  import useClientDetail from "../hooks/client-detail-hooks";
  import { useParams } from "react-router-dom";
  import CustomAlert from "../components/alert.jsx";
  import { roleColumns } from "../contexts/column-config.js"
  
 
  import { format, parseISO } from 'date-fns'; // Import date-fns methods
  import { downloadSOWRecords } from "../utils/download-records-helper.js";
  import { roleMockData } from "../mocks/client_mock";
  
  const validationSchema = Yup.object().shape({
    roleName: Yup.string().required("Role Name is required")
  });

  
  const RolePermission = () => {
   
  
    const [page, setPage] = React.useState(1);
    const [roleData, setRoleData] = useState("");
    const [totalPages, setTotalPages] = React.useState(10);
    const [pageSize, setPageSize] = useState(10); 
    const [sortField, setSortField] = React.useState("createdAt");
    const [sortOrder, setSortOrder] = React.useState("desc");
    const [search, setSearchInput] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [flag, setFlag] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const [roleName,setRoleName] = useState("");
    const [description,setDescription] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [status,setStatus] = useState("");

    const [alert, setAlert] = useState({
      show: false,
      severity: "",
      content: "",
    });

    const breadcrumbs = [
      { label: "Role management", href: "/userroles" },
    ];
  
  
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value); // Update pageSize state
      setPage(1); // Reset to first page when page size changes
    };
  
    //const { clientDetail, loading, error } = useClientDetail(id);
    //const { sowList } = useSow(id, defaultParams, reload);
    const  roleLists  = roleMockData.data;
    console.log(roleLists);
  
    const handleSort = (columnId) => {
      const isAsc = sortField === columnId && sortOrder === "asc";
      setSortOrder(isAsc ? "desc" : "asc");
      setSortField(columnId);
    };
  
    const handleEditClick = (row) => {
      setIsEditMode(true);
      setRoleData(row);
      setOpen(true);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleSearchKeyPress = (event) => {
      if (event.key === "Enter") {
        setSearchInput(!search);
        setPage(1);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchText(event.target.value);
      setSearchInput(!search);
      setPage(1);
    };
  
    const handleClickOpen = () => {
      setIsEditMode(false);
      setRoleData(null);
      setOpen(true);
    };
  
    const handleClose = (code) => {
      setRoleData(null);
      setRoleName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setStatus("");
      if (code === "201") {
        setReload(!reload);
        setAlert({
          show: true,
          severity: "success",
          content: "New Role added successfully.",
        });
      }
      if (code === "202") {
        setReload(!reload);
        setAlert({
          show: true,
          severity: "success",
          content: "Role updated successfully.",
        });
      }
      setOpen(false);
      
    };
  
  
    const onCloseCallback= (flag)=>{
      if(flag){
           setAlert({
            show: false
          });
          setFlag(false)
      }
    }
    //if (loading) return <Spinner />;

    const formFields = [
        {
          name: "roleName",
          label: "Role Name*",
          type: "text",
          value:roleName,
          onChange:(e) => {
            setRoleName(e.target.value);
          }
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          value:description,
          onChange:(e) => {
            setDescription(e.target.value);
          }
        },
        {
          name: "startDate",
          label: "Start Data",
          type: "date",
          value:startDate,
          onChange:(e) => {
            setStartDate(e.target.value);
          }
        },
        {
          name: "endDate",
          label: "End Data",
          type: "date",
          value:endDate,
          onChange:(e) => {
            setEndDate(e.target.value);
          }
        },
       
        {
          name: "status",
          label: "Status",
          type: "select",
          value:endDate,
          onChange:(e) => {
            setStatus(e.target.value);
          }
        },
      ];  

    const defaultInitialValues = {
      roleName: roleData ? roleData.roleName: "",
      description: roleData ? roleData.description: "",
      startDate: roleData ? roleData.startDate: "",
      endDate: roleData ? roleData.endDate: "",
      status: roleData ? roleData.status: "",
      createdDate: roleData ? roleData.createdDate: "",
    };

    const handleSubmit = async (values) => {
      console.log(values);
    };

    const handleFormChange = (changedValues) => {
      //setFormValues((prev) => ({ ...prev, ...changedValues }));
      setHasUnsavedChanges(true); // Mark that there are unsaved changes
    };
   
  
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
                Add Role
              </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
              <FormComponent
                initialValues={defaultInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                formFields={formFields}
                onClose={handleClose}
                title={roleData ? "Edit Role" : "Add Role"}
                submitButtonLabel={"Save"}
                cancelButtonLabel={"Cancel"}
                onChange={handleFormChange} // Call this prop when the form changes
              />
            </Dialog>
            
            <CustomAccordion title="Role List" defaultExpanded={true}>
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
              
              {roleLists  && roleLists.length > 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "40px",
                  }}
                >
                  <GridComponent
                    columns={roleColumns}
                    data={roleLists}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onActionClick={handleEditClick}
                    basePath="/role"
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
  
  
  export default RolePermission;
  