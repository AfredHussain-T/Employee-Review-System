const express = require('express');
const port = 6000;
const app = express();




app.listen(port, function(err){
    if(err){
        console.log('Error while connecting to the port ', err);
        return;
    }

    console.log('The connection has been established on port :', port);
})