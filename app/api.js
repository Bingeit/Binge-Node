var config = require('../config');

var TopicInfo = require('../schemas/topic_info_schema.js')

var ArticleInfo = require('../schemas/article_info_schema.js')

var mongoose = require('mongoose');

var express = require('express');

var app_id = config.application_id;

var javascript_key = config.javascript_key;

var omdb = require('omdb');

var api = express.Router();

var list_of_topics = ["Game of Thrones", "Iron Man"];


var topic_details = [];

api.get('/update_topic_info', function(req, res) {
    console.log('Parsing and updating basic content')
    list_of_topics.forEach(function (topic) {
            omdb.get({title: topic}, false, function(err,movie) {
            var parsed_title = {};
            parsed_title.title = movie.title;
            parsed_title.type = movie.type;
            parsed_title.plot = movie.plot;
            parsed_title.rating = movie.imdb.rating;
            parsed_title.cast = movie.actors;
            parsed_title.released = {};
            if (movie.type == 'series') {
                if (movie.type.to == undefined) {
                parsed_title.released = movie.year.from + ' -';
                }
                else parsed_title.released = movie.year.from + ' to ' + movie.year.to;
            }
            else parsed_title.released = movie.year;
            var topic_details = new TopicInfo(parsed_title);

            topic_details.save(function (err) {
                if (err) {
                    res.send(err)
                    return;
                }
                console.log({message: 'Topic details been added to MongoDB'})
            })

    });})
    res.send(JSON.stringify(true))
})

api.get('/delete_topic_info', function(req, res) {
    TopicInfo.remove({}, function(err) {
       console.log('collection removed')
});
})

api.get('/update_article_info', function(req, res){

})

module.exports = api;
