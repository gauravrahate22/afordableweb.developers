// server.js (backend file)
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/awd_users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (role === 'admin') {
    return res.status(400).json({ message: "Admin account already exists." });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already registered." });
  }

  const user = new User({ name, email, password, role });
  await user.save();

  res.status(201).json({ message: "Signup successful" });
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (role === 'admin') {
    if (email === 'admin@awd.com' && password === 'admin123') {
      return res.json({ success: true, role: 'admin' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
  }

  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid user credentials' });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
