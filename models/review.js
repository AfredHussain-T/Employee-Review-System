const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    recepient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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