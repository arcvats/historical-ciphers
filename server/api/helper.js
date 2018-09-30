const ALPHABETS = "abcdefghijklmnopqrstuvwxyz".split("");
const RANDOM_KEY = "qwertyuioplkjhgfdsazxcvbnm".split("");

function isAlphabet(chr) {
  const code = chr.charCodeAt();
  if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
    return true;
  }
  return false;
}

function isLower(chr) {
  const code = chr.charCodeAt();
  if (code >= 97 && code <= 122) {
    return true;
  }
  return false;
}

function isUpper(chr) {
  const code = chr.charCodeAt();
  if (code >= 65 && code <= 90) {
    return true;
  }
  return false;
}

function getKeyMap(key) {
  const keyMap = {};
  if (!key) {
    key = RANDOM_KEY;
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
  attack(cipher) {
    if (cipher.length > 32) {
      return { data: null, status: false };
    }
    const combinations = [];
    cipher = cipher.split("");
    for (let i = 1; i <= 26; i++) {
      const singleResult = [];
      cipher.forEach(alpha => {
        const charCode = alpha.charCodeAt();
        if (isAlphabet(alpha)) {
          if (isLower(alpha) && charCode + i > 122) {
            singleResult.push(String.fromCharCode(97 + charCode + i - 123));
          } else if (isUpper(alpha) && charCode + i > 90) {
            singleResult.push(String.fromCharCode(65 + charCode + i - 91));
          } else {
            singleResult.push(String.fromCharCode(charCode + i));
          }
        } else {
          singleResult.push(alpha);
        }
      });
      combinations.push(singleResult.join(""));
    }
    return { data: combinations, status: true };
  }
};
