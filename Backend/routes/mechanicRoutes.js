// routes/mechanicRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/mechanicController');
const { protectMechanic } = require('../middleware/authMechanicMiddleware');

const router = express.Router();

// Mechanic routes
router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route
router.get('/profile', protectMechanic, (req, res) => {
  res.json({
    _id: req.mechanic._id,
    firstName: req.mechanic.firstName,
    lastName: req.mechanic.lastName,
    email: req.mechanic.email,
    phoneNumber: req.mechanic.phoneNumber,
  });
  //res.end(req.mechanic.firstName);
});
// Fetch available mechanics
router.get('/available', async (req, res) => {
  try {
    const mechanics = await Mechanic.find({ available: true });
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
