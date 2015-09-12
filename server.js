var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.js');
var app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/api.js')
// routes to api
app.use('/api',api);

app.listen(config.port, function(err) {
	if (err) {
		console.log(err);
	}
	else {
		console.log('Listening on '+ config.port)
	}
});


