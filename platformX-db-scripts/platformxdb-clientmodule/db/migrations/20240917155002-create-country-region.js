'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('country_region', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      isoCode: {
        type: Sequelize.STRING
      },
      isoNumericCode: {
        type: Sequelize.STRING
      },
      addressFormat: {
        type: Sequelize.STRING
      },
      contactAddressFormat: {
        type: Sequelize.STRING
      },
      stateName: {
        type: Sequelize.STRING
      },
      taxScheme: {
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
    await queryInterface.dropTable('country_region');
  }
};