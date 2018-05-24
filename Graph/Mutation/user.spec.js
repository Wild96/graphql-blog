var chai  = require('chai');
var {expect,aasert} = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Models = require('../models');
var UserModel = mongoose.model('user');
chai.use(chaiHttp);
var testData = {
    username: 'saiprasad',
    password: 'admin'
}
describe('UserMutations', () => {
    it('must add user', async() => {
       
        const addBody = {
            query: `mutation ($username: String, $password: String) {
                addUser(username: $username, password: $password) {
                  username
                  password
                  image_path
                }
              }
              `, variables:{
                  username:"saiprasad",
                  password:"admin"
              }
        };
        //console.log("came",testData);
        chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(addBody)
            .end(async (err, res) => {
                try {
                    if (err) {
                        console.log("err in user mutation",err);
                        // return done(err);
                    }
                  //  console.log("user data",res.body.data.addUser);
                    expect(Object.keys(res.body.data.addUser)).to.have.members(['username', 'password','image_path']);
                     expect(res.status).to.deep.equals(200);
                    expect(res.body.data.addUser.username).to.deep.equals(testData.username);
                    expect(res.body.data.addUser.password).to.deep.equals(testData.password);
                    // expect(res.body.data.addUser.image_path).to.deep.equals(testData.image_path);
                    const data = await UserModel.findOne(testData).exec();
                    if (data === null) {
                        console.log("user saved failed")
                    }
                    // return done();
                }
                catch (e) {
                 console.log("error",e);
                 //done(e);
                }
            });

    });
});