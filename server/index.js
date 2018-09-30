const express = require("express");
const bodyParser = require("body-parser");
const router = require("./api/routes");
const config = require("./config");
const path = require("path");

const app = express();
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.listen(process.env.PORT || config.port, err => {
  if (err) console.error(err.message);
  else console.log(`Listening at ${config.port}`);
});
