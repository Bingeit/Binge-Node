var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    topic: String,
    title: String,
    date: Date, 
    publisher: String,
    source: String
})

module.exports = mongoose.model('ArticleInfo', BasicDataSchema);
