'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const project =sequelize.define('project', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  customerId: {
    type: Sequelize.INTEGER,
    references:{
      model:'client',
      key:'id'
    }
  },
  sowId: {
    type: Sequelize.INTEGER,
    references:{
      model:'sow',
      key:'id'
    }
  },
  projectNo: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,  // Make sure the project number is unique
  },
  description: {
    type: Sequelize.STRING(100)
  },
  projectPostingGroupId: {
    type: Sequelize.INTEGER,
    references:{
      model:'projectPostingGroup',
      key:'id'
    }
  },
  wipMethodId: {
    type: Sequelize.INTEGER,
    references:{
      model:'wipMethod',
      key:'id'
    }
  },
  locationId: {
    type: Sequelize.INTEGER,
    references:{
      model:'location',
      key:'id'
    }
  },
  projectCreatedDate: {
    type: Sequelize.DATE
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  createdBy: {
    type: Sequelize.STRING(50)
  },
  modifiedBy: {
    type: Sequelize.STRING(50)
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},{
  freezeTableName:true,
  modelName:'project'
});

module.exports=project;