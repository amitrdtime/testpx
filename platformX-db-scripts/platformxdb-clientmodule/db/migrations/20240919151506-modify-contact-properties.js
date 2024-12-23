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
    await queryInterface.changeColumn('contact', 'no', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.changeColumn('contact', 'name', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('contact', 'companyName', {
      type: Sequelize.STRING(100)
    });
    await queryInterface.changeColumn('contact', 'contactBusinessRelation', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.changeColumn('contact', 'phoneNo', {
      type: Sequelize.STRING(30)
    });
    await queryInterface.changeColumn('contact', 'email', {
      type: Sequelize.STRING(80)
    });
    await queryInterface.changeColumn('contact', 'salesPersonCode', {
      type: Sequelize.STRING(20)
    });
    await queryInterface.changeColumn('contact', 'territoryCode', {
      type: Sequelize.STRING(20)
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('contact', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('contact', 'updatedAt', {
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
    await queryInterface.changeColumn('contact', 'no', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'companyName', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'contactBusinessRelation', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'phoneNo', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'email', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'salesPersonCode', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('contact', 'territoryCode', {
      type: Sequelize.STRING
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('contact', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('contact', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  }
};
