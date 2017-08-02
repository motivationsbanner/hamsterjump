const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("hamsterjump.db");

function insertUser(uniqueId, name) {
  db.run("CREATE TABLE IF NOT EXISTS tblUser (uniqueId TEXT, name TEXT)");
  db.run(`INSERT INTO tblUser VALUES('${uniqueId}', '${name}')`);
}

module.exports = insertUser;
