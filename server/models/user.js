const { Sequelize, DataTypes } = require("sequelize");
const db = require("../startup/DB_connection");

module.exports = db.define("Users", {
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
