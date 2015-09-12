var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BasicDataSchema = new Schema({
    title: String, 
    released: String,
    rating: Number, 
    cast: Array,
    plot: String,
    poster: Object,
    type: String
});

module.exports = mongoose.model('TopicsInfo', BasicDataSchema);