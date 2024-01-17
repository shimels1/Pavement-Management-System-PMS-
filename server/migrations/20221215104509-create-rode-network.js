"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Model, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("RodeNetworks", {
      s_no: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: DataTypes.STRING,
      city: DataTypes.STRING(150),
      branchName: DataTypes.STRING(250),
      sectionID: {
        type: DataTypes.STRING(150),

        unique: true,
        allowNull: false,
      },
      authority: DataTypes.STRING(150),
      functionalClass: DataTypes.STRING(150),
      con_main_Reh_Year: DataTypes.STRING(150),
      networkID: DataTypes.STRING(150),
      surfaceType: DataTypes.STRING(150),
      pavementType: DataTypes.STRING(150),
      length: DataTypes.DECIMAL(10, 2),
      pavementWidth: DataTypes.DECIMAL(10, 2),
      age: DataTypes.DECIMAL(10, 2),
      width: DataTypes.DECIMAL(10, 2),
      medianwidth: DataTypes.DECIMAL(10, 2),
      shoulderwidth: DataTypes.DECIMAL(10, 2),
      ROW: DataTypes.DECIMAL(10, 2),
      carraigeWayWidth: DataTypes.DECIMAL(10, 2),
      segLength: DataTypes.DECIMAL(10, 2),
      noOfLanes: DataTypes.INTEGER,
      divided: DataTypes.STRING(45),
      constructionYear: DataTypes.DATE,
      trafficVolume: DataTypes.INTEGER,
      from: DataTypes.STRING(150),
      loc1: DataTypes.STRING(1234),
      to: DataTypes.STRING(45),
      loc2: DataTypes.STRING(1234),
      submittedBy: DataTypes.STRING(150),
      submittedOn: DataTypes.STRING(150),
      username: DataTypes.STRING(150),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RodeNetworks");
  },
};
