const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/x-twitter')
const db = mongoose.connection

db.on("connected", (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Db connected...`);
})