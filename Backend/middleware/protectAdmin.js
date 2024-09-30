const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel'); // Adjust the path as needed

const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, 'your_jwt_secret'); // Use your secret key

      // Find the admin by ID and exclude the password field
      req.admin = await Admin.findById(decoded.id).select('-password');

      // If the admin is not found, send a 401 response
      if (!req.admin) {
        return res.status(401).json({ message: 'Not authorized, admin not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectAdmin };
