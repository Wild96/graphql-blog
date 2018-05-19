const { GraphQLString,GraphQLObjectType } = require('graphql');
module.exports =  new GraphQLObjectType({
    name:'PostType',
    fields:()=>({
        _id: { type: GraphQLString },
        title:{type:GraphQLString},
        postcontent:{type:GraphQLString},
        username:{type:GraphQLString},
        image_path:{type:GraphQLString}
    }),
});