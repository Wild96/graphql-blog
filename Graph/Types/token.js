const { GraphQLString, GraphQLInputObjectType, GraphQLObjectType } = require('graphql');
var GraphQLDate = require('graphql-date');

const TokenInputType = new GraphQLInputObjectType({
    name: 'TokenInputType',
    fields: () => ({
        token: { type: GraphQLString },
        date: { type: GraphQLDate },
        userData: { type: userInputType }
    }),

});
const userInputType = new GraphQLInputObjectType({
    name: 'userInputType ',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        image_path: { type: GraphQLString }
    })
});

const TokenObjectType = new GraphQLObjectType({
    name: 'TokenObjectType',
    fields: () => ({
        token: { type: GraphQLString },
        date: { type: GraphQLDate },
        userData: { type: userObjectType }
    })
});
const userObjectType = new GraphQLObjectType({
    name: 'userObjectType',
    fields: () => ({
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        image_path: { type: GraphQLString }
    })
});
module.exports = { TokenInputType,TokenObjectType,userObjectType}