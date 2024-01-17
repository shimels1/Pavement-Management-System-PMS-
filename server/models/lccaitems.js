const { Sequelize, DataTypes } = require("sequelize");
const db = require("../startup/DB_connection");

module.exports = db.define("lccaItems", {
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
