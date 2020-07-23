const express = require('express');
const route = express.Router();
const homeController = require('../controllers/home_controller');
console.log("Router connected");
 route.get('/',homeController.home);
route.use('/users', require('./user'));
module.exports = route;