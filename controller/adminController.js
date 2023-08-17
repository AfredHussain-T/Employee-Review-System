const Companies = require('../models/company');
const CompanyUsers = require('../models/user');
// controller for registering a company
module.exports.registerCompanyPage = async function(req, res){
    res.render('companyRegister');
}

// creating a company
module.exports.createCompany = async function(req , res){
    let company = await Companies.findOne({companyname : req.body.companyname});

    try {
        if(!company){
            let currCompany = await Companies.create({
                companyname: req.body.companyname,
                companyDescription: req.body.companyDescription,
            });
            if(req.body.password==req.body.confPass){
                await CompanyUsers.create({
                    name: req.body.name,
                    email:req.body.email,
                    password: req.body.password,
                    confPass: req.body.confPass,
                    empType: "admin",
                    empcompany: currCompany.id,
                });
            }
            else{
                console.log('Password missmatch');
                res.redirect('back');
            }
            
            res.redirect('back');
        }
    } catch (error) {
        console.log('Error' , error);
        res.redirect('back');
    }
}