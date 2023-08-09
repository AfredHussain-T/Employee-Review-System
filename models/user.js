const mongoose = require('mongoose');

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
        ref: 'company',
        required: true
    },
    empType:{
        type: String,
        required: true
    },
    feedRecieved:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }],
    feedPending:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {timestamps: true});


const User = mongoose.model('User' , userSchema);
module.exports = User;