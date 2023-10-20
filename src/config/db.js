const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Blessme@12',
  database: 'restaurant',
});

db.promise().connect(); // Use promises for database connection

module.exports = db;