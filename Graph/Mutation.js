const {GraphQLObjectType} = require( 'graphql');
const UserMutation  =require('./Mutation/user');
const TokenMutation =require( './Mutation/token');
const PostMutation  =require('./Mutation/post');
module.exports =  new GraphQLObjectType({
    name:'RootMutation',
    fields:{
        addUser: UserMutation.add,
        addToken: TokenMutation.add,
        addPost: PostMutation.add 

    },
});