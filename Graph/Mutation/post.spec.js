var chai = require('chai');
var { expect, assert } = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Models = require('../../models');
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
        const addPost ={
            query:`mutation{
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
                    if (err) { return (err); }
                    expect(Object.keys(res.body.data.addPost)).to.have.members(["title", "postcontent","username","image_path"]);
                    expect(res.status).to.deep.equals(200);
                    console.log('post mutation test');
                    const data = await PostModel.findOne(testData).exec();
                    console.log("data",data);
                    if (data === null) {
                        console.log("post saved failed")
                         done();
                    }
                    console.log("post saved passed");
                    done();
                }
                catch(e){
                    console.log("error in post mutation",e);
                    done();
                }
             });   
        },20000);
       
});