const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customerRoutes');
const mechanicRoutes = require('./routes/mechanicRoutes');
const Mechanic = require('./models/mechanicModel');
const Customer = require('./models/customerModel');
const Service = require('./models/ServiceModel');
const Rating = require("./models/RatingModel");
const Admin = require('./models/AdminModel');
const jwt = require('jsonwebtoken');
const {protectAdmin} = require("./middleware/protectAdmin");
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');


require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST','PUT','DELETE'],
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(fileUpload());

mongoose.connect('mongodb://127.0.0.1:27017/mobileMechanic', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Database connection error:', err));

  // app.get('/api/route', async (req, res) => {
  //   const { mechanicLongitude, mechanicLatitude, customerLongitude, customerLatitude } = req.query;
  //   try {
  //     console.log("mlonglat : "+mechanicLongitude +" "+ mechanicLatutude);
  //     const osrmResponse = await axios.get(
  //       `https://router.project-osrm.org/route/v1/driving/${mechanicLongitude},${mechanicLatitude};${customerLongitude},${customerLatitude}?overview=full&geometries=geojson`
  //     );
  //     res.json(osrmResponse.data);
  //   } catch (error) {
  //     res.status(500).send('Error fetching route data');
  //   }
  // });
app.use('/api/customers', customerRoutes);
app.use('/api/mechanics', mechanicRoutes);
app.get('/api/mechanics/:mechanicId/average-rating', async (req, res) => {
  try {
    const mechanicId = req.params.mechanicId;
    console.log("mechanic id: " + mechanicId);
    
    // Fetch all ratings for the mechanic
    const ratings = await Rating.find({ mechanicId: mechanicId }); // Assuming mechanicId is stored as a string

    // Calculate the average rating
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length 
      : 0; // No ratings found

    return res.json({ averageRating });
  } catch (error) {
    console.error('Error fetching average rating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/mechanics/services/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const service = await Service.find({mechanicId:req.params.id}).populate('customerId','firstName lastName phoneNumber') // Populate customer details
    .populate('mechanicId', 'firstName lastName'); // Populate mechanic details;
    
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // res.json({ message: 'services fetched' })
    res.json(service);
    console.log(service)
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/api/customers/profile/:customerId", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    console.log("customerId: "+ customerId);

    // Fetch customer by ID
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update the customer's profile fields
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.phoneNumber = phoneNumber;

    // If password is provided, update it (with encryption)
    if (password) {
      const salt = await bcrypt.genSalt(10);
      customer.password = await bcrypt.hash(password, salt);
    }

    await customer.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/customers/services/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const service = await Service.find({customerId:req.params.id}).populate('customerId', 'firstName lastName') // Populate customer details
    .populate('mechanicId', 'firstName lastName phoneNumber'); // Populate mechanic details;
    if (!service) return res.status(404).json({ message: 'Service not found' });

    // res.json({ message: 'services fetched' })
    res.json(service);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put('/api/admin/mechanics/approve/:id', async (req, res) => {
  try {
    const mechanicId = req.params.id;

    // Update the mechanic's verification status
    const mechanic = await Mechanic.findByIdAndUpdate(mechanicId, { verification: 'verified' }, { new: true });

    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    // Emit the socket event with the verified mechanic's data
    // io.emit('mechanicVerified', mechanic);

    res.status(200).json({ message: 'Mechanic approved successfully', mechanic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve mechanic' });
  }
});


app.get('/api/admin/services',protectAdmin, async (req, res) => {
  try {
    const services = await Service.find()
      .populate('customerId', 'firstName lastName') // Populate customer details
      .populate('mechanicId', 'firstName lastName'); // Populate mechanic details
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a service by ID
// app.delete('/api/admin/services/:id',async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Service not found' });

//     await service.remove();
//     res.json({ message: 'Service deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
app.delete('/api/admin/services/:id', async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/api/admin/customers/all',protectAdmin, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a customer by ID
app.delete('/api/admin/customers/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    await customer.remove();
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/admin/mechanics',protectAdmin, async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch mechanics' });
  }
});
app.delete('/api/admin/mechanics/:id', async (req, res) => {
  try {
    await Mechanic.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Mechanic deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete mechanic' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Check if the password matches
    const isMatch = await admin.comparePassword(password); // Ensure this method is defined in your admin schema
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'your_jwt_secret', { expiresIn: '1h' }); // Use your secret key

    // Send the token back to the client
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/create-admin', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation (optional but recommended)
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists.' });
    }

    // Create a new admin
    const newAdmin = new Admin({ firstName, lastName, email, password });
    await newAdmin.save();

    return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/services/rate', async (req, res) => {
  const { customerId, mechanicId,rating,serviceId} = req.body;
 // const { serviceId } = req.params;
  console.log("service id "+serviceId)
  console.log("customerId: "+customerId)
  console.log("rating " +rating);
  console.log("mechanic id"+mechanicId);
  // console.log("comment" +comment);
  try {
    const newRating = new Rating({
      serviceId,
      customerId,
      mechanicId,
      rating
  
    });

    await newRating.save();
    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });

    }
    io.to(mechanic.socketId).emit('ratingNotification', {rating});
    
    return res.status(201).json({ message: 'Rating submitted successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'Error submitting rating', error });
  }
});

app.get('/api/services/:serviceId/details', async (req, res) => {
  try {
    // Populate mechanic and customer details in the service document
    const service = await Service.findOne({ _id: req.params.serviceId })
      .populate('customerId', 'firstName lastName email phoneNumber') // Get specific customer details
      .populate('mechanicId', 'firstName lastName email phoneNumber'); // Get specific mechanic details

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
app.put('/api/services/:serviceId/status', async (req, res) => {
  try {
  
    const serviceId = req.params.serviceId;
    const { status } = req.body;

    // Update the service status
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Get the customerId to send the notification
    const customerId = updatedService.customerId._id; // Assuming customerId is a reference
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // Notify customer about the status change
    console.log("customer id:" +customerId)
    console.log("customer socket id "+customer.socketId)
    io.to(customer.socketId).emit('serviceStatusUpdate', { status, serviceId });

    res.json({ message: 'Service status updated and customer notified', updatedService });
  } catch (error) {
    console.error('Error updating service status:', error);
    res.status(500).json({ message: 'Error updating service status', error });
  }
});
app.put('/api/mechanics/mechanic/:id/availability', async (req, res) => {
  try {
    const mechanicId = req.params.id;
    const { available } = req.body;

    const updatedMechanic = await Mechanic.findByIdAndUpdate(
      mechanicId,
      { available },
      { new: true }
    );

    if (!updatedMechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }

    res.json({ message: 'Availability updated', updatedMechanic });
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability', error });
  }
});
app.get('/api/mechanics/location/:id', async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    res.json({ latitude: mechanic.latitude, longitude: mechanic.longitude });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to get customer location
app.get('/api/customers/location/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ latitude: customer.latitude, longitude: customer.longitude });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


app.post('/api/requests', async (req, res) => {
  const {  mechanicId,
    customerId, latitude,longitude,
    vehicleType,
    description} = req.body;
    
console.log(customerId);
  try {
    const service = new Service({
      customerId,
      mechanicId,
      vehicleType,
      description,
    });
    await service.save();

    const mechanic = await Mechanic.findById(mechanicId);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    console.log("mechanic socketid:"+mechanic.socketId);
    io.to(mechanic.socketId).emit('newRequest', {
      serviceId: service._id,
      customerId,
      vehicleType,
      description,
      CfirstName : customer.firstName,
      ClastName: customer.lastName,
    });
    
    res.status(201).json({ message: 'Request sent and mechanic notified', service });
  } catch (error) {
    console.error('Error creating service request:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/services/accept', async (req, res) => {
  const { serviceId, mechanicId, customerId } = req.body;
  console.log("serviceid"+serviceId);
  try {
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { status: 'accepted' }, 
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Notify the customer of the acceptance
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Send notification to the customer
    io.to(customer.socketId).emit('requestAccepted', {
      serviceId,
      mechanicId,
      message: 'Your request has been accepted by the mechanic.',
    });

    res.status(200).json({ message: 'Request accepted successfully', service });
  } catch (error) {
    console.error('Error accepting service request:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
app.post('/api/services/decline', async (req, res) => {
  const { serviceId, mechanicId, customerId } = req.body;
  console.log("serviceid"+serviceId);
  try {
    const service = await Service.findByIdAndUpdate(
      serviceId,
      { status: 'declined' }, 
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Notify the customer of the acceptance
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Send notification to the customer
    io.to(customer.socketId).emit('requestDeclined', {
      serviceId,
      mechanicId,
      message: 'Your request has been Declined by the mechanic.',
    });

    res.status(200).json({ message: 'Request declined successfully', service });
  } catch (error) {
    console.error('Error declining service request:', error.message);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/customers/updateLocation', async (req, res) => {
  const { customerId, latitude, longitude } = req.body;
  
  console.log(customerId);
  console.log('Received data:', { customerId, latitude, longitude });

  try {
    const updateResult = await Customer.updateOne(
      { _id: customerId },
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

  // Customer availability events
  socket.on('CsetAvailable', async (customerId) => {
    try {
      console.log("customer id : "+ customerId)
      const result = await Customer.updateOne(
        { _id: customerId },
        { $set: { available: true, socketId: socket.id } }
      );
      console.log(`Customer ${customerId} update result:`, result);

      const updatedCustomer = await Customer.findById(customerId);
      console.log(`Customer ${customerId} after update:`, updatedCustomer);
      
    } catch (error) {
      console.error('Error setting customer as available:', error);
    }
  });
 

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
