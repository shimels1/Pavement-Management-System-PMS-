const express = require("express");
const db = require("../startup/DB_connection");
const route = express.Router();
const lcca = require("../models/lcca");
const lccaitems = require("../models/lccaitems");

route.post("/add/", async (req, res) => {
  try {
    var sectionId = req.body.sectionId;
    var tableRow = req.body.tableRow;

    tableRow.forEach((element) => {
      element.sectionId = sectionId;
    });
    await lcca
      .create(req.body)
      .then(async (data) => {
        await lccaitems
          .bulkCreate(tableRow)
          .then((data) => {
            return res.status(200).send({ sectionId: sectionId });
          })
          .catch((err) => {
            return res.status(404).send(err);
          });
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
  await lcca
    .findAll()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

// get one item
route.get("/getBySectionId/:sectionId", async (req, res) => {
  await lcca
    .findAll({
      where: {
        sectionId: req.params.sectionId,
      },
    })
    .then(async (data) => {
      await lccaitems
        .findAll({
          where: {
            sectionId: req.params.sectionId,
          },
        })
        .then((tableRow) => {
          return res.status(200).send({ data, tableRow });
        })
        .catch((err) => {
          return res.status(200).send("there is an error in the database");
        });
      // return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

route.put("/update/:sectionId", async (req, res) => {
  try {
    var sectionId = req.params.sectionId;
    var tableRow = req.body.tableRow;
    tableRow.forEach((element) => {
      element.sectionId = sectionId;
    });

    lcca
      .update(req.body, {
        where: {
          sectionId: sectionId,
        },
      })
      .then(async (result) => {
        await tableRow.forEach(async (element) => {
          element.sectionId = sectionId;

          await lccaitems
            .update(element, {
              where: {
                id: element.id,
              },
            })
            .then((result) => {})
            .catch((error) => {});

          lccaitems
            .create(element)
            .then((result) => {})
            .catch((error) => {});
        });
        return res.status(200).send({ update: "true" });
      })
      .catch((error) => {});
  } catch (err) {
    return res.status(401).send({ error: false });
  }
});

// get by username item
route.get("/getByUsername/:username", async (req, res) => {
  lcca
    .findAll({
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
route.delete("/delete/:sectionId", async (req, res) => {
  await lcca
    .destroy({
      where: {
        sectionId: req.params.sectionId,
      },
    })
    .then(async (data) => {
      await lccaitems
        .destroy({
          where: {
            sectionId: req.params.sectionId,
          },
        })
        .then((data) => {
          return res.send({ message: " delete success" });
        })
        .catch((err) => {
          return res.status(401).send("there is an error in the database");
        });
    })
    .catch((err) => {
      return res.status(401).send("there is an error in the database");
    });
});

module.exports = route;
