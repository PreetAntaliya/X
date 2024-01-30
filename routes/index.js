const express = require('express')
const routes = express.Router();
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const passport = require('passport')

routes.get('/',authController.login)
routes.get('/home',homeController.home)
routes.post('/addUser', authController.addUser)
routes.post('/loginUser', passport.authenticate('local', {failureRedirect : '/', successRedirect : '/home'}), authController.loginUser)
routes.get('/logout',authController.logout)
routes.post('/addPost', homeController.addPost)


module.exports = routes