import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ breadcrumbs }) => {
    const navigate = useNavigate();
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null; 
    }
    return (
        <MUIBreadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "20px" }}>
            {breadcrumbs?.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return isLast ? (
                    <Typography color="text.primary" key={breadcrumb.label}>
                        {breadcrumb.label}
                    </Typography>
                ) : (
                    <Link
                        underline="hover"
                        color="inherit"
                        key={breadcrumb.label}
                        onClick={() => navigate(breadcrumb.href)}
                        sx={{ cursor: "pointer" }}
                    >
                        {breadcrumb.label}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};

Breadcrumbs.propTypes = {
    breadcrumbs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Breadcrumbs;