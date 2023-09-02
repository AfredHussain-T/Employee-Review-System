# Employee Review System
* This Application is used to provide the feedbacks to other employees.
* NodeJs, expressJs, mongoDB and ejs technologies are used in creation of this application.
## Functioning:
* After opening the application it mainly have three different pages where a user can sign in if he/she exists.
* If the user is not registered in any company then they can signup by navigating into the signup page.
* If you don't the required company in the drop down while registering then the company is not yet created. We can create one by navigating to the company register page.
* Once the company is registered a user will be created by default who's role is admin with least rank.
* This admin can see all the users who are under them and they can view the profiles of the users and also can ask other users to provide feed back for a particular employee.
* The admin can promote or demote any user to admin role or employee role when ever they want.
* Admin can Add a user under the company and also can remove the user if not required.
* Only admin can see who has provided feedback to a user. and what rating has been given.
## Folder Structure:

~Habit-Tracker
    |
    |               |--->css
    |--->assets---->|--->images
    |
    |
    |
    |--->config---->|--->mongoose.js
    |               |--->passport_local.js
    |               |--->setFlash.js
    |
    |
    |--->controllers-->|-->adminController.js
    |                  |-->homeController.js
    |                  |-->userController.js
    |
    |
    |--->models---->|-->company.js
    |               |-->review.js
    |               |-->user.js
    |
    |
    |
    |
    |--->routes---->|-->adminRoutes.js
    |               |-->indexRoutes.js
    |               |-->userRoutes.js
    |
    |
    |
    |              
    |--->views---->|--->admin.ejs
    |              |--->companyRegister.ejs
    |              |--->employeeProfileView.ejs
    |              |--->home.ejs
    |              |--->noty.ejs
    |              |--->signinpage.ejs
    |              |--->signuppage.ejs
    |
    |-->.env
    |-->node_modules
    |-->.gitignore
    |--> index.js
    |--> package-lock.json
    |-->package.json


## How to setup the project on local system:
* Clone this project into the system.
* Run the command npm i or npm install for installing all the required dependencies.
* Install the mongodb in the system if not already available.
* Now Run the command npm start.
* Open the browser and navigate to http://localhost:1004/ to start the application.