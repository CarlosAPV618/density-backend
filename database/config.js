const mysql = require("mysql");
const { promisify } = require("util");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "density",
};

const db = mysql.createPool(config);

db.getConnection((err, connection) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.log("DB connection closed");
        break;

      case "ER_CON_COUNT_ERROR":
        console.log("DB has to many connections");
        break;

      case "ECONNREFUSED":
        console.log("DB connection refused");
        break;

      default:
        console.log("No se pudo conectar a la bd");
        break;
    }

    return;
  }

  if (connection) {
    connection.release();
    console.log("DB connected");

    return;
  }

  console.log("Something went wrong...");
});

db.query = promisify(db.query);

module.exports = { db };
