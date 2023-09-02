const mongoose = require('mongoose');


// Creating schema for User with the required details

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    confPass:{
        type: String,
        required: true
    },
    empcompany:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    empType:{
        type: String,
        required: true
    },
    Rank:{
        type: Number,
        required: true
    },
    feedReceived:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    feedPending:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    rating: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


const User = mongoose.model('User' , userSchema);
module.exports = User;