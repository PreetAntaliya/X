const express = require("express");
const path = require("path");
const port = 8000;
const app = express();
const db = require('./config/db')

const passport = require('passport');
const passportLocal = require('./config/passport_st');
const session = require('express-session');

app.use(session({
    name : 'xyz',
    secret : 'xyz@0078',
    resave : true,
    saveUninitialized : true, 
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))

app.set('view engine','ejs')
app.use(express.urlencoded())

app.use(passport.initialize())
app.use(passport.session())

app.use("/public",express.static(path.join(__dirname,'public')))

app.use('/',require('./routes/index'))

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server Was Running...`);
})
