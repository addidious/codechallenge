const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    name :{
        type: String,
    },
    password:{
        type: String,
    },
    saltSecret:{
        type: String
    },
    dateCreated:{
        type: Date,
        default:Date.now
    }
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

module.exports = mongoose.model('User',userSchema);
