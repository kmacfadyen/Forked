// db/database.js
const Database = require('better-sqlite3');
const db = new Database('mydatabase.db');

module.exports = db;
