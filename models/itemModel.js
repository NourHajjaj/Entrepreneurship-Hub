const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "NGO",
        required:true
    },
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
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "onModel"
        },
    ],
    onModel: {
        type: String,
        enum: ["User","NGO"]
    }
},{timestamps: true});

module.exports = mongoose.model('Item',itemSchema);