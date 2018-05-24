var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title : String,
    postcontent : String,
    username : String,
    image_path:String
}); 
module.exports = mongoose.model('post', postSchema);  