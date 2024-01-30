const userModel = require('../models/userModel')
const tweetModel = require('../models/tweetModel')
const passport = require('passport');


const home = async (req, res) => {
    let user = req.user;
    if (req.isAuthenticated()) {
        try {
            const allPosts = await tweetModel.find().sort({ createdAt: -1 });
            return res.render('index', { user, allPosts });
          } catch (error) {
            console.error(error);
          }
    }
    return res.redirect('/');
};

const addPost = async (req,res) => {
    const {  post_content } = req.body;
    try{
        const newPost = await tweetModel.create({
            // user,
            post_content,
            createdAt: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              }),
        })

        if(newPost){
            return res.redirect('/home')
        }
    } catch(err){
        console.log(err);
    }
}

module.exports = {
    home,
    addPost,
}