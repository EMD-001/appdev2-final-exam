const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);

app.use('/api', eventRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));
