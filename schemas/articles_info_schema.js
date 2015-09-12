var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    topic: String,
    title: String,
    date: Date,
    publisher: String,
    publisher_url: String,
    text: Array,
    images: Array,
    type: Number
})

module.exports = mongoose.model('ArticlesInfo', BasicDataSchema);
