const {expect} = require('chai');
const {  GraphQLObjectType, GraphQLString } = require( 'graphql');
const Usertype = require ('./user');
describe('User type testcase',()=>{
    it('should have a username field',()=>{
        expect(Usertype.getFields()).to.have.property('username');
        expect(Usertype.getFields().username.type).to.deep.equals(GraphQLString);
    });
    it('should have a password field',()=>{
        expect(Usertype.getFields()).to.have.property('password');
        expect(Usertype.getFields().password.type).to.deep.equals(GraphQLString);
    });
    it('should have a image path field',()=>{
        expect(Usertype.getFields()).to.have.property('image_path');
        expect(Usertype.getFields().image_path.type).to.deep.equals(GraphQLString);
    });
});