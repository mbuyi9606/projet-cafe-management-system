const mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    port: process.env.DBPORT,
    host: process.env.DBHOST,
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
});

connection.connect((err) => {
    if (!err) {
        console.log("connected");
    } else {
        console.log(err);
    }
});

module.exports = connection;