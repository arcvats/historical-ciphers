const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/all");
router.post("/encrypt", controller.encrypt(req, res));

module.exports = router;
