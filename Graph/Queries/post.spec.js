var chai  = require('chai'); 
var { expect, assert } = require('chai');
var  chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var models = require('../models');
var PostModel = mongoose.model('post');
chai.use(chaiHttp);

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));

const newpost = new PostModel({
    title: "okies",
    postcontent: "okies",
    username: "kishore",
    image_path: " public/postUploads/bots.jpeg"
});
var postId = newpost._id;
console.log("post id",postId);
const queryById = {
    query: `query ($postId: String) {
        PostQuery(id: $postId) {
          title
          postcontent
          username
          image_path
        }
      }`,variables:{
          postId:postId
      }
};
const getallQuery = {
    query: `query{
        PostQuery(all:true){
        _id,
          postcontent,
          title,
          username,
          image_path
        }
      }`
}

describe('post query testcase', () => {
    before(async () => {
        try {
            await newpost.save();
            console.log("post saved successfuly");
            return  assert.ok(true);
        }
        catch (error) {
            console.log("error", error);
            return assert.ok(false);
        }
    });

    it('query post by id', (done) => {
        try {
            chai.request('http://localhost:3001')
                .post('/graphql')
                .set('content-type', 'application/json')
                .send(queryById)
                .end((err, res) => {
                    if (err) { console.log("error while fetching by id", err); }
                   console.log(" query response", res.body.data.PostQuery[0]);
                      expect(Object.keys(res.body.data.PostQuery[0])).to.have.members(['title','postcontent','username','image_path']);
                     expect(res.status).to.deep.equals(200);
                    
                     expect(res.body.data.PostQuery[0].title).to.deep.equals(newpost.title);
                     expect(res.body.data.PostQuery[0].postcontent).to.deep.equals(newpost.postcontent);
                     expect(res.body.data.PostQuery[0].username).to.deep.equals(newpost.username);
                     expect(res.body.data.PostQuery[0].image_path).to.deep.equals(newpost.image_path);
                    return done();
                });
        }
        catch (e) {
            console.log("error", e);
            return done();
        }
    });

    it('query to get all post by bool true',(done)=>{
        try{
            chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(getallQuery)
            .end((err, res) => {
                if (err) { return done(err); }
                //console.log("response for getallQuery",res.body.data.PostQuery);
                const data = res.body.data.PostQuery;
                // console.log("data:",data);
                expect(Object.keys(res.body.data.PostQuery[0])).to.have.members(['_id','title','postcontent','username','image_path']);
                expect(res.status).to.deep.equals(200);
                expect(res.body.data.PostQuery[0].title).to.deep.equals(newpost.title);
                expect(res.body.data.PostQuery[0].postcontent).to.deep.equals(newpost.postcontent);
                expect(res.body.data.PostQuery[0].username).to.deep.equals(newpost.username);
                expect(res.body.data.PostQuery[0].image_path).to.deep.equals(newpost.image_path);
              
                return  done();
            });
        }
        catch(e){
            console.log("error",e);
            return  done();
        }
    });

});