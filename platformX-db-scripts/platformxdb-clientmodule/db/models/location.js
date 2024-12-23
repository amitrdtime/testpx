'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');
const project = require('./project');

const location =sequelize.define('location',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING
  }
},{
  timestamps: false,  // Disable timestamps
  freezeTableName:true,
  modelName:'location'
});

location.hasMany(sow,{foreignKey:'locationId'});
sow.belongsTo(location,{
  foreignKey:'locationId'
})

location.hasMany(project,{foreignKey:'locationId'});
project.belongsTo(location,{
  foreignKey:'locationId'
})

module.exports=location;