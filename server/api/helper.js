const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");

function isAlphabet(chr) {
  const code = chr.charCodeAt();
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
    return true;
  }
  return false;
}

function getKeyMap(key) {
  const keyMap = {};
  if (!key) {
    key = "qwertyuioplkjhgfdsazxcvbnm".split("");
  }
  for (let i = 0; i < ALPHABETS.length; i++) {
    keyMap[ALPHABETS[i]] = key[i];
  }
  return keyMap;
}

module.exports = {
  caesar(text, shift) {
    return this.shift(text, shift);
  },
  shift(text, shift) {
    const cipher = text.map(alpha => {
      if (isAlphabet(alpha)) {
        return String.fromCharCode(alpha.charCodeAt() + shift);
      }
      return alpha;
    });
    return cipher;
  },
  monoalphabetic(text, key) {
    const keyMap = getKeyMap(key);
    const cipher = text.map(alpha => {
      if (isAlphabet(alpha)) {
        return keyMap[alpha];
      }
      return alpha;
    });
    return cipher;
  },
  vigenere(text, key) {
    if (!key) {
      key = "BREAK";
    }
    const cipher = text.map((alpha, index) => {
      if (key.length > 26) {
        key = key.slice(0, text.length % 26);
      }
      if (isAlphabet(alpha)) {
        return String.fromCharCode(
          alpha.charCodeAt() + key[index % key.length].charCodeAt()
        );
      }
      return alpha;
    });
    return cipher;
  },
  attack(cipher) {}
};
