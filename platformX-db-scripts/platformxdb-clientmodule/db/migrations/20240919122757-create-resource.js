'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resourceNo: {
        type: Sequelize.STRING(20)
      },
      resourceType: {
        type: Sequelize.STRING(20) // Maps to VARCHAR
      },
      resourceName: {
        type: Sequelize.STRING(100) // Maps to VARCHAR
      },
      resourceEmailID: {
        type: Sequelize.STRING(100) // Maps to VARCHAR
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resource');
  }
};