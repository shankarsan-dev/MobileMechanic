//models/mecanicModel.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mechanicSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  latitude: { type: Number, default: null },

  longitude: { type: Number, default: null },

  socketId: { type: String, default: null },
  
  available: { type: Boolean, default: false },
  serviceCharge: { type: Number, min: 100, max: 10000  }
});

// Encrypt password before saving
mechanicSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


const Mechanic = mongoose.model("Mechanic", mechanicSchema);

module.exports = Mechanic;
