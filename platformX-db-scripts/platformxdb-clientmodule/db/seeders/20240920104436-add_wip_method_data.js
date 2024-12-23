'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('wipMethod', [
      {
        "code": "COMPLETED CONTRACT",
        "description": "Completed Contract",
        "recognizedCosts": "At Completion",
        "recognizedSales": "At Completion",
        "wipCost": true,
        "wipSales": true,
        "valid": true,
        "systemDefined": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": "COST OF SALES",
        "description": "Cost of Sales",
        "recognizedCosts": "Cost of Sales",
        "recognizedSales": "Contract (Invoiced Price)",
        "wipCost": true,
        "wipSales": true,
        "valid": true,
        "systemDefined": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": "COST VALUE",
        "description": "Cost Value",
        "recognizedCosts": "Cost Value",
        "recognizedSales": "Contract (Invoiced Price)",
        "wipCost": true,
        "wipSales": true,
        "valid": true,
        "systemDefined": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": "POC",
        "description": "Percentage of Completion",
        "recognizedCosts": "Usage (Total Cost)",
        "recognizedSales": "Percentage of Completion",
        "wipCost": true,
        "wipSales": true,
        "valid": true,
        "systemDefined": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "code": "SALES VALUE",
        "description": "Sales Value",
        "recognizedCosts": "Usage (Total Cost)",
        "recognizedSales": "Sales Value",
        "wipCost": true,
        "wipSales": true,
        "valid": true,
        "systemDefined": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('wipMethod', {}, {});
  }
};
