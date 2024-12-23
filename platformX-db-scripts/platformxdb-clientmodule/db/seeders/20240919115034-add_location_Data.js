'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('location', [
      { "code": "AB", "name": "ALBERTA" },
      { "code": "AE", "name": "Sharjah" },
      { "code": "AL", "name": "Alabama" },
      { "code": "AR", "name": "Arkansas" },
      { "code": "AZ", "name": "Arizona" },
      { "code": "CA", "name": "California" },
      { "code": "CO", "name": "Colorado" },
      { "code": "CT", "name": "Connecticut" },
      { "code": "DA", "name": "Delaware" },
      { "code": "DUBAI", "name": "Dubai" },
      { "code": "FL", "name": "Florida" },
      { "code": "GA", "name": "Georgia" },
      { "code": "HU", "name": "Hungary" },
      { "code": "ID", "name": "Idaho" },
      { "code": "IL", "name": "Illinois" },
      { "code": "IN", "name": "Indiana" },
      { "code": "KOLKATA", "name": "Kolkata" },
      { "code": "KS", "name": "Kansas" },
      { "code": "KY", "name": "Kentucky" },
      { "code": "MA", "name": "Massachusetts" },
      { "code": "MD", "name": "Maryland" },
      { "code": "MI", "name": "Michigan" },
      { "code": "MN", "name": "Minnesota" },
      { "code": "MO", "name": "Missouri" },
      { "code": "MR", "name": "Morelos" },
      { "code": "NC", "name": "North Carolina" },
      { "code": "NE", "name": "Nebraska" },
      { "code": "NJ", "name": "New Jersey" },
      { "code": "NOIDA", "name": "NOIDA" },
      { "code": "NY", "name": "New York" },
      { "code": "OH", "name": "Ohio" },
      { "code": "ON", "name": "ontario" },
      { "code": "OR", "name": "OREGON" },
      { "code": "PA", "name": "Pennsylvania" },
      { "code": "QC", "name": "quebec" },
      { "code": "TX", "name": "Texas" },
      { "code": "VA", "name": "Virginia" },
      { "code": "WA", "name": "Washington" },
      { "code": "WI", "name": "Wisconsin" }
     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('location', {}, {});
  }
};
