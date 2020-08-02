const express = require('express');
const route = express.Router();
const userController = require('../controllers/user_controller');
const { Router } = require('express');
route.use('/user',userController.profile);

route.use('/sign-in',userController.signin);

route.use('/sign-up',userController.signup);

route.post('/create',userController.create);

route.post('/createSession',userController.createSession);

module.exports = route;