'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sow', {
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
        type: Sequelize.INTEGER
      },
      personResponsibleId: {
        type: Sequelize.INTEGER
      },
      jobTypeId: {
        type: Sequelize.INTEGER
      },
      projectManagerId: {
        type: Sequelize.INTEGER
      },
      sowStatusId: {
        type: Sequelize.INTEGER
      },
      projectPostingGroupId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      currencyId: {
        type: Sequelize.INTEGER
      },
      invoiceCurrencyId: {
        type: Sequelize.INTEGER
      },
      exchCalculationCostId: {
        type: Sequelize.INTEGER
      },
      exchCalculationPriceId: {
        type: Sequelize.INTEGER
      },
      blockedId: {
        type: Sequelize.INTEGER
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sow');
  }
};