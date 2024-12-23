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
    await queryInterface.addColumn('language', 'code', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('language', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('language', 'windowsLanguageId', {
      type: Sequelize.STRING,
      allowNull: false
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('language', 'code');
    await queryInterface.removeColumn('language', 'name');
    await queryInterface.removeColumn('language', 'windowsLanguageId');
  }
};
