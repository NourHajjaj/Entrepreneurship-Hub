const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

exports.connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_ULR);
        console.log('Database Connected');
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}