'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const project = require('./project');

const wipMethod = sequelize.define('wipMethod', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING(20),
    unique: true,
  },
  description: {
    type: Sequelize.STRING(100) 
  },
  recognizedCosts: {
    type: Sequelize.STRING(50)
  },
  recognizedSales: {
    type: Sequelize.STRING(50)
  },
  wipCost: {
    type: Sequelize.BOOLEAN
  },
  wipSales: {
    type: Sequelize.BOOLEAN
  },
  valid: {
    type: Sequelize.BOOLEAN
  },
  systemDefined: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  createdBy: {
    allowNull: false,
    type: Sequelize.STRING(50)
  },
  modifiedBy: {
    allowNull: false,
    type: Sequelize.STRING(50)
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  freezeTableName: true,
  modelName: 'wipMethod'
});

wipMethod.hasMany(project, { foreignKey: 'wipMethodId' });
project.belongsTo(wipMethod, {
  foreignKey: 'wipMethodId'
})

module.exports = wipMethod;