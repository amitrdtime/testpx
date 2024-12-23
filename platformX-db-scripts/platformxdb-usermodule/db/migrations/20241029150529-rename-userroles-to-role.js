'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('UserRoles', 'role');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('role', 'UserRoles');
  }
};
