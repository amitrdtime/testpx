'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empID: {
        unique: true,
        type: Sequelize.STRING(20)
      },
      firstName: {
        type: Sequelize.STRING(50)
      },
      middleName: {
        type: Sequelize.STRING(50)
      },
      lastName: {
        type: Sequelize.STRING(50)
      },
      phoneNumber: {
        type: Sequelize.STRING(15)
      },
      personalEmail: {
        type: Sequelize.STRING(50)
      },
      gender: {
        type: Sequelize.STRING(10)
      },
      dob: {
        type: Sequelize.DATE
      },
      bloodGroup: {
        type: Sequelize.STRING(5)
      },
      nationality: {
        type: Sequelize.STRING(50)
      },
      currentAddress: {
        type: Sequelize.STRING(200)
      },
      permanentAddress: {
        type: Sequelize.STRING(200)
      },
      secondaryNumber: {
        type: Sequelize.STRING(15)
      },
      userRole: {
        type: Sequelize.STRING(50)
      },
      designation: {
        type: Sequelize.STRING(50)
      },
      officialEmail: {
        type: Sequelize.STRING(50)
      },
      baseLocation: {
        type: Sequelize.STRING(50)
      },
      reportingManager: {
        type: Sequelize.STRING(50)
      },
      typeOfEmployee: {
        type: Sequelize.STRING(50)
      },
      department: {
        type: Sequelize.STRING(50)
      },
      workingType: {
        type: Sequelize.STRING(50)
      },
      CreatedBy: {
        type: Sequelize.STRING(50)
      },
      modifiedBy: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      freezeTableName: true,
      modelName:'user'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};