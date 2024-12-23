'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('zip_code', 'code', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.changeColumn('zip_code', 'city', {
      type: Sequelize.STRING(30)
    });
    await queryInterface.changeColumn('zip_code', 'countryRegionCode', {
      type: Sequelize.STRING(10)
    });
    await queryInterface.changeColumn('zip_code', 'state', {
      type: Sequelize.STRING(30)
    });
    await queryInterface.changeColumn('zip_code', 'timeZone', {
      type: Sequelize.STRING(180)
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('zip_code', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('zip_code', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('zip_code', 'code', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('zip_code', 'city', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('zip_code', 'countryRegionCode', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('zip_code', 'state', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('zip_code', 'timeZone', {
      type: Sequelize.STRING
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('zip_code', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('zip_code', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  }
};
