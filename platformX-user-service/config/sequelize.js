// sequelize.js
import { Sequelize } from 'sequelize';

let sequelizeInstance = null;

const getSequelizeInstance = () => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,      
      dialect: 'postgres',  // Or 'mysql', 'sqlite', etc.      
      logging:false,
    });
  }
  return sequelizeInstance;
};

module.exports = getSequelizeInstance;
