const sqlite3 = require("sqlite3").verbose();

module.exports = {
  getDB() {
    if (typeof this.db === "undefined") {
      this.initDB();
    }
    return this.db;
  },
  initDB() {
    this.db = new sqlite3.Database("./ciphers.db", err => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Connected to the database");
      }
    });
  },
  disconnect() {
    if (this.db) {
      this.db.close(err => {
        if (err) {
          console.error(err.message);
        }
        console.log("Disconnected");
      });
    }
  }
};
