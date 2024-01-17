const express = require("express");
const app = express();
const db = require("./startup/DB_connection");

require("./startup/header")(app);
require("./startup/routes")(app);
app.enable("trust proxy");

db.authenticate()
  .then(() => console.log("database connected"))
  .catch(() => console.log("database is not connected"));

var port = process.env.PORT || 3000;

app.listen(port, console.log(`server is running in port: ${port} `));

app.get("/", (req, res) => {
  res.send("hello");
});
