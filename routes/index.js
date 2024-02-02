const express = require('express')
const routes = express.Router();
const homeController = require('../controllers/homeController')
const authController = require('../controllers/authController')
const passport = require('passport')
const multer = require('multer')
const path = require('path');

const generateRandomName = () => {
    const length = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null, "uploads")
    },
    filename : (req,file,cb) => {
        let img = generateRandomName() + path.extname(file.originalname);
        cb(null, img);
    }
})

const upload = multer({ storage: storage }).fields([
    { name: "post_imgs", maxCount: 4 },
    { name: "profile_pic", maxCount: 1 },
  ]);


routes.get('/',authController.login)
routes.get('/home',homeController.home)
routes.post('/addUser',upload , authController.addUser)
routes.post('/loginUser', passport.authenticate('local', {failureRedirect : '/', successRedirect : '/home'}), authController.loginUser)
routes.get('/logout',authController.logout)
routes.post('/addPost',upload, homeController.addPost)
routes.get('/deletePost',homeController.deletePost)
routes.get('/editPost',homeController.editPost)
routes.post('/editPost',upload,homeController.updatePost)
routes.get('/:username',homeController.profile)



module.exports = routes