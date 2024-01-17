const { Sequelize, DataTypes } = require("sequelize");
const db = require("../startup/DB_connection");

module.exports = db.define("pci_severities", {
  idpci_severity: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  distress_type: DataTypes.STRING(150),
  distress_number: Sequelize.INTEGER,
  distress_severity: DataTypes.STRING(150),
  units: DataTypes.STRING(150),
  q1: DataTypes.DECIMAL(10, 2),
  q2: DataTypes.DECIMAL(10, 2),
  q3: DataTypes.DECIMAL(10, 2),
  q4: DataTypes.DECIMAL(10, 2),
  q5: DataTypes.DECIMAL(10, 2),
  q6: DataTypes.DECIMAL(10, 2),
  q7: DataTypes.DECIMAL(10, 2),
  q8: DataTypes.DECIMAL(10, 2),
  q9: DataTypes.DECIMAL(10, 2),
  pci_id: Sequelize.INTEGER,
});
