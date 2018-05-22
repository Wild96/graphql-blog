const {GraphQLObjectType} = require ('graphql');
const UserQuery = require('./Queries/user');
const PostQuery = require( './Queries/post');
const TokenQuery = require( './Queries/token');
module.exports = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        UserQuery,
        PostQuery,
        TokenQuery
    }
});