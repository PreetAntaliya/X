const userModel = require('../models/userModel')
const passport = require('passport');

const addUser = async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {

        const discriminator = Math.floor(1000 + Math.random() * 9000);
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.render('login', { message: 'User with this email already exists' });
        }


        // if (req.files && req.files["profile_pic"]) {
        //     profile_pic = req.files["profile_pic"].path;
        // }


        let createUser = await userModel.create({
            name: name.replace(/ /g, '_'),
            email,
            phone,
            password,
            discriminator,
            username: `@${name.replace(/ /g, '_')}#${discriminator}`,
            profile_pic: req.files["profile_pic"][0].path.replace(/\\/g, '/'),
        });

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
    if(req.isAuthenticated()){
        return res.redirect('/home');
    }
    const message = '';
    return res.render('login', { message });
}

const loginUser = (req, res, next) => {
        return res.redirect('/home')
    
};

const logout = (req,res) => {
    req.logout((err)=>{
        if(err){
            console.log("user not logout");
            return false;
        }
        return res.redirect('/');
    })
}

module.exports = {
    addUser,
    login,
    loginUser,
    logout,
}
