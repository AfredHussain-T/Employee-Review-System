const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/emp-rev-system');
mongoose.connect('mongodb+srv://afredhussain69:RcIdyuqWCvshqBQm@cluster0.jv06oti.mongodb.net/emp-rev-sys');

const connection = mongoose.connection;

connection.on('error' , console.error.bind(console, 'Error while establishing connection'));

connection.once('open' , function(){
    console.log('DB Connection successfully established');
})