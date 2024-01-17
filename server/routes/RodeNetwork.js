const express = require("express");
const route = express.Router();
// 'use strict'
const { Sequelize, DataTypes } = require("sequelize");
const RodeNetwork = require("../models/rodenetwork");

route.post("/add/", async (req, res) => {
  try {
    const city = req.body.city;
    const branchName = req.body.branchName;
    const sectionID = req.body.sectionID;
    const functionalClass = req.body.functionalClass;
    const surfaceType = req.body.surfaceType;
    const length = req.body.length;
    const width = req.body.width;
    const carraigeWayWidth = req.body.carraigeWayWidth;
    const noOfLanes = req.body.noOfLanes;
    const divided = req.body.divided;
    const constructionYear = req.body.constructionYear;
    const trafficVolume = req.body.trafficVolume;
    const from = req.body.from;
    const X = req.body.X;
    const Y = req.body.Y;
    const to = req.body.to;
    const X1 = req.body.X1;
    const Y1 = req.body.Y1;
    const submittedBy = req.body.submittedBy;
    const submittedOn = req.body.submittedOn;
    req.body.loc1 = "(" + req.body.X + "," + req.body.Y + ")";
    req.body.loc2 = "(" + req.body.X1 + "," + req.body.Y1 + ")";

    await RodeNetwork.create(req.body)
      .then((data) => {
        return res.status(200).send({ sectionID: data });
      })
      .catch((err) => {
        return res.status(404).send(err);
      });
  } catch (err) {
    return res.status(401).send({ result: false });
  }
});

// get all items
route.get("/getAll", async (req, res) => {
  await RodeNetwork.findAll()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item
route.get("/getOne/:sectionID", async (req, res) => {
  RodeNetwork.findAll({
    where: {
      id: req.params.sectionID,
    },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});
// get by username item
route.get("/getByUsername/:username", async (req, res) => {
  RodeNetwork.findAll({
    where: {
      username: req.params.username,
    },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item
route.delete("/delete/:sectionID", async (req, res) => {
  console.log(req.params.sectionID);
  RodeNetwork.destroy({
    where: {
      sectionID: req.params.sectionID,
    },
  })
    .then((data) => {
      return res.send({ message: " delete success" });
    })
    .catch((err) => {
      return res.status(401).send("there is an error in the database");
    });
});

module.exports = route;
