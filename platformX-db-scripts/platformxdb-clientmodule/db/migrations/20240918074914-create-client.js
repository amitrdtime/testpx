'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('client', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerNo: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      address2: {
        type: Sequelize.STRING
      },
      countryRegionId: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      mobilePhoneNo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      faxNo: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      languageId: {
        type: Sequelize.INTEGER
      },
      formatRegionId: {
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER
      },
      contactName: {
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('client');
  }
};