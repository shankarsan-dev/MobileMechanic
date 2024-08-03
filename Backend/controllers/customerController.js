// controllers/customerController.js
const Customer = require('../models/customerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, address,gender,phoneNumber } = req.body;

  try {
    const customerExists = await Customer.findOne({ email });

    if (customerExists) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      gender
    });

    res.status(201).json({
      _id: customer._id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      address: customer.address,
      phone: customer.phoneNumber,
      token: generateToken(customer._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email });

    if (customer && (await bcrypt.compare(password, customer.password))) {
      res.json({
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        token: generateToken(customer._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, 'secret', { expiresIn: '30d' });
};
