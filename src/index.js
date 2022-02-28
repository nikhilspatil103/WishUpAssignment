const express = require('express');
var bodyParser = require('body-parser');

const route = require('./route/route');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://nikhilspatil103:nikhil75456@cluster0.jm2wr.mongodb.net/WishUp?authSource=admin&replicaSet=atlas-jcr66e-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);



app.listen(3000, function() {
	console.log('Express app running on port ' + (3000))
});