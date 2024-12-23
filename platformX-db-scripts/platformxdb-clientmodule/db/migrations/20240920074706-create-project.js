'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('project', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER
      },
      sowId: {
        type: Sequelize.INTEGER
      },
      projectNo: {
        type: Sequelize.STRING(20)
      },
      description: {
        type: Sequelize.STRING(100)
      },
      projectPostingGroupId: {
        type: Sequelize.INTEGER
      },
      wipMethodId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      projectCreatedDate: {
        type: Sequelize.DATE
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      createdBy: {
        type: Sequelize.STRING(50)
      },
      modifiedBy: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('project');
  }
};