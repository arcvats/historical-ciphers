const sqlite3 = require("sqlite3").verbose();

module.exports = {
  getDB() {
    if (typeof this.db === "undefined") {
      this.initDB();
    }
    return this.db;
  },
  initDB() {
    this.db = new sqlite3.Database(
      "./ciphers.db",
      sqlite3.OPEN_READWRITE,
      err => {
        if (err) {
          console.error(err.message);
        }
        console.log("Connected to the database");
      }
    );
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
