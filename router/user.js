const express = require('express');
const route = express.Router();
const userController = require('../controllers/user_controller');
route.use('/home',userController.home);

module.exports = route;