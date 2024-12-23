'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');

const resource = sequelize.define('resource', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  resourceNo: {
    type: Sequelize.STRING(20),
    unique: true,
  },
  resourceType: {
    type: Sequelize.STRING(20) // Maps to VARCHAR
  },
  resourceName: {
    type: Sequelize.STRING(100) // Maps to VARCHAR
  },
  ResourceEmailID: {
    type: Sequelize.STRING(100), // Maps to VARCHAR
    unique:true,
    allowNull:false
  },
  baseUnitOfMeasure: {
    type: Sequelize.STRING(10) // Maps to VARCHAR
  },
  unitCost: {
    type: Sequelize.DECIMAL(10, 2) // Maps to DECIMAL with 10 precision and 2 scale
  },
  priceProfitCalculation: {
    type: Sequelize.DECIMAL(10, 2) // Maps to DECIMAL with 10 precision and 2 scale
  },
  profitPercent: {
    type: Sequelize.DECIMAL(5, 2) // Maps to DECIMAL, suitable for percentages
  },
  unitPrice: {
    type: Sequelize.DECIMAL(10, 2) // Maps to DECIMAL
  },
  vendorNo: {
    type: Sequelize.STRING(20) // Maps to VARCHAR
  },
  vendorName: {
    type: Sequelize.STRING(100) // Maps to VARCHAR
  },
  resourceGroup: {
    type: Sequelize.STRING(20) // Maps to VARCHAR
  },
  resourceGroupCategory: {
    type: Sequelize.STRING(20) // Maps to VARCHAR
  },
  endDate: {
    type: Sequelize.DATE // Maps to Date (no time component)
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  createdBy: {
    allowNull: false,
    type: Sequelize.STRING(100)
  },
  modifiedBy: {
    allowNull: false,
    type: Sequelize.STRING(100)
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  freezeTableName: true,
  modelName: 'resource'
});

// Associations
resource.hasMany(sow, { foreignKey: 'personResponsibleId', as: 'personResponsible' });
sow.belongsTo(resource, { foreignKey: 'personResponsibleId', as: 'personResponsible' });

resource.hasMany(sow, { foreignKey: 'projectManagerId', as: 'projectManager' });
sow.belongsTo(resource, { foreignKey: 'projectManagerId', as: 'projectManager' });


module.exports = resource;