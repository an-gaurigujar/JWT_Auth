const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: 'punenexus123', 
  database: 'jwt_auth',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

const SECRET_KEY = 'c836f07e3d65daf1db8d43265d00170cd4d17f5c980e12badc26d0a2fe2f15ad';


app.use(express.static(path.join(__dirname, 'dist/jwt-angular-app')));

app.get('/', (req, res) => {
  res.send('Welcome to the JWT Auth API!');
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  console.log('Register request received:', { username, password });


  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log('Hashed password:', hashedPassword);

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Registration failed' });
    }
    console.log('User registered successfully:', result);
    res.json({ message: 'User registered successfully' });
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }


    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });


    const updateSql = 'UPDATE users SET token = ? WHERE username = ?';
    db.query(updateSql, [token, user.username], (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to store token' });
      }
      res.json({ token });
    });
  });
});


app.get('/protected', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json({ message: 'Access granted', user: decoded });
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/jwt-angular-app/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});