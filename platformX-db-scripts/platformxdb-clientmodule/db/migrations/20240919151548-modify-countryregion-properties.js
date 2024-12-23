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
    await queryInterface.changeColumn('country_region', 'code', {
      type: Sequelize.STRING(10)
    });
    await queryInterface.changeColumn('country_region', 'name', {
      type: Sequelize.STRING(50)
    });
    await queryInterface.changeColumn('country_region', 'isoCode', {
      type: Sequelize.STRING(2)
    });
    await queryInterface.changeColumn('country_region', 'isoNumericCode', {
      type: Sequelize.STRING(3)
    });
    await queryInterface.changeColumn('country_region', 'addressFormat', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('country_region', 'contactAddressFormat', {
      type: Sequelize.STRING(100)
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('country_region', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('country_region', 'updatedAt', {
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
    await queryInterface.changeColumn('country_region', 'code', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('country_region', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('country_region', 'isoCode', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('country_region', 'isoNumericCode', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('country_region', 'addressFormat', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('country_region', 'contactAddressFormat', {
      type: Sequelize.STRING
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('country_region', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('country_region', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE,
    });
  }
};
