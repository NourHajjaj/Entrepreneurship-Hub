const User = require('../models/userModel');

exports.getUser = async (req,res) => {
    try{

        if(!req.body.email){
            return res.status(400).send({message:'Email is required'});
        }

        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({data: user});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

exports.getAllUsers = async (req,res) => {
    try{

        const users = await User.find();

        if(users.length <= 0){
            return res.status(400).json({message: 'They are no users registered'});
        }

        return res.status(200).json({data: users});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

exports.updateUser = async (req,res) => {
    try{

        if(!req.body.newUsername || req.body.newUsername == ''){
            return res.status(400).json({message: 'name can not be empty'});
        }

        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const updatedUser = await User.updateOne(
            {email:req.body.email},
            {$set : {name:req.body.newUsername}}
            );

        return res.status(200).json({message:'updated successfully', data:updatedUser});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

exports.deleteUser = async (req,res) => {
    try{

        const user = await User.findOne({email:req.body.email});

        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const deleted = await User.deleteOne({email:req.body.email});

        return res.status(200).json({message:'user deleted successfully', data:deleted});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

exports.deleteAllUsers = async (req,res) => {
    try{

        const deleted = await User.deleteMany({});

        return res.status(200).json({message:' All users deleted successfully', data:deleted});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}