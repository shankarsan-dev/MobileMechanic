// const Mechanic = require('../models/mechanicModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Sign up a new mechanic
// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, password, phoneNumber, address,
//     gender} = req.body;

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
//       password,
//       phoneNumber,
//       address,
//       gender
//     });

//     res.status(201).json({
//       _id: mechanic._id,
//       firstName: mechanic.firstName,
//       lastName: mechanic.lastName,
//       email: mechanic.email,
//       phoneNumber: mechanic.phoneNumber,
//       address: mechanic.address,
//       token: generateToken(mechanic._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Log in an existing mechanic
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the mechanic by email
//     const mechanic = await Mechanic.findOne({ email });

//     // Check if the mechanic exists and if the password matches
//     if (mechanic && (await bcrypt.compare(password, mechanic.password))) {
//       res.json({
//         _id: mechanic._id,
//         firstName: mechanic.firstName,
//         lastName: mechanic.lastName,
//         email: mechanic.email,
//         phoneNumber: mechanic.phoneNumber,
//         token: generateToken(mechanic._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
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

// Sign up a new mechanic
// exports.signup = async (req, res) => {
//   const { firstName, lastName, email, password, phoneNumber, address, gender } = req.body;
//   console.log(req.body); // Log form fields
//   console.log(req.files);
//   // Access uploaded files from req.files
//   const idDocument = req.files['idDocument'] ? req.files['idDocument'][0].path : null;
//   const photo = req.files['photo'] ? req.files['photo'][0].path : null;

//   try {
//     // Check if the mechanic already exists
//     const mechanicExists = await Mechanic.findOne({ email });

//     if (mechanicExists) {
//       return res.status(400).json({ message: 'Mechanic already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new mechanic
//     const mechanic = await Mechanic.create({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword, // Save the hashed password
//       phoneNumber,
//       address,
//       gender,
//       idDocument, // Store the path to the uploaded identification document
//       photo, // Store the path to the uploaded photo
//     });

//     res.status(201).json({
//       _id: mechanic._id,
//       firstName: mechanic.firstName,
//       lastName: mechanic.lastName,
//       email: mechanic.email,
//       phoneNumber: mechanic.phoneNumber,
//       address: mechanic.address,
//       token: generateToken(mechanic._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, address, gender } = req.body;
console.log(firstName);
  try {
    
    // Check if the mechanic already exists
    const mechanicExists = await Mechanic.findOne({ email });

    if (mechanicExists) {
      return res.status(400).json({ message: 'Mechanic already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new mechanic
    const mechanic = await Mechanic.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      gender,
      idDocument: req.files['idDocument'][0].path, // Save the path of the uploaded file
      photo: req.files['photo'][0].path, // Save the path of the uploaded file
    });

    res.status(201).json({
      _id: mechanic._id,
      firstName: mechanic.firstName,
      lastName: mechanic.lastName,
      email: mechanic.email,
      phoneNumber: mechanic.phoneNumber,
      address: mechanic.address,
      token: generateToken(mechanic._id),
    });
  } catch (error) {
    console.error(error); // Log the error
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
