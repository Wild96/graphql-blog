var chai = require('chai');
var {expect,assert} = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var models = require('../models');
var tokenModel = mongoose.model('token');
var randomstring = require('randomstring')
var moment = require ('moment');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));
chai.use(chaiHttp);
var token = randomstring.generate()
// console.log(token);
var ISO = moment().toISOString()
// console.log("iso string ",ISO);
var newToken = new tokenModel({
    userData : {
		username : "sai",
		password: "admin",
		image_path : "public/uploads/profilepic.jpg"
	},
    token:token,
    date:ISO    
});
var test_token = newToken.token;
console.log("testtoken:",test_token);
const Tokenbody ={
    query:`query($token: String){
        TokenQuery(token:$token){
          token
          userData {
            username
            password
            image_path
          }
          date
        }
      }`,variables:{
          token:test_token
      }
};
describe('TokenQuery',()=>{
    before(async()=> {
        try{
            await newToken.save();
            return assert.ok(true);
        }
        catch(e){
            console.log("error",e);
            return assert.ok(false);
        }
    });
    it("query the db with tokwn",(done)=>{
        try{
            chai.request("http://localhost:3001")
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(Tokenbody)
            .end((err,res) =>{
                if(err){return done(err);}
                //console.log("resbody",res.body.data.TokenQuery);
                expect(Object.keys(res.body.data.TokenQuery)).to.have.members(['token','userData','date']);
                expect(res.status).to.deep.equals(200);
                expect(res.body.data.TokenQuery.token).to.deep.equals(newToken.token);
                expect(res.body.data.TokenQuery.userData.username).to.deep.equals(newToken.userData.username);
                expect(res.body.data.TokenQuery.userData.password).to.deep.equals(newToken.userData.password);
                
                return done();
            });
        }
        catch(e){
            console.log("error",e);
            return done();
        }
       
    });
});
