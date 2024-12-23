import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TableSortLabel,
  Button,
} from "@mui/material";
import { FaPen } from "react-icons/fa";
import TooltipLink from "./tooltipLink";

const GridComponent = React.memo(
  ({ columns, data, basePath, onActionClick }) => {
   
    // State to manage sorting only for the displayName column
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortField, setSortField] = React.useState('displayName');

    // Function to handle sorting for displayName column
    const handleSort = (columnId) => {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      setSortField(columnId);
    };

    // Memoized sorted data, sorting only by displayName column
    const sortedData = useMemo(() => {
    
      return [...data].sort((a, b) => {
        const aValue = a[sortField] || "";
        const bValue = b[sortField] || "";
       
        return sortOrder === "asc"
          ? aValue.toString().localeCompare(bValue.toString())
          : bValue.toString().localeCompare(aValue.toString());
      });
    }, [data, sortOrder, sortField]);

    const formatDate = (utcDate) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const isValidDate = typeof utcDate === 'string' && utcDate.includes('T') && utcDate.includes(':');

      let localDateString = '';
    
      if (isValidDate) {
        // Convert the UTC date string to a Date object
        const date = new Date(utcDate);
        
        // Format the date to the user's local time
        localDateString = date.toLocaleString(undefined, options); // Customize if needed
      } else {
        localDateString = utcDate;
      }
      return localDateString;
    };

    

    const getColumnContent = (column, row) => {
      const value = row[column.id];

      switch (column.id) {
        case "name":
        case "customer_Name":
        case "projectTaskNo":
          return (
            <TooltipLink
              to={`${basePath}/${row.id || row.sowNo}`}
              title={value}
            >
              {value}
            </TooltipLink>
          );

        case "action":
          return (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                textTransform: "none",
                fontWeight: "bold",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  boxShadow: 4,
                  border: "none",
                },
              }}
              onClick={() => onActionClick(row)}
            >
              <FaPen style={{ marginRight: 10 }} />
              Edit
            </Button>
          );
        default:
          return (
            <Tooltip title={value} arrow placement="top">
              <span>{formatDate(value)}</span>
            </Tooltip>
          );
      }
    };
    

    return (
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead >
            <TableRow sx={{
              "& th": {
                fontSize: "0.75rem",
                color: "#fff",
                backgroundColor: "#5fc0d2",
                padding: "13px",
                fontFamily: "Source Sans Pro,sans-serif"
              }
            }} >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sortDirection={sortField === column.id ? sortOrder : false}
                  sx={{ minWidth: 170 }}
                >
              
                    <TableSortLabel
                      active={true}
                      direction={sortField === column.id ? sortOrder : "asc"}
                      onClick={() => handleSort(column.id)}
                      style={{ fontWeight: 'bold', color: 'inherit' }} // Make font bold
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: 'white !important',
                          display: column.id === "action" ? "none" : "block"
                        },
                      }}
                    >
                      {column.label || "N/A"}
                    </TableSortLabel>
                  
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f0f4f5",
                  fontSize: "0.75rem",
                  color: "inherit",
                  padding: "13px",
                  fontFamily: "Source Sans Pro,sans-serif"
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={
                      column.id === "action"
                        ? {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }
                        : {}
                    }
                  >
                    {getColumnContent(column, row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

GridComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string,
      align: PropTypes.oneOf(["left", "center", "right"]),
      sortable: PropTypes.bool,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.object // More flexible, accepts any shape of objects in the array
  ).isRequired,
  onActionClick: PropTypes.func.isRequired,
  basePath: PropTypes.string,
};

export default GridComponent;
