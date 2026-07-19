const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const mealRoutes = require('./routes/meals');
const foodRoutes = require('./routes/foods');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');
const educationRoutes = require('./routes/education');
const consultationRoutes = require('./routes/consultations');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/consultations', consultationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Nutrition Assistant API is running' });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Attempting to free port...`);
  } else {
    console.error('Server error:', err);
  }
});
