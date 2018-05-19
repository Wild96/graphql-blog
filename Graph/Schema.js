const {GraphQLSchema} = require('graphql');
const RootQuery =require('./Queries');
const RootMutation = require ('./Mutation');
module.exports =  new GraphQLSchema({
     query:RootQuery,
     mutation:RootMutation
 });