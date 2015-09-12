var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    title: String,
    released: String,
    rating: Number,
    cast: Array,
    plot: String,
    type: String,
    image_url: String
})

module.exports = mongoose.model('TopicsInfo', BasicDataSchema);
