const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  mechanicId: {
    type: Schema.Types.ObjectId,
    ref: 'Mechanic',
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // vechicleNumber:{
  //   type: String
  // },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Completed',"declined","timedout",'on the way', 'arrived', 'completed'],
    default: 'Pending'
  },


  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
