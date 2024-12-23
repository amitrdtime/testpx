import userRepository from "../data/repositories/userRepository.js";
import userBcservice from "./businessCentral/userBcService.js";
import logger from '../logging/logger.js';

// Create a new user
const createUser = (user) => {
  logger.logger.info('createUser repository called');
  return userRepository.createUser(user);
};

// Update user by employee Id
const updateUser = (empId, updatedUser) => {
  logger.logger.info('updateUser repository called');
  return userRepository.updateUser(empId, updatedUser);
};

// Get all users
const getUsers = async () => {
  logger.logger.info('getUsers repository called');
  return await userRepository.getUsers();
};

// Get user by official mail Id
const getUserByEmail = async (officialEmail) => {  
  logger.logger.info('getUserByEmail repository called');
  const userInfo = await userRepository.getUserByEmail(officialEmail);
  logger.logger.info('getResource detail from userService->getUserByEmail called');
  const rtimesheetDetail = await userBcservice.getResourceDetail(officialEmail);  
  const userDetailInfo = { ...userInfo, ...rtimesheetDetail };
  return userDetailInfo;
};

const getUserRoles = async () => {
  logger.logger.info('getUserRoles called');
  return userRepository.getRoles();
};

const updateRoleToUser = async (user) => { 
  logger.logger.info('updateRoleToUser called'); 
  return userRepository.updateRoleToUser(user);
};

export default {
  createUser,
  updateUser,
  getUsers,
  getUserByEmail,
  getUserRoles,
  updateRoleToUser,
};
