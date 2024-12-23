'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const client = require('./client');

const language = sequelize.define('language',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  code: {
    type: Sequelize.STRING(10),
    unique:true,
    allowNull:false
  },
  name: {
    type: Sequelize.STRING(50)
  },
  windowsLanguageId: {
    type: Sequelize.STRING
  },
  windowsLanguageName: {
    type: Sequelize.STRING(80)
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
  modelName:'language'
});

language.hasMany(client,{foreignKey:'languageId'});
client.belongsTo(language,{
  foreignKey:'languageId'
})

module.exports = language;