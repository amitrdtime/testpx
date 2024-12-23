'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('user', [
      {
        empID:'1',
        firstName:'Admin',
        lastName:'user',
        personalEmail:'amit.deshmukh@innoverdigital.com',
        gender:'F',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('user', {}, {});
  }
};
