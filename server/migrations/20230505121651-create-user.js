"use strict";
/** @type {import('sequelize-cli').Migration} */
const { Model, DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      first_name: DataTypes.STRING(150),
      last_name: DataTypes.STRING(150),
      password: DataTypes.STRING(150),
      role: DataTypes.STRING(150),
      sex: DataTypes.STRING(150),
      phone: DataTypes.STRING(150),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
