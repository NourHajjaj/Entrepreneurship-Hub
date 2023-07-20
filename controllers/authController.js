const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');

exports.register = async (req,res,next) => {
    try{

        // check if user exists
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).json({message:'User already exists'});
        }

        // check if email is valid
        const validEmail = validator.isEmail(req.body.email);
        if(!validEmail){
            return res.status(400).json({massage:'Your email is not valid, please enter a valid one.'});
        }

        // check pass and confirm pass are identical
        if(req.body.password !== req.body.confirmPassword){
            return res.status(400).json({message:'password and confirm password are not identical'});
        }

        // encrypt la password
        // const encryptPass = await bcrypt.genSalt(12);
        // req.body.password = await bcrypt.hash(req.body.password,encryptPass);

        // create user
        const newUser = await User.create(req.body);

        const {password,...UserInfo} = newUser._doc;

        return res.status(201).json({message:'User created!',data: UserInfo});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

exports.login = async (req,res,next) => {
    try{
        // user exist or no
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(409).send({message:'User does not exist please sign up before logging in'});
        }
        // validate lal password
        // const validatePassword = await bcrypt.compare(req.body.password, user.password);
        const validatePassword = await user.comparePasswords(req.body.password,user.password);
        if(!validatePassword){
            return res.status(400).json({message:'email or password is incorrect'});
        }

        return res.status(200).json({message:'login successful'});
    }catch(err){
        console.log(err);
        return res.status(500).send({message:'internal server error'});
    }
}