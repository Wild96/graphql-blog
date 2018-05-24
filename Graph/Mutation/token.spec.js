var chai = require('chai');
var { expect, assert } = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Models = require('../models');
var TokenModel = mongoose.model('token');
chai.use(chaiHttp);
var testData = {
    username: "test",
    password: "test",
    image_path: "public/postUploads/bots.jpeg"
}
describe('Token Mutations', () => {
    it('must create a token', async () => {
        const addbody = {
            query: `mutation($username: String,$password: String, $image_path: String){
                addToken(username: $username,password: $password,image_path: $image_path){
                    userData {
                      username
                      password
                      image_path
                    },
                    token
                  }
            }`, variables:testData
        };
        chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(addbody)
            .end(async (err, res) => {
              //  console.log('came');
                try {
                    if (err) {
                        console.log("err occured in token mutation ",err);
                    }
                   // console.log("user details:",res.body.data.addToken.userData);
                    console.log("res body:",res.body.data.addToken);
                     expect(Object.keys(res.body.data.addToken)).to.have.members(['token', 'userData']);
                    expect(res.body.data.addToken.userData.username).to.deep.equals(testData.username);
                    expect(res.body.data.addToken.userData.password).to.deep.equals(testData.password);
                    expect(res.body.data.addToken.userData.image_path).to.deep.equals(testData.image_path);
                    expect(res.status).to.deep.equals(200);
                    const data = await TokenModel.findOne(testData).exec();
                   // console.log("data in token case",data);
                    if (data === null) {
                        console.log("token not found");
                    }
                    // return done();
                }
                catch (e) {
                    console.log("token mutation failed", e);
                //    return done();
                }
            });

    }, 20000);
});