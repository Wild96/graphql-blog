var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var postSchema = new Schema({
    title : String,
    postcontent : String,
    username : String,
    image_path:String
    /*
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    */
});

 var post = mongoose.model('post', postSchema);
module.exports =  post ;