const mongoose = require('mongoose');

// Creating schema for reviews received with Sender, receiver and the comments along with rating

const reviewSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    recepient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    comment:{
        type: String,
        required: true
    },

    rating:{
        type: Number,
        required: true
    }
}, { timestamps: true});


const Review = mongoose.model('Review' , reviewSchema);
module.exports = Review;