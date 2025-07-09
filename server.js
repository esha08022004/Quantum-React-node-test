const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://quantaum.netlify.app' // Production
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

mongoose.connect('mongodb://localhost:27017/loginDB');

const UserSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  email: { type: String, unique: true }, // Ensure unique emails
  password: String,
});
const User = mongoose.model('User', UserSchema);

const JWT_SECRET = 'your-secret-key';

app.post('/api/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, dateOfBirth, email, password: hashedPassword });
  try {
    await user.save();
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { name, dateOfBirth, email } });
  } catch (error) {
    res.status(400).json({ message: 'Email already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({ token, user: { name: user.name, dateOfBirth: user.dateOfBirth, email: user.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, JWT_SECRET);
    const users = await User.find({}, { password: 0 }); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));