const express = require("express");
const bodyParser = require("body-parser");
const router = require("./api/routes");
const config = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.listen(process.env.PORT || config.port, err => {
  if (err) console.error(err.message);
  else console.log(`Listening at ${config.port}`);
});
