'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('role', 'endDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('role', 'createdBy', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('role', 'modifiedBy', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('role', 'endDate', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn('role', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('role', 'modifiedBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  }
};
