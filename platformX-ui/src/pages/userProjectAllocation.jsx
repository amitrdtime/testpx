import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const UserProjectAllocation = ({ userData }) => {
  const projects = userData["0"]?.projects || [];

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="project details table">
        <TableHead>
          <TableRow>
            <TableCell className={`table text-weight`}>Project Name</TableCell>
            <TableCell className={`table text-weight`}>Start Date</TableCell>
            <TableCell className={`table text-weight`}>End Date</TableCell>
            <TableCell className={`table text-weight`}>
              Project Manager
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={index}>
              <TableCell
                className={`table light-text-weight`}
                component="th"
                scope="row"
              >
                {project.projectName}
              </TableCell>
              <TableCell className={`table light-text-weight`}>
                {project.startDate}
              </TableCell>
              <TableCell className={`table light-text-weight`}>
                {project.endDate}
              </TableCell>
              <TableCell className={`table light-text-weight`}>
                {project.projectManager}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserProjectAllocation;
