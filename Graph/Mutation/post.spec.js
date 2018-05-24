var chai = require('chai');
var { expect, assert } = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Models = require('../models');
var PostModel = mongoose.model('post');
chai.use(chaiHttp);
var testData ={
    title:'mocha',
    postcontent:'mocha',
    username:'kishore',
    image_path:"public/postUploads/5.jpg"   
}
describe('postMutations testcase',()=>{
    it('add posts',async()=>{
        const addPost = {
            query:`mutation($title: String, $postcontent: String, $username: String,$image_path: String){
                addPost(title:$title,postcontent:$postcontent,username:$username,image_path:$image_path){
                  title,
                  postcontent,
                  username,
                  image_path
                }
              }`,variables:testData
        };
        chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(addPost)
            .end(async (err, res) => {
                try {
                    if (err) {
                        console.log("error in post mutation",err);
                    }
                    expect(Object.keys(res.body.data.addPost)).to.have.members(["title", "postcontent","username","image_path"]);
                    expect(res.status).to.deep.equals(200);
                    expect(res.body.data.addPost.title).to.deep.equals(testData.title);
                    expect(res.body.data.addPost.postcontent).to.deep.equals(testData.postcontent);
                    expect(res.body.data.addPost.username).to.deep.equals(testData.username);
                    expect(res.body.data.addPost.image_path).to.deep.equals(testData.image_path);
                    console.log('post mutation test');
                    const data = await PostModel.findOne(testData).exec();
                    if (data === null) {
                        console.log("post saved failed")
                        //  return done();
                    }
                    var testDataId = data._id;
                    //  return done();
                }
                catch(e){
                    console.log("error in post mutation",e);
                    // return done();
                }
             });   
        },20000);
       
});