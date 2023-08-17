const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyname:{
        type: String,
        required: true
    },

    companyDescription:{
        type:String,
        required:true
    },

    userList:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Company = mongoose.model('Company' , companySchema);
module.exports = Company;