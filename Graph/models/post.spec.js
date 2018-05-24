var { assert } = require('chai');
var mongoose = require('mongoose');
var PostSchema = require('./post');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));

const testData = new PostSchema({
    title:'test',
    postcontent:'test',
    username: 'test',
    image_path: 'public/postUploads/Xaya hd.jpg'
});  

describe('postModel testing',function(){
    it( 'Should save post data ',async()=>{
        try{
            let newpost = await testData.save();
           // console.log("new post detials",newpost);
            assert.ok(true);

        }
        catch(e){
            console.log("error :",e); 
            assert.ok(false);
            
        }
    });
    
});