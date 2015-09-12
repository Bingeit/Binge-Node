var config = require('../config');

var express = require('express');

var app_id = config.application_id;

var javascript_key = config.javascript_key;

var omdb = require('omdb');

var api = express.Router();

api.get('/update', function(req, res) {
    console.log('Parsing and updating basic content')
    omdb.get({title: "Game of thrones"}, false, function(err,movie) {
        res.send(movie);
    });
})


module.exports = api;



