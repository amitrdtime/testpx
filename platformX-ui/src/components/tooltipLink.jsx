import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #0e69b3;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none; /* Optional: remove underline */
&:hover {
    text-decoration: underline; /* Optional: add underline on hover */
  }
`;
const TooltipLink = ({ to, title, children }) => (
    <Tooltip title={title} arrow placement="top">
        <StyledLink to={to} aria-label={title}>
            {children}
        </StyledLink>
    </Tooltip>
);


export default TooltipLink;