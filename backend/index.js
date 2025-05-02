const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// Test route
app.get('/ping', (req, res) => {
  res.send('Pong!');
});

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';

  db.run(sql, [email, password], function (err) {
    if (err) {
      console.error('Signup error:', err.message);
      return res.status(500).json({ message: 'Signup failed. Email may already exist.' });
    }
    res.json({ message: 'User signed up successfully!', userId: this.lastID });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.get(sql, [email, password], (err, row) => {
    if (err) {
      console.error('Login error:', err.message);
      return res.status(500).json({ message: 'Login failed.' });
    }

    if (row) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
