class dbAccess {
  // create db and tables
  constructor() {
    this.sqlite3 = require("sqlite3").verbose();
    this.db = new this.sqlite3.Database("hamsterjump.db");

    // create tables
    this.db.run("CREATE TABLE IF NOT EXISTS tblUser (id INTEGER PRIMARY KEY, uniqueId TEXT, name TEXT)");
    this.db.run("CREATE TABLE IF NOT EXISTS tblScore (id INTEGER PRIMARY KEY, uniqueId TEXT, score INTEGER)");
  }

  // insert a user if he is not yet in the db
  insertUser(uniqueId, name, callback = function() {}) {
    this.db.get(`SELECT uniqueId AS id from tblUser WHERE uniqueId = '${uniqueId}'`, (err, row) => {
      if (!row) {
        this.db.run(`INSERT INTO tblUser (uniqueId, name) VALUES('${uniqueId}', '${name}')`);
        callback(true);
      } else {
        callback(false);
      }

    });
  }

  // insert a score of a user
  insertScore(uniqueId, score, callback = function() {}) {
    this.db.get(`SELECT uniqueId AS id from tblUser WHERE uniqueId = '${uniqueId}'`, (err, row) => {
      if (row) {
        this.db.run(`INSERT INTO tblScore (uniqueId, score) VALUES('${uniqueId}', ${score})`);
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  getHighscore(amount, callback) {
    let highscore = [];
    const select = `SELECT score, name FROM tblScore as score JOIN tblUser as user ON score.uniqueId = user.uniqueId ORDER BY score DESC LIMIT ${amount}`;
    this.db.all(select, (err, allRows) => {
      if (!err) {
        callback(allRows);
      }
    })
  }

  closeDb() {
    this.db.close();
  }
};

module.exports = new dbAccess();
