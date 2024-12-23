'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('zip_code',[
      {
          "code": "30009",
          "city": "Alpharetta",
          "countryRegionCode": "US",
          "state": "Georgia",
          "timeZone": "",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "code": "30066",
          "city": "MARIETTA",
          "countryRegionCode": "US",
          "state": "Georgia",
          "timeZone": "",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "code": "30067",
          "city": "MARIETTA",
          "countryRegionCode": "US",
          "state": "Georgia",
          "timeZone": "",
          "createdAt": new Date(),
          "updatedAt": new Date()
      },
      {
          "code": "98052",
          "city": "Redmond",
          "countryRegionCode": "US",
          "state": "Washington",
          "timeZone": "",
          "createdAt": new Date(),
          "updatedAt": new Date()
      }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('zip_code', {}, {});
  }
};
