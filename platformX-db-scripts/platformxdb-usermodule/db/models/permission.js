'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const user = sequelize.define('permission',
{
    permissionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    permissionName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    module: {
        type: Sequelize.STRING,
        allowNull: true
      },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    modifiedBy: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('now')
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: null
    }
  },
  {
    freezeTableName: true,
    modelName:'permission'
  });

  module.exports = permission;