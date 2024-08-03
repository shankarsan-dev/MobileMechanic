const express = require('express');
const { signup, login } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route to get customer profile
router.get('/profile', protect, (req, res) => {
  res.json({
    _id: req.customer._id,
    firstName: req.customer.firstName,
    lastName: req.customer.lastName,
    email: req.customer.email,
    phone: req.customer.phone,
    address: req.customer.address,
    profilePicture: req.customer.profilePicture,
  });
  router.get('/profile')
});

module.exports = router;
