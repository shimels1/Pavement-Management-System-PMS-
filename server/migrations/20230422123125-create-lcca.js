"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Model, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lccas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      sectionId: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },

      inflationRate: DataTypes.DECIMAL(10, 2),
      discountRate: DataTypes.DECIMAL(10, 2),
      sectionArea: DataTypes.DECIMAL(10, 2),
      initialCost: DataTypes.DECIMAL(10, 2),
      analysisPeriod: DataTypes.DECIMAL(10, 2),
      salvageValue: DataTypes.DECIMAL(10, 2),
      PWC: DataTypes.DECIMAL(10, 2),
      EUAC: DataTypes.DECIMAL(10, 2),
      username: DataTypes.STRING(150),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("lccas");
  },
};
