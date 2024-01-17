const { Sequelize, DataTypes } = require("sequelize");
const db = require("../startup/DB_connection");

module.exports = db.define("PCIs", {
  idpci: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chainage: DataTypes.DECIMAL(10, 2),
  authority: DataTypes.STRING(150),
  branchNumber: DataTypes.STRING(150),
  surveyedBy: DataTypes.STRING(150),
  sectionID: DataTypes.STRING(150),
  date: DataTypes.DATE,
  sampleLength: DataTypes.DECIMAL(10, 2),
  sampleWidth: DataTypes.DECIMAL(10, 2),
  sampleArea: DataTypes.STRING(150),
  sampleUnit: Sequelize.INTEGER,
  X: DataTypes.DOUBLE,
  Y: DataTypes.DOUBLE,
});
