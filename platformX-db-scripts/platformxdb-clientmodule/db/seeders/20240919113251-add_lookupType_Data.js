'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('lookupType', [ {
      "type": "Job_Type",
      "value": "Fixed Bid",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Job_Type",
      "value": "Time and Material",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Job_Type",
      "value": "Internal",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "SOW_Status",
      "value": "Planning",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "SOW_Status",
      "value": "Quote",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "SOW_Status",
      "value": "Open",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "SOW_Status",
      "value": "Completed",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Exch_Calculation",
      "value": "Fixed FCY",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Exch_Calculation",
      "value": "Fixed $",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Blocked",
      "value": "Postng",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Blocked",
      "value": "All",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Type",
      "value": "Resource",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    },
    {
      "type": "Type",
      "value": "Item",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    }     ,
    {
      "type": "Type",
      "value": "G/L Account",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    } ,
    {
      "type": "Type",
      "value": "Text",
      "description": "",
      "createdBy": "",
      "createdAt": new Date,
      "modifiedBy": "",
      "updatedAt": new Date
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('lookupType', {}, {});
  }
};
