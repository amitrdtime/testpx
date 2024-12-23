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
    await queryInterface.changeColumn('language', 'code', {
      type: Sequelize.STRING(10), // Set length to 100
      unique:true
    });
    await queryInterface.changeColumn('language', 'name', {
      type: Sequelize.STRING(50) // Set length to 50
    });
    await queryInterface.changeColumn('language', 'windowsLanguageName', {
      type: Sequelize.STRING(80) // Set length to 80
    });
  // Update createdAt column to have a default value
  await queryInterface.changeColumn('language', 'createdAt', {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW, // Set default to current date
  });
  // Update createdAt column to have a default value
  await queryInterface.changeColumn('language', 'updatedAt', {
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
     
    await queryInterface.changeColumn('language', 'code', {
      type: Sequelize.STRING, 
      unique:true
    });
    await queryInterface.changeColumn('language', 'name', {
      type: Sequelize.STRING
    });
    await queryInterface.changeColumn('language', 'windowsLanguageName', {
      type: Sequelize.STRING 
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('language', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('language', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
  }
};
