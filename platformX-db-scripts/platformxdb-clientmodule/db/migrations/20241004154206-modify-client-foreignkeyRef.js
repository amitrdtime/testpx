'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Adding foreign key to client table with country region table
    await queryInterface.addConstraint('client', {
      fields: ['countryRegionId'], // Column in client table
      type: 'foreign key',
      name: 'fk_client_country_Region', // Custom name for the constraint
      references: {
        table: 'country_region', // Table to reference
        field: 'id' // Column in country_region table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    // Adding foreign key to client table with language table
    await queryInterface.addConstraint('client', {
      fields: ['languageId'], // Column in client table
      type: 'foreign key',
      name: 'fk_client_language', // Custom name for the constraint
      references: {
        table: 'language', // Table to reference
        field: 'id' // Column in language table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    // Adding foreign key to client table with format_region table
    await queryInterface.addConstraint('client', {
      fields: ['formatRegionId'], // Column in client table
      type: 'foreign key',
      name: 'fk_client_format_region', // Custom name for the constraint
      references: {
        table: 'format_region', // Table to reference
        field: 'id' // Column in format_region table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    // Adding foreign key to client table with contact table
    await queryInterface.addConstraint('client', {
      fields: ['contactId'], // Column in client table
      type: 'foreign key',
      name: 'fk_client_contact', // Custom name for the constraint
      references: {
        table: 'contact', // Table to reference
        field: 'id' // Column in contact table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });
    
  },

  async down (queryInterface, Sequelize) {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('client', 'fk_client_country_Region');
    await queryInterface.removeConstraint('client', 'fk_client_language');
    await queryInterface.removeConstraint('client', 'fk_client_format_region');
    await queryInterface.removeConstraint('client', 'fk_client_contact');
  }
};
