import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Pagination,
  Dialog,
  MenuItem, 
  Select,
  FormControl,
  DialogActions, 
  DialogContent, 
  DialogTitle,
} from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from '@mui/icons-material/Download';
import "../styles/client-style.css";
import useClients from "../hooks/client-hooks.js";
import Spinner from "../components/spinner.jsx";
import ClientForm from "./clientForm.jsx";
import CustomAlert from "../components/alert.jsx";
import GridComponent from "../components/ClientGrid.jsx";
import {
  Search,
  StyledInputBase,
  SearchIconWrapper,
} from "../styles/search-styles";
import { clientColumns } from "../contexts/column-config.js";

import { downloadClientRecords } from "../utils/download-records-helper.js";

const Client = () => {

  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(10);
  const [pageSize, setPageSize] = useState(10); 
  const [sortField, setSortField] = React.useState("createdAt");
  const [sortOrder, setSortOrder] = React.useState("desc");
  const [search, setSearchInput] = React.useState(false); 
  const [searchText, setSearchText] = React.useState("");
  const [clientData, setclientData] = React.useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    severity: "",
    content: "",
  });
  const [flag, setFlag] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const { clients, loading, error } = useClients(defaultParams, reload);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setIsEditMode(false);
    setclientData(null);
    setOpen(true);
  };

  const handleClose = (code) => {
    console.log("code",code);
    setOpen(false);
    if (code === "201") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "New client added successfully.",
      });
    }
    if (code === "202") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "success",
        content: "Client updated successfully.",
      });
    }
    if (code === "401") {
      setReload(!reload);
      setAlert({
        show: true,
        severity: "error",
        content: "Failed to update client details.",
      });
    }
  };

  useEffect(() => {
    if (clients?.data?.length) {
      setTotalPages(Math.ceil(clients.totalRecords / defaultParams.pageSize));
    }
  }, [clients]);

  if (loading) return <Spinner />;
  if (error) return <p>Error loading data.</p>;

  const handleEditClick = (row) => {
    console.log("row",row);
    setIsEditMode(true);
    setclientData(row);
    setOpen(true);
  };

  const handleSort = (columnId) => {
    const isAsc = sortField === columnId && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortField(columnId);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setSearchInput(!search);
    setPage(1);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchInput(!search);
      setPage(1);
    }
  };

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

  // Function to convert Customer data into CSV and trigger download
  const downloadRecords = () => {
    downloadClientRecords();
  };

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
            padding: "0px 20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h1" className={`header-text text-weight`}>
              Client Management
            </Typography>
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
              Add New Client
            </Button>
          </Box>
          

          <Dialog open={open} onClose={handleDialogClose}>
            <ClientForm
              onClose={handleClose}
              initialValues={isEditMode ? clientData : undefined}
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

          <Typography variant="h2" className="sub-heading-style">
            Enable users to efficiently add, update, and manage client
            information.{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              width: "100%",
              marginTop: "40px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box sx={{ width: "300px", float: "left" }}>
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
                  disabled={clients && clients.data && clients.data.length === 0}
                  onClick={downloadRecords}
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
          <Box
            sx={{
              width: "100%",
              marginTop: "40px",
            }}
          >
            <GridComponent
              columns={clientColumns}
              data={clients.data}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              onActionClick={handleEditClick}
              basePath="/customers"
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
        </Grid>
      </Grid>
    </>
  );
};

export default Client;
