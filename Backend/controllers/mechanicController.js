// const Mechanic = require('../models/mechanicModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, password, phoneNumber, address, gender } = req.body;
//   try {
//     // Check if the mechanic already exists
//     const mechanicExists = await Mechanic.findOne({ email });
//     if (mechanicExists) {
//       return res.status(400).json({ message: 'Mechanic already exists' });
//     }

//     // Create a new mechanic
//     const mechanic = await Mechanic.create({
//       firstName,
//       lastName,
//       email,
//       password, // Save the hashed password
//       phoneNumber,
//       address,
//       gender,
//     });

//     // Respond with a token
//     res.status(201).json({
//       _id: mechanic._id,
//       firstName: mechanic.firstName,
//       lastName: mechanic.lastName,
//       email: mechanic.email,
//       token: generateToken(mechanic._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find mechanic by email
//     const mechanic = await Mechanic.findOne({ email });
//     if (!mechanic) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the entered password with the stored hash
//     console.log("Entered Password:", password); // Log entered password ('123')
//     console.log("Stored Hashed Password:", mechanic.password); // Log the hashed password from DB
//     const isMatch = await bcrypt.compare(password, mechanic.password);
//     console.log("Password Match Result:", isMatch); // Should log true if passwords match

//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Return mechanic data and token
//     res.json({
//       _id: mechanic._id,
//       firstName: mechanic.firstName,
//       lastName: mechanic.lastName,
//       email: mechanic.email,
//       token: generateToken(mechanic._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, 'secret', { expiresIn: '30d' });
// };
const Mechanic = require('../models/mechanicModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, address, gender } = req.body;

  // Extract file information from req.files
  const idDocument = req.files['idDocument'][0].path; // Path to the uploaded ID document
  const photo = req.files['photo'][0].path; // Path to the uploaded photo

  try {
    // Check if the mechanic already exists
    const mechanicExists = await Mechanic.findOne({ email });
    if (mechanicExists) {
      return res.status(400).json({ message: 'Mechanic already exists' });
    }


    // Create a new mechanic with the hashed password and file paths
    const mechanic = await Mechanic.create({
      firstName,
      lastName,
      email,
      password, // Save the hashed password
      phoneNumber,
      address,
      gender,
      idDocument, // Save the ID document path
      photo, // Save the photo path
    });

    // Respond with the created mechanic's information and a JWT token
    res.status(201).json({
      _id: mechanic._id,
      firstName: mechanic.firstName,
      lastName: mechanic.lastName,
      email: mechanic.email,
      token: generateToken(mechanic._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find mechanic by email
    const mechanic = await Mechanic.findOne({ email });
    if (!mechanic) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hash
    console.log("Entered Password:", password); // Log entered password
    console.log("Stored Hashed Password:", mechanic.password); // Log the hashed password from DB
    const isMatch = await bcrypt.compare(password, mechanic.password);
    console.log("Password Match Result:", isMatch); // Should log true if passwords match

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return mechanic data and token
    res.json({
      _id: mechanic._id,
      firstName: mechanic.firstName,
      lastName: mechanic.lastName,
      email: mechanic.email,
      token: generateToken(mechanic._id),
      idDocument: mechanic.idDocument, // Include ID document path
      photo: mechanic.photo, // Include photo path
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, 'secret', { expiresIn: '30d' });
};
