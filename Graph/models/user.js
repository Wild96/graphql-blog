var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String,
    image_path: String
});
module.exports = mongoose.model('user', userSchema) ;