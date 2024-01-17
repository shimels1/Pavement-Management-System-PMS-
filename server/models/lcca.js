const { Sequelize, DataTypes } = require("sequelize");
const db = require("../startup/DB_connection");

module.exports = db.define("lccas", {
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
