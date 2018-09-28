const crypto = require("./helper");
const query = require("./query");
const UPPER_BOUND = 26;
const CAESAR_SHIFT = 3;
module.exports = {
  encrypt(req, res) {
    const type = req.body.type;
    const text = req.body.plainText.split("");
    const shift = parseInt(req.body.shift, 10) % UPPER_BOUND || undefined;
    const key = req.body.key || null;
    query.init();
    let data;
    let lastId;
    switch (type) {
      case "CAESAR":
        data = crypto.caesar(text, CAESAR_SHIFT).join("");
        query.insert(text.join(""), data, type);
        break;
      case "SHIFT":
        data = crypto.shift(text, shift).join("");
        query.insert(text.join(""), data, type);
        break;
      case "MONO":
        data = crypto.monoalphabetic(text, key).join("");
        query.insert(text.join(""), data, type);
        break;
      case "VIGE":
        data = crypto.vigenere(text, key).join("");
        query.insert(text.join(""), data, type);
        break;
      default:
        return res.send({ success: false });
    }
    lastId = query.getLastId();
    console.log(data, lastId);
    if (data && lastId) {
      return res.send({ data, lastId, success: true });
    }
    return res.send({ success: false });
  },
  all(req, res) {
    query.init();
    const data = query.all();
    res.send({ data, success: true });
  },
  last(req, res) {
    query.init();
    const lastId = parseInt(req.body.lastId, 10);
    const data = query.one(lastId);
    res.send({ data, success: true });
  },
  attack(req, res) {}
};
