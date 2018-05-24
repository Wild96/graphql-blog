var { assert } = require('chai');
var mongoose = require('mongoose');
var tokenSchema = require('./tokenschema');
var randomstring = require('randomstring')
var moment = require ('moment');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err))
var token = randomstring.generate();
var ISO = moment().toISOString();

const testData = new tokenSchema({
    userData : {
		username : "sai",
		password: "admin",
		image_path : "public/uploads/profilepic.jpg"
	},
    token:token,
    date:ISO    
});  
describe('token model testing',function(){
    it( 'Should create token ',async()=>{
        try{
            let newtoken = await testData.save();
           // console.log("new token detials",newtoken);
            assert.ok(true);

        }
        catch(e){
            console.log("error :",e); 
            assert.ok(false);
            
        }
    });
    
});