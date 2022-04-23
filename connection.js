const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username:
        user: 'root',
        // MySQL password and database:
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB_NAME
    },
    console.log(`Connected to the database.`)
);

module.exports = db;
module.exports = mysql