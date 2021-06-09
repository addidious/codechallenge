const {userValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register =  async (req,res)=>{
    // Validation
    const { error } = userValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if name already exists in DB
    const nameExists = await User.findOne({name:req.body.name});
    if(nameExists) return res.status(400).send('Name already exists');

    const user = new User({
        name:req.body.name,
        password:req.body.password, 
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
};

const login = async(req,res)=>{
    // Validation
    const { error } = userValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if username exists in DB
    const nameExists = await User.findOne({name:req.body.name});
    if(nameExists==null) return res.status(400).send('Username or Password is wrong');
    
    // Check if password matches
    const validPassword = await bcrypt.compare(req.body.password,nameExists.password);
    if(!validPassword) return res.status(400).send('Username or Password is wrong');
    
    // Create and assign JWT
    const token = jwt.sign({ _id : nameExists._id },process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(JSON.stringify(token));
    
}

module.exports = {
    register,
    login
}