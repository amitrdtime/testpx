'use strict';
const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const sow = require('./sow');
const project = require('./project');

const client = sequelize.define('client', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  customerNo: {
    type: Sequelize.STRING(100),
    unique: true
  },
  name: {
    type: Sequelize.STRING(100)
  },
  address: {
    type: Sequelize.STRING(150)
  },
  address2: {
    type: Sequelize.STRING(150)
  },
  countryRegionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'countryRegion',
      key: 'id'
    }
  },
  city: {
    type: Sequelize.STRING(30)
  },
  state: {
    type: Sequelize.STRING(30)
  },
  zipCode: {
    type: Sequelize.STRING(20)
  },
  phoneNo: {
    type: Sequelize.STRING(20)
  },
  mobilePhoneNo: {
    type: Sequelize.STRING(20)
  },
  email: {
    type: Sequelize.STRING(100)
  },
  faxNo: {
    type: Sequelize.STRING(20)
  },
  website: {
    type: Sequelize.STRING(100)
  },
  languageId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'language',
      key: 'id'
    }
  },
  formatRegionId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'formatRegion',
      key: 'id'
    }
  },
  contactId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'contact',
      key: 'id'
    }
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
    defaultValue: Sequelize.NOW // Set default to current date

  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW // Set default to current date
  }
}, {
  freezeTableName: true,
  modelName: 'client'
});

client.hasMany(sow, { foreignKey: 'customerId', as: 'client' });
sow.belongsTo(client, { foreignKey: 'customerId', as: 'client' })

client.hasMany(project, { foreignKey: 'customerId' });
project.belongsTo(client, {
  foreignKey: 'customerId'
})

module.exports = client;