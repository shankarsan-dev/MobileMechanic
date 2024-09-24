const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  mechanicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mechanic', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;