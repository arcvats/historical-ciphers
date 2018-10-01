const crypto = require("./helper");
const query = require("./query");
const UPPER_BOUND = 26;
const CAESAR_SHIFT = 3;
module.exports = {
  encrypt(req, res) {
    const type = req.body.type;
    const text = req.body.plainText.split("");
    const shift = parseInt(req.body.shift, 10) % UPPER_BOUND || 0;
    const key = req.body.key || null;
    query.init();
    let data;
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
      case "VIGEN":
        data = crypto.vigenere(text, key).join("");
        query.insert(text.join(""), data, type);
        break;
      default:
        return res.send({ success: false });
    }
    if (data) {
      return res.send({ data, success: true });
    }
    return res.send({ success: false });
  },
  all(req, res) {
    query
      .all()
      .then(data => res.send({ data, success: true }))
      .catch(err => {
        console.error(err.message);
        res.send({ success: false });
      });
  },
  last(req, res) {
    query
      .getLastId()
      .then(result => {
        query
          .one(result.id)
          .then(data => {
            return res.send({ data, success: true });
          })
          .catch(err => {
            console.error(err.message);
            return res.send({ success: false });
          });
      })
      .catch(err => {
        console.error(err.message);
        return res.send({ success: false });
      });
  },
  lastByCipher(req, res) {
    const cipher = req.body.cipher;
    query
      .getLastByCipher(cipher)
      .then(data => {
        return res.send({ data, success: true });
      })
      .catch(err => {
        console.error(err.message);
        return res.send({ success: false });
      });
  },
  attack(req, res) {
    const cipher = req.body.cipher;
    const result = crypto.attack(cipher);
    if (result.status) {
      return res.send({ data: result.data, success: true });
    }
    return res.send({ success: false });
  }
};
