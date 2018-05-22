var chai = require('chai');
var { expect, assert } = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var Models = require('../../models');
var UserModel = mongoose.model('user');
chai.use(chaiHttp);
var testData = {
    username: 'saiprasad',
    password: 'admin'
}

describe('UserMutations', () => {
    // beforeEach(async () => {
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect("mongodb://localhost:27017/blog")
    //         .then(() => console.log('Succesfully connected to blog database'))
    //         .catch((err) => console.error(err));
    // });
    it('must add user', async() => {
        const addBody = {
            query: `mutation{
                addUser(username:$username,password:$password){
                  username,
                  password
                }
              }`, varaibles:testData
        };
        chai.request('http://localhost:3001')
            .post('/graphql')
            .set('content-type', 'application/json')
            .send(addBody)
            .end(async (err, res) => {
                try {
                    if (err) { return (err); }
                    expect(Object.keys(res.body.data.addUser)).to.have.members(['username', 'password', "image_path"]);
                    expect(res.status).to.deep.equals(200);
                    const data = await UserModel.findOne(testData).exec();
                    if (data === null) {
                        console.log("user saved failed")
                         done();
                    }
                    console.log("user saved passed");
                    done();
                }
                catch (e) {
                 console.log("error",e);
                 done();
                }
            });

    });
    // afterEach((done) => {
    //     // mongoose.connection.db.dropDatabase(() => {
    //     //     mongoose.connection.close(done());
    //     // });
    // });
});