const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/mobileMechanic')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/mechanics', mechanicRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
