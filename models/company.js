const mongoose = require('mongoose');
// Creating schema for Company with name, description and the users under the company's data
const companySchema = new mongoose.Schema({
    companyname:{
        type: String,
        required: true
    },

    companyDescription:{
        type:String,
        required:true
    },

    userList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

const Company = mongoose.model('Company' , companySchema);
module.exports = Company;