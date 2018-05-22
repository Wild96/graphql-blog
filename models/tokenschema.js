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
 var  token = mongoose.model('token', tokenSchema);
module.exports =  token ;