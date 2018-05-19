const {  GraphQLObjectType, GraphQLString } = require( 'graphql');
module.exports =  new GraphQLObjectType({
    name:"UserType",
    fields:()=>({
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        image_path:{type:GraphQLString}
    }),
});