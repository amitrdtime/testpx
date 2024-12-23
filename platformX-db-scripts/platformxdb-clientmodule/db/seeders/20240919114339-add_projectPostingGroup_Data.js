'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projectPostingGroup', [
      {
       "code": "FIXBIDJOBPOSTING",
       "description": "Fix Bid Job Posting"           
      }, 
      {
        "code": "INTERNALJOBPOSTING",
        "description": "Internal Job Posting"
       }, 
       {
        "code": "T&MJOBPOSTING",
        "description": "T&M Job Posting"
       }     
     ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('projectPostingGroup', {}, {});
  }
};
