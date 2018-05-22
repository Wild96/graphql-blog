const{expect} = require('chai');
const {  GraphQLObjectType, GraphQLString, } = require( 'graphql');
var GraphQLDate = require('graphql-date');
const Tokentype = require('./token');
const TokenObjectType = Tokentype.TokenObjectType;
const UserObjectType = Tokentype.userObjectType;

describe('Token type testcase',()=>{
    it('should have a token field',()=>{
        expect(TokenObjectType.getFields()).to.have.property('token');
        expect(TokenObjectType.getFields().token.type).to.deep.equals(GraphQLString);
    });
    it('should have a date field',()=>{
        expect(TokenObjectType.getFields()).to.have.property('date');
        expect(TokenObjectType.getFields().date.type).to.deep.equals(GraphQLDate);
    });
    // it('should have a userdata field',()=>{
    //     expect(TokenObjectType.getFields()).to.have.property('userData');
    //     expect(TokenObjectType.getFields().userData.type).to.deep.equals(UserObjectType);
    // });
});