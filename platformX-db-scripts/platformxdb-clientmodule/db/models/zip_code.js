'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const zipCode = sequelize.define('zip_code',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING(20)
  },
  city: {
    type: Sequelize.STRING(30)
  },
  countryRegionCode: {
    type: Sequelize.STRING(10)
  },
  state: {
    type: Sequelize.STRING(30)
  },
  timeZone: {
    type: Sequelize.STRING(180)
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW // Set default to current date
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW // Set default to current date
  }
},{
  freezeTableName:true,
  modelName:'zipCode'
});

module.exports = zipCode;