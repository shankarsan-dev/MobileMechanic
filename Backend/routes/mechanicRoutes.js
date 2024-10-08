const express = require('express');
const { signup, login } = require('../controllers/mechanicController');
const { protectMechanic } = require('../middleware/authMechanicMiddleware');
const Mechanic = require('../models/mechanicModel'); // Assuming this is the correct path to your model
const upload = require('../middleware/multer'); 
const router = express.Router();

// Mechanic routes
// router.post('/signup', signup);
// router.post('/signup', upload.fields([{ name: 'idDocument', maxCount: 1 }, { name: 'photo', maxCount: 1 }]),signup);
router.post('/signup', upload.fields([{ name: 'idDocument', maxCount: 1 }, { name: 'photo', maxCount: 1 }]), (req, res, next) => {
  // Check if both files are uploaded
  if (!req.files['idDocument'] || !req.files['photo']) {
    return res.status(400).json({ message: 'Both ID document and photo are required.' });
  }
  next();
}, signup);

router.post('/login', login);

// Example of a protected route
router.get('/profile', protectMechanic, (req, res) => {
  res.json({
    _id: req.mechanic._id,
    firstName: req.mechanic.firstName,
    lastName: req.mechanic.lastName,
    email: req.mechanic.email,
    phoneNumber: req.mechanic.phoneNumber,
    address: req.mechanic.address,
  });
});

router.post('/updateCharge', async (req, res) => {
  const { mechanicId, charge } = req.body;
  console.log('Received mechanicId:', mechanicId);
  console.log('Received charge:', charge);

  if (!mechanicId || charge == null) {
    console.error('Mechanic ID and charge are required.');
    return res.status(400).send('Mechanic ID and charge are required.');
  }

  try {
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      console.error('Mechanic not found.');
      return res.status(404).send('Mechanic not found.');
    }

    mechanic.serviceCharge = charge;
    await mechanic.save();

    console.log('Service charge updated successfully.');
    res.status(200).send('Service charge updated successfully.');
  } catch (error) {
    console.error('Error updating service charge:', error);
    res.status(500).send('Error updating service charge.');
  }
});

router.get('/:mechanicId/status', async (req, res) => {
  const { mechanicId } = req.params;

  try {
    const mechanic = await Mechanic.findById(mechanicId);
      console.log("mechanic id2: " + mechanicId);
    if (!mechanic) {
      return res.status(404).json({ error: 'Mechanic not found' });
    }

    console.log(mechanic.verification);
    // Send mechanic's verification status
    return res.json({ status: mechanic.verification });
  } catch (error) {
    console.error('Error fetching mechanic status:', error);
    console.log("status"+ res.body.st);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/:mechanicId/updateStatus', async (req, res) => {
  const { mechanicId } = req.params;
  const { verification } = req.body;

  try {
    // Find mechanic by ID and update the verification status
    const mechanic = await Mechanic.findByIdAndUpdate(
      mechanicId,
      { verification },
      { new: true }
    );

    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    // Return success response with updated status
    return res.status(200).json({ message: 'Mechanic status updated', status: mechanic.verification });
  } catch (error) {
    console.error('Error updating mechanic status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;

