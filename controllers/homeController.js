const userModel = require('../models/userModel')
const passport = require('passport');


const home = (req, res) => {
    if (req.isAuthenticated()) {

        let user = req.user
        return res.render('index', {user});
    }
    return res.redirect('/');
};

module.exports = {
    home,
}