const mysql = require("mysql2");

//connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Melany10!",
        database: "disney_world"
    },
);

module.exports = db;