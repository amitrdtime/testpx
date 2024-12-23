'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Check if the sow table already exists
    await queryInterface.addConstraint('sow', {
      fields: ['customerId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_customer', // Custom name for the constraint
      references: {
        table: 'client', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['personResponsibleId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_person_responsible', // Custom name for the constraint
      references: {
        table: 'resource', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['projectManagerId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_project_manager', // Custom name for the constraint
      references: {
        table: 'resource', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['jobTypeId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_jobType', // Custom name for the constraint
      references: {
        table: 'lookupType', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['sowStatusId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_sowStatus', // Custom name for the constraint
      references: {
        table: 'lookupType', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['exchCalculationCostId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_exchCalculationCost', // Custom name for the constraint
      references: {
        table: 'lookupType', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['exchCalculationPriceId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_exchCalculationPrice', // Custom name for the constraint
      references: {
        table: 'lookupType', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['blockedId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_blocked', // Custom name for the constraint
      references: {
        table: 'lookupType', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['projectPostingGroupId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_projectPostingGroup', // Custom name for the constraint
      references: {
        table: 'projectPostingGroup', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['locationId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_location', // Custom name for the constraint
      references: {
        table: 'location', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });

    await queryInterface.addConstraint('sow', {
      fields: ['currencyId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_currency', // Custom name for the constraint
      references: {
        table: 'currency', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });
    await queryInterface.addConstraint('sow', {
      fields: ['invoiceCurrencyId'], // Column in sow table
      type: 'foreign key',
      name: 'fk_sow_invoiceCurrency', // Custom name for the constraint
      references: {
        table: 'currency', // Table to reference
        field: 'id' // Column in resource table
      },
      onUpdate: 'cascade', // Optional: specify on update action
      onDelete: 'set null' // Optional: specify on delete action
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('sow', 'fk_sow_person_responsible');
    await queryInterface.removeConstraint('sow', 'fk_sow_project_manager');
  }
};