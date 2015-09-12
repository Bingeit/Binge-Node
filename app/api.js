var config = require('../config');

var TopicsInfo = require('../schemas/topics_info_schema.js')

var ArticlesInfo = require('../schemas/articles_info_schema.js')

var mongoose = require('mongoose');

var express = require('express');

var app_id = config.application_id;

var javascript_key = config.javascript_key;

var omdb = require('omdb');

var api = express.Router();

var list_of_topics = ["Game of Thrones", "Iron Man"];


var topic_details = [];

api.get('/update_topics_info', function(req, res) {
    console.log('Parsing and updating basic content')
    list_of_topics.forEach(function (topic) {
            omdb.get({title: topic}, false, function(err,movie) {
            console.log(movie);
            var parsed_title = {};
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
            var topic_details = new TopicsInfo(parsed_title);

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

var delete_topics_info = function() {
        TopicInfo.remove({}, function(err) {
       console.log('collection removed')
   })}

api.get('/topics', function(req, res){
  TopicsInfo.find({}, function(err, topics) {
    var topicsMap = {};
  topics.forEach(function(topic) {
      topicsMap[topic.title] = topic;
    });

    res.send(topicsMap);
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
    var articlesMap = {};

  articles.forEach(function(article) {
      articlesMap[article.topic] = article;
    });

    res.send(articlesMap);
  });
})

// Add articles
api.get('/add_article', function(req,res){
  parsed_title = {
    topic: req.param('topic'),
    title: req.param('title'),
    date: Date.parse(req.param('date')),
    publisher: req.param('publisher'),
    publisher_url: req.param('publisher_url') ,
    content_html: req.param('content_html')
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
