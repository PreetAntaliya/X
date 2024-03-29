const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    profile_pic: {
        type : String,
        required : true
    },
    phone: {
        type : Number,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    discriminator: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
})

const user = mongoose.model('user',userSchema);
module.exports = user