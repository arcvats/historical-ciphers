const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/all", controller.all);
router.get("/last", controller.last);
router.post("/encrypt", controller.encrypt);
router.post("/bruteforce", controller.attack);
router.post("/last-cipher", controller.lastByCipher);
module.exports = router;
