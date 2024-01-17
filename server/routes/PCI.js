const express = require("express");
const db = require("../startup/DB_connection");
const route = express.Router();
const PCI = require("../models/pci");

route.post("/add/", async (req, res) => {
  try {
    req.body.branchNumber = req.body.branchNumber | "";

    req.body.sampleLength = req.body.sampleLength | 0;
    req.body.sampleWidth = req.body.sampleWidth | 0;
    req.body.sampleArea = req.body.sampleArea | 0;
    req.body.sampleUnit = req.body.sampleUnit | 0;
    req.body.X = req.body.X | 0;
    req.body.Y = req.body.Y | 0;
    await PCI.create(req.body)
      .then((data) => {
        return res.status(200).send({ pciID: data.idpci });
      })
      .catch((err) => {
        return res.status(404).send(err);
      });
  } catch (err) {
    return res.status(401).send({ error: false });
  }
});

// get all items
route.get("/getAll", async (req, res) => {
  await PCI.findAll()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item
route.get("/getBySectionID/:sectionID", async (req, res) => {
  await PCI.findAll({
    where: {
      sectionID: req.params.sectionID,
    },
  })
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item by idpci
route.get("/getByidpci/:idpci", async (req, res) => {
  await PCI.findAll({
    where: {
      idpci: req.params.idpci,
    },
  })
    .then((data) => {
      return res.status(200).send(data[0]);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item
route.delete("/delete/:idpci", async (req, res) => {
  await PCI.destroy({
    where: {
      idpci: req.params.idpci,
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
