const database = require("./database");
const db = database.getDB();

module.exports = {
  init() {
    db.run(
      `
            CREATE TABLE IF NOT EXISTS user_data(
                id INTEGER PRIMARY KEY,
                plain_text TEXT,
                cipher_text TEXT,
                type TEXT
            ) 
            `
    );
  },
  all() {},
  one() {},
  insert() {},
  close() {
    db.disconnect();
  }
};
