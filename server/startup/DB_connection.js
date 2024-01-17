const Sequelize = require("sequelize");
module.exports = new Sequelize("rode", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});
