"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Model, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lccaItems", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      sectionId: {
        type: DataTypes.STRING(150),
      },

      index: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
      maintenanceType: DataTypes.STRING(150),
      currentCost: DataTypes.DECIMAL(10, 2),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("lccaItems");
  },
};
