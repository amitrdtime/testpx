'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');
const project = require('./project');

const projectPostingGroup= sequelize.define('projectPostingGroup', {
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
  description: {
    type: Sequelize.STRING
  }
},{
  timestamps: false,  // Disable timestamps
  freezeTableName:true,
  modelName:'projectPostingGroup'
});

projectPostingGroup.hasMany(sow,{foreignKey:'projectPostingGroupId'});
sow.belongsTo(projectPostingGroup,{
  foreignKey:'projectPostingGroupId'
})

projectPostingGroup.hasMany(project,{foreignKey:'projectPostingGroupId'});
project.belongsTo(projectPostingGroup,{
  foreignKey:'projectPostingGroupId'
})


module.exports=projectPostingGroup;