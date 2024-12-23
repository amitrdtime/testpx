'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('client', 'customerNo', {
      type: Sequelize.STRING(100), // Set length to 100
      unique:true
    });
    
    await queryInterface.changeColumn('client', 'name', {
      type: Sequelize.STRING(100) // Set length to 100
    });
    
    await queryInterface.changeColumn('client', 'address', {
      type: Sequelize.STRING(150) // Set length to 150
    });
    
    await queryInterface.changeColumn('client', 'address2', {
      type: Sequelize.STRING(150) // Set length to 150
    });
    
    await queryInterface.changeColumn('client', 'city', {
      type: Sequelize.STRING(30) // Set length to 30
    });
    
    await queryInterface.changeColumn('client', 'state', {
      type: Sequelize.STRING(30) // Set length to 30
    });
    
    await queryInterface.changeColumn('client', 'zipCode', {
      type: Sequelize.STRING(20) // Set length to 20
    });
    
    await queryInterface.changeColumn('client', 'phoneNo', {
      type: Sequelize.STRING(20) // Set length to 20
    });
    
    await queryInterface.changeColumn('client', 'mobilePhoneNo', {
      type: Sequelize.STRING(20) // Set length to 20
    });
    
    await queryInterface.changeColumn('client', 'email', {
      type: Sequelize.STRING(100) // Set length to 100
    });
    
    await queryInterface.changeColumn('client', 'faxNo', {
      type: Sequelize.STRING(20) // Set length to 20
    });
    
    await queryInterface.changeColumn('client', 'website', {
      type: Sequelize.STRING(100) // Set length to 100
    });
    
    // Remove the contactName column
    await queryInterface.removeColumn('client', 'contactName');
    
    await queryInterface.changeColumn('client', 'createdBy', {
      type: Sequelize.STRING(50) // Set length to 50
    });
    
    await queryInterface.changeColumn('client', 'modifiedBy', {
      type: Sequelize.STRING(50) // Set length to 50
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('client', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('client', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // Set default to current date
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('client', 'name', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'address', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'address2', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'city', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'state', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'zipCode', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'phoneNo', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'mobilePhoneNo', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'email', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'faxNo', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'website', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.addColumn('client', 'contactName', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'createdBy', {
      type: Sequelize.STRING()
    });
    
    await queryInterface.changeColumn('client', 'modifiedBy', {
      type: Sequelize.STRING()
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('client', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
    // Update createdAt column to have a default value
    await queryInterface.changeColumn('client', 'updatedAt', {
      allowNull: true,
      type: Sequelize.DATE
    });
    
  }
  
};
