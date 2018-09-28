const database = require("./database");
let db;

module.exports = {
  init() {
    db = database.getDB();
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
    let results;
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      results = rows;
    });
    return results;
  },
  one(id) {
    const query = `SELECT * FROM user_data WHERE id = ${id}`;
    let result;
    db.get(query, [], (err, row) => {
      if (err) {
        console.error(err.message);
      }
      result = row;
    });
    return result;
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
    const query = `SELECT MAX(id) FROM user_data`;
    db.get(query, [], (err, id) => {
      if (err) {
        console.error(err.message);
      } else {
        return id;
      }
    });
  },
  close() {
    db.disconnect();
  }
};
