var chai = require('chai');
var {expect,assert} = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var models = require('../models');
var UserModel = mongoose.model('user');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));
    
chai.use(chaiHttp);
var new_user = new UserModel({
    username:"testuser",
    password:"newuser"
});
const userbody = {
    query:`query($username: String , $password: String){
        UserQuery(username:$username,password:$password){
          username,
          password
        }
      }`,variables:{
          username:"testuser",
          password:"newuser"
      }
};
describe("UserQUery",()=>{
    before(async()=> {
        try{
            await new_user.save();
            return assert.ok(true);
        }
        catch(e){
            console.log("error",e);
            return assert.ok(false);
        }
    });
    it("query the db with userdata",(done)=>{
        try{
            chai.request("http://localhost:3001")
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(userbody)
            .end((err,res) =>{
                if(err){return done(err);}
              //  console.log("resbody",res.body);
                expect(Object.keys(res.body.data.UserQuery)).to.have.members(['username','password']);
                expect(res.status).to.deep.equals(200);
                expect(res.body.data.UserQuery.username).to.deep.equals(new_user.username);
                expect(res.body.data.UserQuery.password).to.deep.equals(new_user.password);

                done();
            });
        }
        catch(e){
            console.log("error",e);
            done();
        }
       
    });
});