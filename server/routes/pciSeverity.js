const express = require("express");
const db = require("../startup/DB_connection");
const route = express.Router();
const Pci_severity = require("../models/pci_severity");

// add pci_severity
route.post("/add/", async (req, res) => {
  try {
    req.body.q1 = req.body.q1;
    req.body.q2 = req.body.q2 | 0;
    req.body.q3 = req.body.q3 | 0;
    req.body.q4 = req.body.q4 | 0;
    req.body.q5 = req.body.q5 | 0;
    req.body.q6 = req.body.q6 | 0;
    req.body.q7 = req.body.q7 | 0;
    req.body.q8 = req.body.q8 | 0;
    req.body.q9 = req.body.q9 | 0;
    req.body.pci_id = req.body.pci_id;

    await Pci_severity.create(req.body)
      .then((data) => {
        return res.status(200).send({ sectionID: data });
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
  await Pci_severity.findAll()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get by pci_id
route.get("/getByPciId/:pci_id", async (req, res) => {
  try {
    await Pci_severity.findAll({
      where: {
        pci_id: req.params.pci_id,
      },
    })
      .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(200).send("there is an error in the database");
      });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: false });
  }
});

//////////// delete
route.delete("/delete/:sectionID", async (req, res) => {
  try {
    await PCI.destroy({
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
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: false });
  }
});

module.exports = route;
