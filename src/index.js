const express = require('express');
var bodyParser = require('body-parser');
const route = require('./route/route');
const app = express();

app.use(bodyParser.json()); 

//DB Connection
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://users-open-to-all:hiPassword123@cluster0.uh35t.mongodb.net/Nikhil_Patil_WishUp?authSource=admin&replicaSet=atlas-wwe75z-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);


//Port connection
app.listen(3000, function() {
	console.log('Express app running on port ' + (3000))
});