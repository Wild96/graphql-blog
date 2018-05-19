const {GraphQLObjectType} = require ('graphql');
const PostQuery = require( './Queries/post');
const TokenQuery = require( './Queries/token');
module.exports = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        PostQuery,
        TokenQuery
    }
});