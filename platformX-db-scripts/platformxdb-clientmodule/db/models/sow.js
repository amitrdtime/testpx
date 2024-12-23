'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const project = require('./project');

const sow =sequelize.define('sow', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  sowNo: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true,  // Make sure the customer number is unique
  },
  description: {
    type: Sequelize.STRING(100)
  },
  customerId: {
    type: Sequelize.INTEGER,
    references:{
      model:'client',
      key:'id'
    }
  },
  personResponsibleId: {
    type: Sequelize.INTEGER,
    references:{
      model:'resource',
      key:'id'
    }
  },
  jobTypeId: {
    type: Sequelize.INTEGER,
    references:{
      model:'lookupType',
      key:'id'
    }
  },
  projectManagerId: {
    type: Sequelize.INTEGER,
    references:{
      model:'resource',
      key:'id'
    }
  },
  sowStatusId: {
    type: Sequelize.INTEGER,
    references:{
      model:'lookupType',
      key:'id'
    }
  },
  projectPostingGroupId: {
    type: Sequelize.INTEGER,
    references:{
      model:'projectPostingGroup',
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
  currencyId: {
    type: Sequelize.INTEGER,
    references:{
      model:'currency',
      key:'id'
    }
  },
  invoiceCurrencyId: {
    type: Sequelize.INTEGER,
    references:{
      model:'currency',
      key:'id'
    }
  },
  exchCalculationCostId: {
    type: Sequelize.INTEGER,
    references:{
      model:'lookupType',
      key:'id'
    }
  },
  exchCalculationPriceId: {
    type: Sequelize.INTEGER,
    references:{
      model:'lookupType',
      key:'id'
    }
  },
  blockedId: {
    type: Sequelize.INTEGER,
    references:{
      model:'lookupType',
      key:'id'
    }
  },
  startingDate: {
    type: Sequelize.DATE
  },
  endingDate: {
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
  modelName:'sow'
});

sow.hasMany(project,{foreignKey:'sowId'});
project.belongsTo(sow,{
  foreignKey:'sowId'
})

module.exports=sow;