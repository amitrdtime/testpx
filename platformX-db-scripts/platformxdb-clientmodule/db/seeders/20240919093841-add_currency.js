'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('currency', [
      {
       "code": "CAD",
       "description": "Canadian dollar",
       "isoCode": "CAD",
       "isoNumericCode": "",
       "symbol": "$"     
      }, 
      {
        "code": "EUR",
        "description": "Euro",
        "isoCode": "EUR",
        "isoNumericCode": "978",
        "symbol": "€"     
       }, 
       {
        "code": "MXN",
        "description": "Mexican peso",
        "isoCode": "MXN",
        "isoNumericCode": "484",
        "symbol": "$"     
       }, 
       {
        "code": "USD",
        "description": "US dollar",
        "isoCode": "USD",
        "isoNumericCode": "",
        "symbol": "$"     
       }         
     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('currency', {}, {});
  }
};
