'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permission', {
      permissionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissionName: {
        unique: true,
        type: Sequelize.STRING(20)
      },
      description: {
        type: Sequelize.STRING(50)
      },
      module: {
        type: Sequelize.STRING(50)
      },
      status: {
        type: Sequelize.STRING(10)
      },
      createdBy: {
        type: Sequelize.STRING(50)
      },
      modifiedBy: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      freezeTableName: true,
      modelName:'permission'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permission');
  }
};