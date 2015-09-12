var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    topic: String,
    title: String,
    publisher: String,
    publisher_url: String,
    image_url: String,
    type: Number
})

module.exports = mongoose.model('ArticlesInfo', BasicDataSchema);
