const express = require('express')
const routes = express.Router();
const homeController = require('../controllers/homeController')
const passport = require('passport')

routes.get('/',homeController.login)
routes.get('/home',homeController.home)
routes.post('/addUser', homeController.addUser)
routes.post('/loginUser', homeController.loginUser)


module.exports = routes