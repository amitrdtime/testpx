'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const client = require('./client');

const countryRegion = sequelize.define('country_region',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING(10),
    unique:true,
    allowNull:false
  },
  name: {
    type: Sequelize.STRING(50)
  },
  isoCode: {
    type: Sequelize.STRING(2)
  },
  isoNumericCode: {
    type: Sequelize.STRING(3)
  },
  addressFormat: {
    type: Sequelize.STRING(100)
  },
  contactAddressFormat: {
    type: Sequelize.STRING(100)
  },
  stateName: {
    type: Sequelize.STRING(50)
  },
  taxScheme: {
    type: Sequelize.STRING(50)
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
  modelName:'countryRegion'
});

countryRegion.hasMany(client,{foreignKey:'countryRegionId', as: 'countryRegion'});
client.belongsTo(countryRegion,{
  foreignKey:'countryRegionId', as: 'countryRegion'
});

module.exports = countryRegion;