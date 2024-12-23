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
import CardDetails from "../components/card-details";
import { FaPlus } from "react-icons/fa";
import FormAccordionComponent from "../components/formAccordionComponent";
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

import {
  addSow,
  getMetaDataResources,
  getMetaDataJobType,
  getMetaDataProjectPosting,
  getMetaDataLocations,
  getMetaDataCurrencies,
  getClients,
  updateSow,
} from "../services/client-service";
import { format, parseISO } from 'date-fns'; // Import date-fns methods
import { downloadSOWRecords } from "../utils/download-records-helper.js";

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  //customerId: Yup.string().required("Customer name is required"),
  //customerNumber: Yup.string().required("Customer No. is required"),
});

const Sow = () => {
 
  const { id } = useParams();

  
  const [clientData, setclientData] = React.useState("");
  const [sowData, setSowData] = useState("");
  const [customerName, setCustomerName] = useState([]);
  const [clientName, setClientName] = useState("");
  const [customerNo, setCustomerNo] = useState([]);
  const [personResponsibles, setPersonResponsibles] = useState([]);
  const [jobType, setJobType] = useState([]);
  
  const [projectManagers, setSalespersons] = useState([]);
  const [sowStatus, setsowStatus] = useState([]);
  const [sowBlocked, setSowBlocked] = useState([]);
  const [projectPostings, setProjectPostings] = useState([]);
  const [locationCodes, setLocationCodes] = useState([]);
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [invoiceCurrencyCodes, setInvoiceCurrencyCodes] = useState([]);
  const [exchCalculationCosts, setExchCalculationCosts] = useState([]);
  const [exchCalculationPrices, setExchCalculationPrices] = useState([]);
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState([]);

  const [page, setPage] = React.useState(1);
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
  const [description,setDescription] = useState("");

  const[currencyCode,setCurrencyCode] = useState("");
  const[jobTypeId,setJobTypeId] = useState("");
  const[projectManagerId,setProjectManagerId] = useState("");
  const[blockedId,setBlockedId] = useState("");
  const[sowStatusId,setSowStatusId] = useState("");
  const[projectPostingGroupId,setProjectPostingGroupId] = useState("");
  const[locationId,setLocationId] = useState("");
  const[startingDate,setStartingDate] = useState("");
  const[endingDate,setEndingDate] = useState("");
  const[lastModifiedDateTime,setLastModifiedDateTime] = useState("");
  const[currencyId,setCurrencyId] = useState("");
  const[invoiceCurrencyId,setInvoiceCurrencyId] = useState("");
  const[exchCalculationCostId,setExchCalculationCostId] = useState("");
  const[exchCalculationPriceId,setExchCalculationPriceId] = useState("");
  const[personResponsibleId,setPersonResponsibleId] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
 
  

  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    content: "",
  });

  const defaultParams = useMemo(
    () => ({
      pageNumber: page,
      pageSize: pageSize,
      searchTerm: searchText,
      sortField: sortField,
      sortOrder: sortOrder,
    }),
    [page, pageSize, sortOrder, sortField, search]
  );
  let profiles = JSON.parse(sessionStorage.getItem("profileData"));
  const defaultInitialValues = {
    description: sowData ? sowData.description: "",
    sowNo:sowData ? sowData.sowNo: "",
    customerId:"",
    personResponsibleId: sowData ? sowData.personResponsibleId: "",
    jobTypeId:  sowData ? sowData.jobTypeId: "",
    projectManagerId: sowData ? sowData.projectManagerId: "",
    blockedId:  sowData ? sowData.blockedId: "",
    sowStatusId: sowData ? sowData.sowStatusId: "",
    projectPostingGroupId:  sowData ? sowData.projectPostingGroupId: "",
    locationId:  sowData ? sowData.locationId: "",
    startingDate:  sowData ? sowData.startingDate: "",
    endingDate:  sowData ? sowData.endingDate: "",
    creationDate:  sowData ? sowData.creationDate: "",
    currencyId: sowData ? sowData.currencyId: "",
    invoiceCurrencyId:  sowData ? sowData.invoiceCurrencyId: "",
    exchCalculationCostId:  sowData ? sowData.exchCalculationCostId: "",
    exchCalculationPriceId:  sowData ? sowData.exchCalculationPriceId: "",
    lastModifiedDateTime: sowData ? sowData.lastModifiedDateTime: "",
    createdBy:profiles.displayName
  };

  useEffect(()=>{
    
    const fetchResources = async () => {
      try {
        const resources = await getMetaDataResources();
        setPersonResponsibles(resources);
        setSalespersons(resources)
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchLookUpType = async () => {
      try {
        const jobTypes = await getMetaDataJobType('Job_Type');
        const sowStatus = await getMetaDataJobType('SOW_Status');
        const sowBlocked = await getMetaDataJobType('Blocked');
        const exchCalculation = await getMetaDataJobType('Exch_Calculation');

        setExchCalculationCosts(exchCalculation);
        setExchCalculationPrices(exchCalculation);
        setJobType(jobTypes);
        setSowBlocked(sowBlocked)
        setsowStatus(sowStatus)
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    const fetchProjectPosting = async () => {
      try {
        const projectPostings = await getMetaDataProjectPosting();
        setProjectPostings(projectPostings)
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
    const fetchCurrencies = async () => {
      try {
        const currencies = await getMetaDataCurrencies();
        setCurrencyCodes(currencies);
        setInvoiceCurrencyCodes(currencies);
      } catch (error) {
        console.error("Error fetching Currencies:", error);
      }
    };
    const fetchCustomerDetails = async () => {
      try {
        const customers = await getClients({sortOrder:'asc'});
        setFilteredCustomerDetails(customers.data)

        // Update Customer name number based on selected customer code
        const selectedCustomer = customers.data.find(
          (customer) => customer.id == id
        );
        if (selectedCustomer) {
          setCustomerNo(selectedCustomer.customerNo);
          setCustomerName(selectedCustomer.id);
          setClientName(selectedCustomer.name)
        } else {
          setCustomerNo('');
          setCustomerName();
        }
      } catch (error) {
        console.error("Error fetching Currencies:", error);
      }
    }
    fetchCurrencies()
    fetchLocations();
    fetchProjectPosting();
    fetchLookUpType();
    fetchResources();
    fetchCustomerDetails();
  
  },[]);

  const breadcrumbs = [
    { label: "Client management", href: "/customers" },
    { label: clientName, href: `/customers/${customerName}` },
    { label: "SOW", href: "/" },
  ];

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value); // Update pageSize state
    setPage(1); // Reset to first page when page size changes
  };


  const removeNullFields = obj => 
    Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== null && value !== "") acc[key] = value;
      return acc;
  }, {});

  const convertToDate = (dateString) => {
    // Create a Date object from the string
    const date = new Date(dateString);
    return isNaN(date) || date.getTime() === new Date('1970-01-01T00:00:00Z').getTime() ? "" : formatDate(date); // Return null if the date is invalid
  };
   // Format the date to mm/dd/yyyy
   const formatDate = (date) => {
    return date ? format(date, 'MM/dd/yyyy') : '';
  };

  const shouldDisableEndingDate = (date) => {

    //const stDate = new Date(startingDate || (sowData?.startingDate || null));
    const endDate = new Date(endingDate || (sowData?.endingDate || null));
    console.log("endDate",endDate);
    console.log("date",date);

    // Set the range here (for example, you want to disable dates between startingDate and endingDate)
    return date <= endDate 
};



// const handleFieldChange = (event) => {
//   // Handle field change logic
//   onChange(); // Mark as having unsaved changes
// };

  const formFields = [ {
    Default: [
      {
        name: "description",
        label: "Description*",
        type: "text",
        value:description,
        onChange:(e) => {
          setDescription(e.target.value);
          //handleChange(e);
          //handleFieldChange(); // Track changes
        }
      },
      {
        name: "sowNo",
        label: "Sow No",
        type: "text",
        value:sowData ? sowData.sowNo:"",
        disabled: true,
      },
      {
        name: "customerId",
        label: "Customer Name*",
        type: "select",
        value: customerName,
        options: filteredCustomerDetails.map((custName) => ({
          label: custName.name,
          value: custName.id,
        })),
        disabled: true,
        onChange:(e) => {
            setCustomerName(e.target.value);
        }
      },
      {
        name: "customerNumber",
        label: "Customer No",
        type: "select",
        value: customerNo,
        options: filteredCustomerDetails.map((custNo) => ({
          label: custNo.customerNo,
          value: custNo.customerNo, 
        })),
        disabled: true,
        onChange:(e) => {
          setCustomerNo(e.target.value);
        }
      },
      {
        name: "personResponsibleId",
        label: "Person Responsible",
        type: "select",
        value:personResponsibleId,
        onChange:(e) => {
          setPersonResponsibleId(e.target.value);
        },
        options: personResponsibles.map((personResponsible) => ({
          label: personResponsible.resourceName,
          value: personResponsible.id,
        }))
      },
      {
        name: "jobTypeId",
        label: "Job Type",
        type: "select",
        value:jobTypeId,
        onChange:(e) => {
          setJobTypeId(e.target.value);
        },
        options: jobType.map((type) => ({
           label: type.description, 
           value: type.id 
        }))
      },
      {
        name: "projectManagerId",
        label: "Project Manager",
        type: "select",
        value:projectManagerId,
        onChange:(e) => {
          setProjectManagerId(e.target.value);
        },
        options: projectManagers.map((projectManager) => ({
          label: projectManager.resourceName,
          value: projectManager.id,
        }))
      },
      {
        name: "blockedId",
        label: "Blocked",
        type: "select",
        value:blockedId,
        onChange:(e) => {
          setBlockedId(e.target.value);
        },
        options: sowBlocked.map((blocked) => ({
          label: blocked.description,
          value: blocked.id,
        }))
      }
    ],
    postingCard: [
      {
        name: "sowStatusId",
        label: "SOW Status",
        type: "select",
        value:sowStatusId,
        onChange:(e) => {
          setSowStatusId(e.target.value);
        },
        options: sowStatus.map((status) => ({
          label: status.description,
          value: status.id,
        }))
      },
      {
        name: "projectPostingGroupId",
        label: "Project Posting",
        type: "select",
        value:projectPostingGroupId,
        onChange:(e) => {
          setProjectPostingGroupId(e.target.value);
        },
        options: projectPostings.map((projectPosting) => ({
          label: projectPosting.description,
          value: projectPosting.id,
        }))
      },
      {
        name: "locationId",
        label: "Location Code",
        type: "select",
        value:locationId,
        onChange:(e) => {
          setLocationId(e.target.value);
        },
        options: locationCodes.map((locationCode) => ({
          label: locationCode.name,
          value: locationCode.id,
        }))
      },

    ],
    durationCard: [
      {
        name: "startingDate",
        label: "Starting Date",
        type: "date",
        value:startingDate || (sowData?.startingDate || null),
        onChange:(e) => {
          const etDate = endingDate || (sowData?.endingDate || null);
          if(new Date(etDate) > new Date(e) || (etDate === undefined || etDate === null)){
            setStartingDate(convertToDate(e));
          }
        },
      },
      {
        name: "endingDate",
        label: "Ending Date",
        type: "date",
        value:endingDate || (sowData?.endingDate || null),
        onChange:(e) => {
          const stDate = startingDate || (sowData?.startingDate || null);
          console.log(new Date(stDate))
          console.log("e",new Date(e))
          if(new Date(e) > new Date(stDate)){
            setEndingDate(convertToDate(e));
          }
          
        },
        
      },
    ],
    foreignCard: [
      {
        name: "currencyId",
        label: "Currency Code",
        type: "select",
        value:currencyId,
        onChange:(e) => {
          setCurrencyId(e.target.value);
        },
        options: currencyCodes.map((currencyCode) => ({
          label: currencyCode.description,
          value: currencyCode.id,
        }))
      },
      {
        name: "invoiceCurrencyId",
        label: "Invoice Currency Code",
        type: "select",
        value:invoiceCurrencyId,
        onChange:(e) => {
          setInvoiceCurrencyId(e.target.value);
        },
        options: invoiceCurrencyCodes.map((invoiceCurrencyCode) => ({
          label: invoiceCurrencyCode.description,
          value: invoiceCurrencyCode.id,
        }))
      },
      {
        name: "exchCalculationCostId",
        label: "Exch. Calculation(Cost)",
        type: "select",
        value:exchCalculationCostId,
        onChange:(e) => {
          setExchCalculationCostId(e.target.value);
        },
        options: exchCalculationCosts.map((exchCalculationCost) => ({
          label: exchCalculationCost.description,
          value: exchCalculationCost.id,
        }))
      },
      {
        name: "exchCalculationPriceId",
        label: "Exch. Calculation(Price)",
        type: "select",
        value:exchCalculationPriceId,
        onChange:(e) => {
          setExchCalculationPriceId(e.target.value);
        },
        options: exchCalculationPrices.map((exchCalculationPrice) => ({
          label: exchCalculationPrice.description,
          value: exchCalculationPrice.id,
        }))
      },
    ]
  }
  ];
  
  const { clientDetail, loading, error } = useClientDetail(id);
  const { sowList } = useSow(id, defaultParams, reload);

  const handleSort = (columnId) => {
    const isAsc = sortField === columnId && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(columnId);
  };

  const handleEditClick = (row) => {
    setIsEditMode(true);
    setSowData(row);
    setOpen(true);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (sowList?.data?.length) {
      setTotalPages(Math.ceil(sowList.totalRecords / defaultParams.pageSize));
    }
  }, [sowList]);

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
    setSowData(null);
    setOpen(true);
  };

  const handleClose = (code) => {
    setSowData(null);
    setDescription("");
    setJobTypeId("");
    setProjectManagerId("");
    setBlockedId("");
    setSowStatusId("");
    setProjectPostingGroupId("");
    setLocationId("");
    setStartingDate("");
    setEndingDate("");
    setLastModifiedDateTime("");
    setCurrencyId("");
    setInvoiceCurrencyId("");
    setExchCalculationCostId("");
    setExchCalculationPriceId("");
    setPersonResponsibleId("");
    if (code === "201") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "New Sow added successfully.",
      });
    }
    if (code === "202") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "Sow updated successfully.",
      });
    }
    setOpen(false);
    
  };

  const handleSubmit = async (values) => {
    try {
      let {customerNumber, customerId} = values;
      if(customerNumber == "") {
        values.customerNumber = customerNo;
      }
      if(customerId == "") {
        values.customerId = customerName;
      }
      let filteNullValues = removeNullFields(values);
      if(sowData && sowData.id && id){
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

        await updateSow(id,sowData.id,changedValues);
        handleClose("202");
      } else {
        await addSow(id, filteNullValues);
        handleClose("201");
      }
    } catch (error) {
      console.error(error);
    }
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

const handleFormChange = (changedValues) => {
  //setFormValues((prev) => ({ ...prev, ...changedValues }));
  setHasUnsavedChanges(true); // Mark that there are unsaved changes
};

const handleCancelClose = () => {
  setShowConfirmation(false);
};


  if (loading) return <Spinner />;
  //if (error) return <p>Error loading data.</p>;

  // Function to convert SOW data into CSV and trigger download
  const downloadRecords = () => {
    const clientId = id;
    downloadSOWRecords(clientId);
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
                Add SOW
              </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
              <FormAccordionComponent
                initialValues={defaultInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                formFields={formFields}
                onClose={handleClose}
                title={sowData ? "Edit SOW" : "Add SOW"}
                submitButtonLabel={"Save"}
                cancelButtonLabel={"Cancel"}
                onChange={handleFormChange} // Call this prop when the form changes
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
            <CustomAccordion title="Client Details" defaultExpanded={true}>
              <CardDetails details={clientDetails(clientDetail)} />
            </CustomAccordion>
            <CustomAccordion title="SOW List" defaultExpanded={true} >
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
                  <Box sx={{ width: "100%", paddingTop: "0px !important", marginTop: "0px !important", }}>
                    <Box sx={{ width: "300px", float: "left", paddingTop: "0px !important", marginTop: "0px !important", }}>
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
                          disabled={sowList && sowList.data && sowList.data.length === 0}
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
              
                {sowList && sowList.data && sowList.data.length > 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "0px",
                  }}
                >
                  <GridComponent
                    columns={sowColumns}
                    data={sowList?.data || []}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    onActionClick={handleEditClick}
                    basePath="/customers"
                    clientId={id}
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


export default Sow;
