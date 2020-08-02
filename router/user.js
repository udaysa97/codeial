const express = require('express');
const route = express.Router();
const userController = require('../controllers/user_controller');
route.use('/home',userController.home);

route.use('/sign-in',userController.signin);

route.use('/sign-up',userController.signup);

route.post('/create',userController.create);

module.exports = route;