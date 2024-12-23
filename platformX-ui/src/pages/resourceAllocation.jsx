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

import {useState,useEffect} from 'react';
import CustomAccordion from "../components/custom-accordion";
import CardDetails from "../components/card-details";
import { useParams } from "react-router-dom";
import useProjectDetail from "../hooks/project-detail-hooks";
import { projectDetails } from "../contexts/card-details-config";
import Breadcrumbs from "../components/breadcrumb";
import "../styles/user-style.css";
import {getClients} from "../services/client-service";


const ResourceAllocation = () => {

  const [customerNo, setCustomerNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [clientName, setClientName] = useState("");
  const [filteredCustomerDetails, setFilteredCustomerDetails] = useState([]);

  const {customerId,sowId,projectId} = useParams();
  const { projectDetail} = useProjectDetail(customerId,sowId,projectId);

  useEffect(()=>{
    
   
    const fetchCustomerDetails = async () => {
      try {
        const customers = await getClients({sortOrder:'asc'});
        setFilteredCustomerDetails(customers.data)

        // Update Customer name number based on selected customer code
        const selectedCustomer = customers.data.find(
          (customer) => customer.id == customerId
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
   
    fetchCustomerDetails();
  
  },[]);

  
  const breadcrumbs = [
    { label: "Client management", href: "/customers" },
    { label: "SOW", href: `/customers/${customerId}` },
    { label: "Project", href: `/customers/${customerId}/sows/${sowId}` },
    { label: "Project", href: "/" },
  ];

  return (
    <Box sx={{ margin: "40px" }}>
       <Breadcrumbs breadcrumbs={breadcrumbs} />
      <CustomAccordion title="Project details" defaultExpanded={true}>
        <CardDetails details={projectDetails(projectDetail)} />
      </CustomAccordion>
    </Box>
  );
};

export default ResourceAllocation;
