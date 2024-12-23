import User from "../../domain/models/user.js";
import db from "../db.js";
import logger from '../../logging/logger.js';

const schemaName = "public";

// Create a new user
const createUser = async (user) => {
  const {
    EmpID,
    FirstName,
    MiddleName,
    LastName,
    PhoneNumber,
    PersonalEmail,
    Gender,
    DOB,
    BloodGroup,
    Nationality,
    CurrentAddress,
    PermanentAddress,
    SecondaryNumber,
    UserRole,
    Designation,
    OfficialEmail,
    BaseLocation,
    ReportingManager,
    TypeOfEmployee,
    Department,
    WorkingType,
    CreatedBy,
    CreatedDate,
    ModifiedDate,
    ModifiedBy,
  } = user;

  const query = `
        INSERT INTO usr."user" (
          "EmpID",
          "FirstName",
          "MiddleName",
          "LastName",
          "PhoneNumber",
          "PersonalEmail",
          "Gender",
          "DOB",
          "BloodGroup",
          "Nationality",
          "CurrentAddress",
          "PermanentAddress",
          "SecondaryNumber",
          "UserRole",
          "Designation",
          "OfficialEmail",
          "BaseLocation",
          "ReportingManager",
          "TypeOfEmployee",
          "Department",
          "WorkingType",
          "CreatedBy",
          "CreatedDate",
          "ModifiedDate",
          "ModifiedBy"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
        RETURNING *
      `;

  const values = [
    EmpID,
    FirstName,
    MiddleName,
    LastName,
    PhoneNumber,
    PersonalEmail,
    Gender,
    DOB,
    BloodGroup,
    Nationality,
    CurrentAddress,
    PermanentAddress,
    SecondaryNumber,
    UserRole,
    Designation,
    OfficialEmail,
    BaseLocation,
    ReportingManager,
    TypeOfEmployee,
    Department,
    WorkingType,
    CreatedBy,
    CreatedDate,
    ModifiedDate,
    ModifiedBy,
  ];
  logger.logger.info('Adding user into users table');
  const result = await db.query(query, values);
  logger.logger.info('createUser success!!');
  return new User(result.rows[0]);
};

// Update user by employee Id
const updateUser = async (empId, updatedUser) => {
  const query = `
        UPDATE ${schemaName}."user"
        SET 
          "phoneNumber" = '${updatedUser.phoneNumber}',
          "personalEmail" = '${updatedUser.personalEmail}',
          "gender" = '${updatedUser.gender}',
          "dob" = '${updatedUser.dob}',
          "bloodGroup" = '${updatedUser.bloodGroup}',
          "nationality" = '${updatedUser.nationality}',
          "currentAddress" = '${updatedUser.currentAddress}',
          "permanentAddress" = '${updatedUser.permanentAddress}',
          "secondaryNumber" = '${updatedUser.secondaryNumber}',
          "updatedAt" = '${updatedUser.updatedAt}',
          "modifiedBy" = '${updatedUser.modifiedBy}'
        WHERE CAST("empID" AS VARCHAR) = '${empId}'`;

  logger.logger.info('updating user into users table');
  const result = await db.query(query);
  logger.logger.info('updateUser() success!!');
  return result.rowCount;
};
// Get all users
const getUsers = async () => {  
  const query = `SELECT * FROM ${schemaName}."user"`;
  const { rows } = await db.query(query);
  return rows;
};

// Get user by official mail Id
const getUserByEmail = async (officialEmail) => {  
  const query = `SELECT * FROM ${schemaName}."user" where CAST("officialEmail" AS VARCHAR)='${officialEmail}'`;
  logger.logger.info('Fetching user by official email');
  const { rows } = await db.query(query);
  logger.logger.info('getUserByEmail() success!!');
  return rows[0];
};

/*
============ Roles ===========
*/

// Get all roles
const getRoles = async () => {
  const query = `SELECT * FROM ${schemaName}."role"`;
  logger.logger.info('Getting roles from role table');
  const { rows } = await db.query(query);
  logger.logger.info('getRoles() success!!');
  return rows;
};

const updateRoleToUser = async (user) => {
  const query = `UPDATE usr.user SET "RoleId" = $1 WHERE "OfficialEmail" = $2 RETURNING *`;
  const values = [user.roleId, user.email];
  logger.logger.info('Update role to user in user table');
  const result = await db.query(query, values);
  logger.logger.info('UpdateRoleToUser() success!!');
  return result.rows.length > 0 ? new User(result.rows[0]) : null;
};

export default {
  createUser,
  updateUser,
  getUsers,
  getUserByEmail,
  getRoles,
  updateRoleToUser,
};
