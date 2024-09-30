const express = require('express');
//const { signup, login } = require('../controllers/mechanicController');
const { protectAdmin } = require('../middleware/protectAdmin');
// const Admin  = require('../models/AdminModel');
const router = express.Router();


//router.post('/login', login);
