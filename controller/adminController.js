const CompanyUsers = require('../models/user');
const Companies = require('../models/company');


// controller for registering a company
module.exports.registerCompanyPage = async function (req, res) {
    res.render('companyRegister' , {
        title: 'ERS | Register Company'
    });
}

// creating a company
module.exports.createCompany = async function (req, res) {
    let Exist = await CompanyUsers.findOne({ email: req.body.email });
    let company = await Companies.findOne({ companyname: req.body.companyname });

    try {
        if (!Exist) {
            if (!company) {
                let currCompany = await Companies.create({
                    companyname: req.body.companyname,
                    companyDescription: req.body.companyDescription,
                });
                if (req.body.password == req.body.confPass) {
                    await CompanyUsers.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        confPass: req.body.confPass,
                        empType: "admin",
                        Rank: 1,
                        empcompany: currCompany.id,
                    });
                }
                else {
                    req.flash('error', 'Password missmatch');
                    res.redirect('back');
                }

                res.redirect('back');
            }
        }
        else {
            req.flash('error', 'Please try different email...');
            res.redirect('back');
        }
    } catch (error) {
        console.log('Error', error);
        res.redirect('back');
    }
}

// Creating a User by Admin
module.exports.createUser = async function(req,res){
    let ExistUser = await CompanyUsers.findOne({ email: req.body.email });
    try {
        if (ExistUser) {
            req.flash('error', 'Use Different Mail Id / Username...');
            res.redirect('back');
        }
        else {

            if (req.body.password != req.body.confPass) {
                req.flash('error', 'User Not Created.., Please validate Password While confirming');
                return res.redirect('back');
            }
            else {
                let adminCompany = req.user.empcompany;
                let createdUser = await CompanyUsers.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    confPass: req.body.confPass,
                    empcompany: adminCompany,
                    empType: "employee",
                    Rank: Number.MAX_VALUE,
                });
                
                await Companies.findByIdAndUpdate(adminCompany, {$push : {userList: createdUser.id}});
                // console.log(userCompany.userList);
                req.flash('success', 'User Created By Admin');
                return res.redirect('back');
            }
        }
    } catch (error) {
        req.flash('error', 'Error...!')
        console.log('Error: ', error);
        return
    } 
}

// admin page view
module.exports.viewAdmin = async function (req, res) {
    if(req.isAuthenticated()){
        if (req.user.empType != "admin") {
            return res.redirect('back');
        }
        else {
            let admin = req.user;
            let adminCompany = req.user.empcompany;
            const companyUsers = await Companies.findById(adminCompany).populate('userList');
            // const companyUsers = com.userList;
            let filteredList = companyUsers.userList.filter((employee) => {
                return admin.Rank < employee.Rank;
            })
            return res.render('admin', {
                title: 'ERS | Admin Page',
                EmployeeList: filteredList
            });
        }
    }
    else{
        return res.redirect('/');
    }
}

module.exports.employeeProfileView = async function(req,res){
    try {
        if(req.isAuthenticated()){
            let currentEmp = await CompanyUsers.findById(req.params.emp_id).populate('empcompany').populate({
                path: 'empcompany',
                populate: {
                    path: 'userList'
                }
            }).populate('feedReceived');
        
            // if(currentEmp.feedReceived){
            //     const len = currentEmp.feedReceived.length;
            //     let rateSum = 0
            //     for(let i=0;i<len; i++){
            //         rateSum+=currentEmp.feedReceived[i].rating;
            //     }
            //     const avg = rateSum/len;
            //     currentEmp.rating = avg;
            // }
            currentEmp.save();
            
            let companyUserList = currentEmp.empcompany.userList.filter((employee) => {
                return employee.id != currentEmp.id;
            })
            console.log(currentEmp);
            return res.render('employeeProfileView' , {
                title: 'ERS | Employee Profile',
                currentEmp,
                companyUserList
            });
        } else{
            return res.redirect('/');
        }
    } catch (error) {
        req.flash('error' , 'Unauthorized');
        res.redirect('back');
    }
}

// For Demoting or promoting an employee
module.exports.levelUpDown = async function(req,res){
    let employee = await CompanyUsers.findById(req.params.empID);
    // console.log('ajhsdbkjasfhksdjfdsjbfkjsdbf' , employee);
    let currUser = req.user;
    if(employee.empType == "admin"){
        employee.Rank = Number.MAX_VALUE;
        employee.empType = "employee";
    } 
    else{
        employee.Rank = currUser.Rank+1;
        employee.empType = "admin";
    }
    employee.save();
    console.log('ajhsdbkjasfhksdjfdsjbfkjsdbf' , employee);
    res.redirect('back')
}

module.exports.deleteEmployee = async function(req,res){
    try {
        let user = await CompanyUsers.findByIdAndDelete(req.params.delId);
        req.flash('success' , 'Successfully Removed An Employee');
        res.redirect('back');
    } catch (error) {
        req.flash('error' , 'Error');
        res.redirect('back');
    }
}