const mongoose = require('mongoose');

// Setting up mongo URL to connect to data base
// mongoose.connect('mongodb://127.0.0.1:27017/emp-rev-system');
mongoose.connect('mongodb+srv://afredhussain69:@Fred786@cluster0.dxycqyh.mongodb.net/emp-rev-sys');

const connection = mongoose.connection;

// Checking if there is any error while connecting
connection.on('error' , console.error.bind(console, 'Error while establishing connection'));

// We will be notified if successful connection is established
connection.once('open' , function(){
    console.log('DB Connection successfully established' );
})