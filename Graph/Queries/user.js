const { GraphQLString } = require('graphql');
const mongoose = require('mongoose');
const UserType = require('../Types/user');
const UserModel = mongoose.model('user');
module.exports = {
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve: async (parentValues, args) => {
        try {
            console.log("args from user query", args);
            return await UserModel.findOne({ username: args.username });
        }
        catch (e) {
            console.log("error in finding user", e);
        }
    }
};