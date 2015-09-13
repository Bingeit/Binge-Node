var config = require('../config');

var TopicsInfo = require('../schemas/topics_info_schema.js')

var ArticlesInfo = require('../schemas/articles_info_schema.js')

var mongoose = require('mongoose');

var express = require('express');

var app_id = config.application_id;

var javascript_key = config.javascript_key;

var omdb = require('omdb');

var api = express.Router();

var list_of_topics = [
  {name: "Game of Thrones", type: 1},
  {name: "Iron Man", type: 1},
  {name: "Presidential Election", type: 0}
];

var topic_details = [];

api.get('/update_topics_info', function(req, res) {
    console.log('Parsing and updating basic content')
    list_of_topics.forEach(function (topic) {
      var parsed_title = {};
      // Query OMDB for information if movie or TV
      if (topic.type == 1){
        omdb.get({title: topic.name}, false, function(err,movie) {
          console.log(movie);
          parsed_title.title = movie.title;
          parsed_title.type = movie.type;
          parsed_title.plot = movie.plot;
          parsed_title.rating = movie.imdb.rating;
          parsed_title.cast = movie.actors;
          parsed_title.poster = movie.poster;
          parsed_title.released = {};

          if (movie.type == 'series') {
              if (movie.type.to == undefined) {
              parsed_title.released = movie.year.from + ' -';
              }
              else parsed_title.released = movie.year.from + ' to ' + movie.year.to;
          }
          else parsed_title.released = movie.year;
        });

        // Make topic
        console.log(parsed_title);
        var topic_details = new TopicsInfo(parsed_title);

        topic_details.save(function (err) {
            if (err) {
                res.send(err)
                return;
            }
            console.log({message: 'Topic details been added to MongoDB'})
        })
      }
      else {
        parsed_title.title = topic.name;

        // Make topic
        console.log(parsed_title);
        var topic_details = new TopicsInfo(parsed_title);

        topic_details.save(function (err) {
            if (err) {
                res.send(err)
                return;
            }
            console.log({message: 'Topic details been added to MongoDB'})
        })
      }
    });
    res.send(JSON.stringify(true))
})

var delete_topics_info = function() {
        TopicsInfo.remove({}, function(err) {
       console.log('collection removed')
   })}


// Returns information for a topic
api.get('/topics', function(req, res){
  topic = req.param('topic')

  TopicsInfo.find({'title': topic}, function(err, topics) {
    res.send(topics.pop());
  });
})

api.get('/all_topics', function(req, res){
  TopicsInfo.find({}, function(err, topics) {
    res.send(topics);
  });
})

// ARTICLES

// Returns all articles for a certain topic
api.get('/articles', function(req, res){
  topic = req.param('topic')

  ArticlesInfo.find({'topic': topic}, function(err, articles) {
    res.send(articles.pop());
  });
})

api.get('/delete_topics_info', function(req, res) {
    delete_topics_info();
})

var request = require("request-promise")
var parseString = require('xml2js').parseString;
request.get('https://news.google.com/news?q=gameofthrones&output=rss')
    .then(function (res) {
        var cleanedString = res.replace("\ufeff", "");
        parseString(cleanedString, function (err, result) {
            console.log(result.rss.channel[0].item);
})});


// Returns all articles
api.get('/all_articles', function(req, res){
  ArticlesInfo.find({}, function(err, articles) {
    res.send(articles);
  });
})

// Add articles
api.get('/add_article', function(req,res){
  parsed_title = {
    topic: req.param('topic'),
    title: req.param('title'),
    publisher: req.param('publisher'),
    publisher_url: req.param('publisher_url') ,
    image_url: req.param('content_html'),
    type: req.param('type')
  }

  var topic_details = new ArticlesInfo(parsed_title);

  topic_details.save(function (err) {
      if (err) {
          res.send(err)
          return;
      }
      console.log({message: 'Article details been added to MongoDB'})
  })
})

module.exports = api;
