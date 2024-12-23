'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contact', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      contactBusinessRelation: {
        type: Sequelize.STRING
      },
      phoneNo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      salesPersonCode: {
        type: Sequelize.STRING
      },
      territoryCode: {
        type: Sequelize.STRING
      },
      coupledToDatavesrse: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('contact');
  }
};