const express = require("express");
const db = require("../startup/DB_connection");
const route = express.Router();
const lcca = require("../models/lcca");
const User = require("../models/user");
const user = require("../models/user");

route.post("/register", async (req, res) => {
  await User.create(req.body)
    .then(async (data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

route.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
});

route.get("/getAll", async (req, res) => {
  await User.findAll()
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

route.delete("/delete/:username", async (req, res) => {
  await User.destroy({
    where: {
      username: req.params.username,
    },
  })
    .then(async (data) => {
      return res.send({ message: " delete success" });
    })
    .catch((err) => {
      return res.status(401).send("there is an error in the database");
    });
});

// get one item
route.get("/username/:username", async (req, res) => {
  await User.findAll({
    where: {
      username: req.params.username,
    },
  })
    .then(async (data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(200).send("there is an error in the database");
    });
});

route.put("/update/:username", async (req, res) => {
  try {
    var username = req.params.username;

    User.update(req.body, {
      where: {
        username: username,
      },
    })
      .then(async (result) => {
        return res.status(200).send({ update: "true" });
      })
      .catch((error) => {});
  } catch (err) {
    return res.status(401).send({ error: false });
  }
});

module.exports = route;
