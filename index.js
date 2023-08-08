const express = require('express');
const port = 1004;
const app = express();

const mongoDB = require('./configs/mongoose');

const route = require('./routes/indexRoutes');
// middlewares
app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use('/', route);
// Setting up view engine
app.set('view engine' ,'ejs');
app.set('views' , './views');


app.listen(port, function(err){
    if(err){
        console.log('Error while connecting to the port ', err);
        return;
    }

    console.log('The connection has been established on port :', port);
});