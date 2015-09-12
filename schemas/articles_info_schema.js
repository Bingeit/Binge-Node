var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    topic: String,
    title: String,
    date: Date,
    publisher: String,
    publisher_url: String,
    content_html: String
})

module.exports = mongoose.model('ArticlesInfo', BasicDataSchema);
