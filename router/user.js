const express = require('express');
const route = express.Router();
const userController = require('../controllers/user_controller');
const passport  = require('passport');
const { Router } = require('express');
route.use('/home',passport.checkAuthentication,userController.home);

route.use('/sign-up',userController.signup);

route.use('/sign-in',userController.signin);



route.post('/create',userController.create);

route.post('/createSession',passport.authenticate('local',{failureRedirect:'users/sign-in'}),userController.createSession);

route.get('/sign-out',userController.destroySession);

module.exports = route;