'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');

const currency = sequelize.define('currency', {
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
  },
  isoCode: {
    type: Sequelize.STRING
  },
  isoNumericCode: {
    type: Sequelize.STRING
  },
  symbol: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false,  // Disable timestamps
  freezeTableName: true,
  modelName: 'currency'
});

// Associations
currency.hasMany(sow, { foreignKey: 'invoiceCurrencyId', as: 'invoiceCurrency' });
sow.belongsTo(currency, {  foreignKey: 'invoiceCurrencyId', as: 'invoiceCurrency'
})

currency.hasMany(sow, { foreignKey: 'currencyId' , as: 'currency'});
sow.belongsTo(currency, {  foreignKey: 'currencyId', as: 'currency'
})

module.exports = currency;