const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const Mechanic = require('./models/mechanicModel');
const Customer = require('./models/customerModel');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mobileMechanic', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));

app.use('/api/customers', customerRoutes);
app.use('/api/mechanics', mechanicRoutes);
// Backend route to update mechanic's location
app.post('/api/mechanics/updateLocation', async (req, res) => {
  const { mechanicId, latitude, longitude } = req.body;
  console.log(mechanicId);
  console.log('Received data:', { mechanicId, latitude, longitude });

  try {
    const updateResult = await Mechanic.updateOne(
      { _id: mechanicId },
      { $set: { latitude: latitude, longitude: longitude } }
    );
   
    console.log('Update Result:', updateResult);

    if (updateResult.nModified === 0) {
      return res.status(404).json({ error: 'Mechanic not found or location unchanged' });
    }

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});


io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Mechanic availability events
  socket.on('MsetAvailable', async (mechanicId) => {
    try {
      const result = await Mechanic.updateOne(
        { _id: mechanicId },
        { $set: { available: true, socketId: socket.id } }
      );
      console.log(`Mechanic ${mechanicId} update result:`, result);

      const updatedMechanic = await Mechanic.findById(mechanicId);
      console.log(`Mechanic ${mechanicId} after update:`, updatedMechanic);
      
    } catch (error) {
      console.error('Error setting mechanic as available:', error);
    }
  });

  socket.on('MsetUnavailable', async (mechanicId) => {
    try {
      const result = await Mechanic.updateOne(
        { _id: mechanicId },
        { $set: { available: false,socketId: null } }
      );
      console.log(`Mechanic ${mechanicId} update result:`, result);

      const updatedMechanic = await Mechanic.findById(mechanicId);
      console.log(`Mechanic ${mechanicId} after update:`, updatedMechanic);

    } catch (error) {
      console.error('Error setting mechanic as unavailable:', error);
    }
  });

  socket.on('Mdisconnect', async () => {
    try {
      const result = await Mechanic.updateOne(
        { socketId: socket.id },
        { $set: { available: false, socketId: null } }
      );
      if (result.matchedCount > 0) {
        console.log('Mechanic availability updated on disconnect:', result);
      } else {
        console.log('No mechanic found with socketId:', socket.id);
      }
    } catch (error) {
      console.error('Error updating mechanic availability on disconnect:', error);
    }
  });

  // Mechanic location update
  socket.on('MupdateLocation', async ({ mechanicId, latitude, longitude }) => {
    try {
      const result = await Mechanic.updateOne(
        { _id: mechanicId },
        { $set: { latitude, longitude } }
      );
      console.log(`Mechanic ${mechanicId} location update result:`, result);

      const updatedMechanic = await Mechanic.findById(mechanicId);
      io.emit('mechanicLocationUpdate', updatedMechanic);
      
    } catch (error) {
      console.error('Error updating mechanic location:', error);
    }
  });

        { _id: customerId },
        { $set: { available: true, socketId: socket.id } }
      );
      console.log(`Customer ${customerId} update result:`, result);

      const updatedCustomer = await Customer.findById(customerId);
  // // Customer availability events
  // socket.on('CsetAvailable', async (customerId) => {
  //   try {

  //     const result = await Customer.updateOne(
  //       { _id: customerId },
  //       { $set: { available: true, socketId: socket.id } }
  //     );
  //     console.log(`Customer ${customerId} update result:`, result);

  //     const updatedCustomer = await Customer.findById(customerId);
  //     console.log(`Customer ${customerId} after update:`, updatedCustomer);
      
  //   } catch (error) {
  //     console.error('Error setting customer as available:', error);
  //   }
  // });
 

  socket.on('CsetUnavailable', async (customerId) => {
    try {
      const result = await Customer.updateOne(
        { _id: customerId },
        { $set: { available: false, socketId: null } }
      );
      console.log(`Customer ${customerId} update result:`, result);

      const updatedCustomer = await Customer.findById(customerId);
      console.log(`Customer ${customerId} after update:`, updatedCustomer);
      
    } catch (error) {
      console.error('Error setting customer as unavailable:', error);
    }
  });

  socket.on('Cdisconnect', async () => {
    try {
      const result = await Customer.updateOne(
        { socketId: socket.id },
        { $set: { available: false, socketId: null } }
      );
      if (result.matchedCount > 0) {
        console.log('Customer availability updated on disconnect:', result);
      } else {
        console.log('No customer found with socketId:', socket.id);
      }
    } catch (error) {
      console.error('Error updating customer availability on disconnect:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
