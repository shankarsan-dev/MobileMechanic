
// const express = require('express');
// const router = express.Router();
// const Service = require('../models/ServiceModel');
// const io = require('../'); // Assuming you have a central socket instance
// const Mechanic = require('../models/Mechanic'); // Mechanic model to get mechanic's details

// // Handle service request
// router.post('/requests', async (req, res) => {
//   const { customerId, mechanicId, vehicleType, description, latitude, longitude } = req.body;

//   try {
//     // Create a new service request
//     const service = new Service({
//       customerId,
//       mechanicId,
//       vehicleType,
//       description,
//     });
//     await service.save();

//     // Notify the mechanic via socket
//     const mechanic = await Mechanic.findById(mechanicId);
//     if (mechanic) {
//       io.to(mechanic.socketId).emit('newRequest', {
//         serviceId: service._id,
//         customerId,
//         vehicleType,
//         description,
//         location: { latitude, longitude }
//       });
//       return res.status(201).json({ message: 'Request sent and mechanic notified', service });
//     } else {
//       return res.status(404).json({ message: 'Mechanic not found' });
//     }

//   } catch (error) {
//     console.error('Error creating service request:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
