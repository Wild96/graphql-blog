const { GraphQLString } = require('graphql');
const mongoose = require('mongoose');
const types = require('../Types/token');
const TokenModel = mongoose.model('token');

const TokenObjectType = types.TokenObjectType;

module.exports = {
    type: TokenObjectType,
    args: {
        token: { type: GraphQLString },

    },
    resolve: async (parentValues, args) => {
        try {
            return await TokenModel.findOne(args).exec();

        }
        catch (e) {
            throw Error(e);
        }
    }
};