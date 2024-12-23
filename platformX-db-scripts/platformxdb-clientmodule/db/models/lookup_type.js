'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');

const lookupType = sequelize.define('lookupType', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.STRING
  },
  modifiedBy: {
    type: Sequelize.STRING
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
}, {
  freezeTableName: true,
  modelName: 'lookupType'
});

lookupType.hasMany(sow, { foreignKey: 'jobTypeId', as: 'jobType'  });
sow.belongsTo(lookupType, {  foreignKey: 'jobTypeId', as: 'jobType' 
})

lookupType.hasMany(sow, { foreignKey: 'sowStatusId' , as: 'sowStatus' });
sow.belongsTo(lookupType, {  foreignKey: 'sowStatusId', as: 'sowStatus' 
})

lookupType.hasMany(sow, { foreignKey: 'exchCalculationCostId', as: 'exchCalculationCost'  });
sow.belongsTo(lookupType, {  foreignKey: 'exchCalculationCostId', as: 'exchCalculationCost' 
})

lookupType.hasMany(sow, { foreignKey: 'exchCalculationPriceId', as: 'exchCalculationPrice'  });
sow.belongsTo(lookupType, {  foreignKey: 'exchCalculationPriceId', as: 'exchCalculationPrice' 
})

lookupType.hasMany(sow, { foreignKey: 'blockedId', as: 'blocked'  });
sow.belongsTo(lookupType, {  foreignKey: 'blockedId', as: 'blocked' 
})

module.exports = lookupType;
