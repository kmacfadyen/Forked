const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Fake database
const users = [];

// Test 
app.get('/ping', (req, res) => {
    res.send('Pong!');
  });

// Routes
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Signup attempt:', email);

  users.push({ email, password });
  res.json({ message: 'User signed up successfully!' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  const user = users.find((u) => u.email === email && u.password === password);
  
  if (user) {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
