'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const client = require('./client');

const contact = sequelize.define('contact',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  no: {
    type: Sequelize.STRING(20)
  },
  name: {
    type: Sequelize.STRING(100)
  },
  companyName: {
    type: Sequelize.STRING(100)
  },
  contactBusinessRelation: {
    type: Sequelize.STRING(20)
  },
  phoneNo: {
    type: Sequelize.STRING(30)
  },
  email: {
    type: Sequelize.STRING(80)
  },
  salesPersonCode: {
    type: Sequelize.STRING(20)
  },
  territoryCode: {
    type: Sequelize.STRING(10)
  },
  coupledToDatavesrse: {
    type: Sequelize.BOOLEAN
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
  modelName:'contact'
});

contact.hasMany(client,{foreignKey:'contactId'});
client.belongsTo(contact,{
  foreignKey:'contactId'
})

module.exports = contact;