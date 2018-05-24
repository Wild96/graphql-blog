var {assert} = require('chai');
var mongoose = require('mongoose');
var UserSchema = require('./user');

const testData = new UserSchema({
    username:'test',
    password:'test',
    image_path:'public/postUploads/Xayah hd.jpg'
});  
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));

describe('UserModel testing',function(){
    it( 'Should save user data ',async()=>{
        try{
            let newUser = await testData.save();
            //console.log("new user detials",newUser);
            assert.ok(true);

        }
        catch(e){
            console.log("error :",e);
           // console.log("done callback is called"); 
            assert.ok(false);
            
        }
    });
    
});