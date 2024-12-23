'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('currency', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      isoCode: {
        type: Sequelize.STRING
      },
      isoNumericCode: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      }    
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('currency');
  }
};