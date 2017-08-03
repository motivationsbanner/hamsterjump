class dbAccess {
  // create db and tables
  constructor() {
    this.sqlite3 = require("sqlite3").verbose();
    this.db = new this.sqlite3.Database("hamsterjump.db");  

    // create tables
    this.db.run("CREATE TABLE IF NOT EXISTS tblUser (uniqueId TEXT, name TEXT)");
    this.db.run("CREATE TABLE IF NOT EXISTS tblScore (uniqueId TEXT, score INTEGER)");
  }
  
  // insert a user if he is not yet in the db
  insertUser(uniqueId, name) {
    this.db.get(`SELECT uniqueId AS id from tblUser WHERE uniqueId = '${uniqueId}'`, (err, row) =>  {
      if (!row) {
        this.db.run(`INSERT INTO tblUser VALUES('${uniqueId}', '${name}')`);
      }
    });
  }

  // insert a score of a user
  insertScore(uniqueId, score) { 
    this.db.get(`SELECT uniqueId AS id from tblUser WHERE uniqueId = '${uniqueId}'`, (err, row) =>  {
      if (row) {
        this.db.run(`INSERT INTO tblScore VALUES('${uniqueId}', ${score})`);
      }
    });
  }

  closeDb() {
    this.db.close();
  }
};

module.exports = new dbAccess();
