var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');
var app = express();
var mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect(config.database, function(err) {
	if (err) {
		console.log(err)
	}
	else console.log('Connected to database')
});

var api = require('./app/api.js')
// routes to api
app.use('/api',api);
app.use(express.static(__dirname + '/public'));

app.listen(config.port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Listening on '+ config.port)
	}
});
