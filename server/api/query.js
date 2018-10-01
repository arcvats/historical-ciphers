const database = require("./database");
const db = database.getDB();

module.exports = {
  init() {
    db.run(
      `
            CREATE TABLE IF NOT EXISTS user_data(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plain_text TEXT,
                cipher_text TEXT,
                type TEXT
            ) 
            `,
      [],
      err => {
        if (err) {
          console.error(err.message);
        }
      }
    );
  },
  all() {
    const query = `SELECT * FROM user_data`;
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },
  one(id) {
    const query = `SELECT * FROM user_data WHERE id = ${id}`;
    return new Promise((resolve, reject) => {
      db.get(query, [], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  },
  insert(plain_text, cipher_text, type) {
    const query = `INSERT INTO user_data(plain_text, cipher_text, type) VALUES(?, ?, ?)`;
    let lastId;
    db.run(query, [plain_text, cipher_text, type], err => {
      if (err) {
        console.error(err.message);
      }
    });
    return lastId;
  },
  getLastId() {
    const query = `SELECT MAX(id) AS id FROM user_data`;
    return new Promise((resolve, reject) => {
      db.get(query, [], (err, id) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    });
  },
  getLastByCipher(cipher) {
    const query = `SELECT * FROM user_data WHERE type = "${cipher}" ORDER BY id DESC LIMIT 1`;
    return new Promise((resolve, reject) => {
      db.get(query, [], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  },
  close() {
    db.disconnect();
  }
};
