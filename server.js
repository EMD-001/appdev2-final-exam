require('dotenv').config(); // <-- load .env file

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
