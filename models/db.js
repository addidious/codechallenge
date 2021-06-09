const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('./user.model');
require('./inventory.model');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(!err){
        console.log("MongoDB connection succeeded")
    }
    else{
        console.log('Error in MongoDB connection : '+JSON.stringify(err,undefined,2));
    }
});


