'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wipMethod', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING(20)
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
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING(50)
      },
      modifiedBy: {
        type: Sequelize.STRING(50)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wipMethod');
  }
};