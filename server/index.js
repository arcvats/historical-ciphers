const express = require("express");
const bodyParser = require("body-parser");
const router = require("./api/routes");

const app = express();
app.use(router);
app.listen(process.env.PORT || 8080, err => {
  if (err) throw err;
  else console.log("Listening at");
});
