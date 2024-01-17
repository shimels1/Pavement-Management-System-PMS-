const rodeNetwork = require("../routes/RodeNetwork");
const PCI = require("../routes/PCI");
const pciSeverity = require("../routes/pciSeverity");
const lcca = require("../routes/lcca");
const user = require("../routes/user");
var bodyParser = require("body-parser");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use("/api/rodeNetwork", rodeNetwork);
  app.use("/api/pci", PCI);
  app.use("/api/pciSeverity", pciSeverity);
  app.use("/api/lcca", lcca);
  app.use("/api/user", user);
};
