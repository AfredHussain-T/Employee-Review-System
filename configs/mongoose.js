const mongoose = require('mongoose');

// Setting up mongo URL to connect to data base
// mongoose.connect('mongodb://127.0.0.1:27017/emp-rev-system');
mongoose.connect('mongodb+srv://afredhussain69:RcIdyuqWCvshqBQm@cluster0.jv06oti.mongodb.net/emp-rev-sys?retryWrites=true&w=majority');

const connection = mongoose.connection;

// Checking if there is any error while connecting
connection.on('error' , console.error.bind(console, 'Error while establishing connection'));

// We will be notified if successful connection is established
connection.once('open' , function(){
    console.log('DB Connection successfully established' );
})