const Mechanic = require('../models/mechanicModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign up a new mechanic
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  try {
    // Check if the mechanic already exists
    const mechanicExists = await Mechanic.findOne({ email });

    if (mechanicExists) {
      return res.status(400).json({ message: 'Mechanic already exists' });
    }

    // Create a new mechanic
    const mechanic = await Mechanic.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    res.status(201).json({
      _id: mechanic._id,
      firstName: mechanic.firstName,
      lastName: mechanic.lastName,
      email: mechanic.email,
      phoneNumber: mechanic.phoneNumber,
      token: generateToken(mechanic._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Log in an existing mechanic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the mechanic by email
    const mechanic = await Mechanic.findOne({ email });

    // Check if the mechanic exists and if the password matches
    if (mechanic && (await bcrypt.compare(password, mechanic.password))) {
      res.json({
        _id: mechanic._id,
        firstName: mechanic.firstName,
        lastName: mechanic.lastName,
        email: mechanic.email,
        phoneNumber: mechanic.phoneNumber,
        token: generateToken(mechanic._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, 'secret', { expiresIn: '30d' });
};
