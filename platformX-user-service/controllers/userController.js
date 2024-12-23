import userService from '../services/userService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';

// Create a new user
const createUser = async (req, res) => {
  const user = req.body;
  try {
    logger.logger.info("Creating user");
    const newUser = await userService.createUser(user);
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(newUser);
    res.status(201).json(camelcaseConverter.keysToCamelCase(camelCaseResponse));
    logger.logger.info('Create user success!!');
  } catch (err) {
    logger.logger.error(`Create user failed!!..${err}`);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update user by employee Id
const updateUser = async (req, res) => {
  const { empId } = req.params;
  const updatedUser = req.body;
  try {
    logger.logger.info('Updating user');
    const rowCount = await userService.updateUser(empId, updatedUser);
    if (rowCount>0) {
      const camelCaseResponse = camelcaseConverter.keysToCamelCase(updatedUser);
      res.json(camelCaseResponse);
      logger.logger.info('Update user success!!');
    } else {
      res.status(404).json({ error: `User with EmpID ${empId} not found` });
    }
  } catch (err) {
    logger.logger.error(`Error updating user with EmpID ${empId}`, err);
    res.status(500).json({ error: `Error updating user with EmpID ${empId}` });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await userService.getUsers();    
    if (allUsers.length === 0 || allUsers.every(arr => arr.length === 0)) {
      return res.status(404).json({});
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(allUsers);
    res.status(200).json(camelCaseResponse);
  } catch (error) {
    console.error('Error in getting all users', err);
    res.status(500).json({ error: 'Error in getting all users' });
  }
};

// Get user by official mail Id
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    logger.logger.info(`User official email : ${email}`);
    const user = await userService.getUserByEmail(email);
    if (!user) {      
      return {};
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(user);
    res.status(200).json(camelCaseResponse);
  } catch (error) {
    logger.logger.error(`getUserByEmail-API error  : ${error}`);           
  }
};

const deleteUser = (req, res) => {
  const userIndex = users.findIndex(u => u.email === req.params.email);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
};

const getRoles = async (req, res) => {
  try {
    const allRoles = await userService.getUserRoles();
    if (!allRoles) {
      return res.status(404).json({});
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(allRoles);
    res.status(200).json(camelCaseResponse);
  } catch (error) {
    logger.logger.error(`getRoles-API error  : ${error}`);    
    res.status(500).json({ error: 'Error in getting all roles' });
  }
};


// Update user by employee Id
const updateRoleToUser = async (req, res) => {
  const updatedUser = req.body;
  try {
    const user = await userService.updateRoleToUser(updatedUser);
    if (user) {
      const camelCaseResponse = camelcaseConverter.keysToCamelCase(user);
      res.json(camelCaseResponse);
    } else {
      res.status(404).json({ error: `User with Email ${updatedUser.email} not found` });
    }
  } catch (err) {
    logger.logger.error(`Error updating user with Email ${updatedUser.email} : ${err}`);
    res.status(500).json({ error: `Error updating user with Email ${updatedUser.email}` });
  }
};

export default {
  createUser,
  updateUser,
  getUsers,
  getUserByEmail,
  deleteUser,
  getRoles,
  updateRoleToUser
};





