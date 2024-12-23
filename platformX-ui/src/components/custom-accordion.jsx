import React, { useState, useCallback } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = React.memo(({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = useCallback((event, expanded) => {
    setIsExpanded(expanded);
  }, []);

  return (
    <Accordion defaultExpanded={defaultExpanded} onChange={handleToggle} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title.toLowerCase().replace(/\s+/g, "-")}-content`}
        id={`${title.toLowerCase().replace(/\s+/g, "-")}-header`}
        sx={{ minHeight: "50px !important" }}
      >
        <Typography variant="h3" className="" >
          {title}
        </Typography>
      </AccordionSummary>
      {isExpanded && (
        <AccordionDetails>
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
});

export default CustomAccordion;