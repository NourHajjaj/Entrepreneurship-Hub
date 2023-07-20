const User = require('../models/userModel');

// retrieve the specified user from the database (by email)
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

// retrieve all users from the database
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

// change password
exports.changePassword = async (req,res) => {
    try{

        // oldPassword
        // newPassword
        // confirmNewPassword

        // make sure all fields are sent
        if(req.body.oldPassword == '' ||
            req.body.newPassword == '' ||
            req.body.confirmNewPassword == ''){
                return res.status(400).send({
                    success: false,
                    message: 'All fields are required'
                });
            }
        
        if(req.body.oldPassword == req.body.newPassword){
            return res.status(400).send({
                success: false,
                message: 'New password should be different from the old one'
            });
        }

        const user = await User.findById(req.params.id);
        
        if(!(await user.comparePasswords(req.body.oldPassword, user.password))){
            return res.status(400).send({
                success: false,
                message: 'Old password does not match the one stored in database'
            });
        }

        if(req.body.newPassword != req.body.confirmNewPassword){
            return res.status(400).send({
                success: false,
                message: 'New password and confirm new password should be identical'
            });
        }

        user.password = req.body.newPassword;

        await user.save();

        return res.status(200).send({
            success: true,
            message: 'Password was updated successfully'
        });

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}

// update user name field based on email
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

// delete a user based on their email
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

// delete all users in database
exports.deleteAllUsers = async (req,res) => {
    try{

        const deleted = await User.deleteMany({});

        return res.status(200).json({message:' All users deleted successfully', data:deleted});

    }catch(err){
        console.log(err);
        return res.status(500).send({message:err.message});
    }
}