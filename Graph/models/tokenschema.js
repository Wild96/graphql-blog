var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    token: String,
    userData: Object,
    date : { 
            type : Date ,
            default: Date.now()
        }
});
 
module.exports =  mongoose.model('token', tokenSchema);