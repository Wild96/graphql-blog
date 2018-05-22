var chai = require('chai');
var { expect, assert } = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var models = require('../../models');
var PostModel = mongoose.model('post');
chai.use(chaiHttp);

const newpost = new PostModel({
    title : "mocha test",
    postcontent : "mocha testing",
    username : "sai prasad",
    image_path:" public/postUploads/bots.jpeg"
});
//console.log("newpost",newpost);
const queryById ={
    query:`query{
        PostQuery(id:"${newpost._id}"){
         _id,
          postcontent,
          title,
          username,
          image_path
        }
      }`
};
const getallQuery ={
    query:`query{
        PostQuery(all:true){
        _id,
          postcontent,
          title,
          username,
          image_path
        }
      }`
}

describe('post query testcase',()=>{
    beforeEach(async()=>{
        try{
            mongoose.Promise = global.Promise;
            mongoose.connect("mongodb://localhost:27017/blog")
                .then(() => console.log('Succesfully connected to blog database'))
                .catch((err) => console.error(err));
            // const testpost = await newpost.save();
            // //console.log("testpost",testpost._id);
            // var testpost_id = testpost._id;
            // console.log("testpost_id",testpost_id);
            return assert.ok(true);
        }
        catch(e){
           console.log("new post not saved",e);
        }
    });
    it('query post by id',(done)=>{
        try{
            chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(queryById)
            .end((err, res) => {
                if (err) { return done(err); }
                console.log("response",res.body.data);
                // expect(Object.keys(res.data.data.PostQuery)).to.have.members(['_id','title','postcontent','username','image_path']);
                // expect(res.status).to.deep.equals(200);
                return  done();
            });
        }
        catch(e){
            console.log("error",e);
            return  done();
        }
    },20000);
    it('query to get all post by bool true',(done)=>{
        try{
            chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(getallQuery)
            .end((err, res) => {
                if (err) { return done(err); }
                console.log("response",res.body.data);
                // expect(Object.keys(res.data.data.PostQuery)).to.have.members(['_id','title','postcontent','username','image_path']);
                //expect(res.status).to.deep.equals(200);
                return  done();
            });
        }
        catch(e){
            console.log("error",e);
            return  done();
        }

    },20000);
    afterEach((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(done());
        });
        
    });
});