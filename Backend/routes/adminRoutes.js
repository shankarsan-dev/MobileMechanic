const express = require('express');
const { signup, login } = require('../controllers/mechanicController');
const { protectAdmin } = require('../middleware/protectAdmin');
const Admin  = require('./models/AdminModel');

router.post('/login', login);
