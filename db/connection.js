const mysql = require("mysql2");

//connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Mickey.10",
        database: "walt_disney"
    },
);

module.exports = db;