const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required:true,
        lowercase:true
    },
    image:{
        type:String,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        trim:true,
        default: 0
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        default: 0
    }
},{timestamps: true});

module.exports = mongoose.model('Item',itemSchema);