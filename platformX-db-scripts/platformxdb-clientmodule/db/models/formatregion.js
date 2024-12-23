'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const client = require('./client');

const formatRegion = sequelize.define('format_region',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING(100)
  },
  language: {
    type: Sequelize.STRING(10)
  },
  region: {
    type: Sequelize.STRING(20),
    unique:true,
    allowNull:false
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
  modelName:'formatRegion'
});

formatRegion.hasMany(client,{foreignKey:'formatRegionId'});
client.belongsTo(formatRegion,{
  foreignKey:'formatRegionId'
})

module.exports = formatRegion;