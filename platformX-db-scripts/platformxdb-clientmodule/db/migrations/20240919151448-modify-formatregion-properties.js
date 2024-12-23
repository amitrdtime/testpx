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
    await queryInterface.changeColumn('format_region', 'region', {
      type: Sequelize.STRING(20), // Set length to 20
      unique:true
    });
    await queryInterface.changeColumn('format_region', 'name', {
      type: Sequelize.STRING(100) // Set length to 30
    });
    await queryInterface.changeColumn('format_region', 'language', {
      type: Sequelize.STRING(10) // Set length to 10
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('format_region', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('format_region', 'updatedAt', {
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
    await queryInterface.changeColumn('format_region', 'region', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('format_region', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('format_region', 'language', {
      type: Sequelize.STRING
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('format_region', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('format_region', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  }
};
