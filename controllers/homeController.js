const userModel = require('../models/userModel')
const passport = require('passport');


const home = (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('index');
    }
    return res.redirect('/');
};


const addUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        let createUser = await userModel.create({
            name,
            email,
            phone,
            password,
        });

        console.log('Inserted User:', createUser);

        if (createUser) {
            console.log('User successfully added');
            res.redirect('/home');
        } else {
            console.log('Something went wrong...');
            return false;
        }
    } catch (err) {
        console.log(err);
        return res.send('Internal Server Error');
    }
};



const login = (req,res) => {
    return res.render('login')
}

const loginUser = (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/' })(req, res, next);
};




module.exports = {
    home,
    login,
    addUser,
    loginUser,
}