const crypto = require("./helper");
module.exports = {
  encrypt(req, res) {
    const type = req.body.type;
    const text = req.body.plainText;
    const shift = req.body.shift || undefined;
    switch (type) {
      case "CAESAR":
        res.send({ data: crypto.caesar(text, 3), success: true });
        break;
      case "SHIFT":
        res.send({ data: crypto.shift(text, shift), success: true });
        break;
      case "MONO":
        res.send({ data: crypto.monoalpabetic(), success: true });
        break;
      case "VIGE":
        res.send({ data: crypto.vigenere(), success: true });
        break;
      default:
        res.send({ data: null, success: false });
    }
  }
};
