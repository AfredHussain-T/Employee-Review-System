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
        min: 0,
        max: 5,
        required: true
    }
}, { timestamps: true});


const review = mongoose.model('Review' , reviewSchema);
module.exports = review;