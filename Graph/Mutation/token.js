const { GraphQLString, GraphQLList } = require('graphql');
const mongoose = require( 'mongoose');
const TokenType = require( '../Types/token');
const TokenModel = mongoose.model('token');
var randomstring = require("randomstring");
const TokenObjectType = TokenType.TokenObjectType;

module.exports={
    add : {
        type:TokenObjectType,
        args:{
            username:{type: GraphQLString},
            password:{type: GraphQLString},
        },
        resolve: async(parentValue,args)=>{
            try{
                console.log("args from token mutation",args);
                var token_gen = randomstring.generate(); 
                const newtoken = new TokenModel({
                    userData:{
                        username:args.username,
                        password:args.password,
                        image_path:""
                    },
                    token: token_gen
                });
                await newtoken.save();
                return newtoken;
                
            }
            catch(e){
                console.log("token creation error:",e);
            }
        }
    }
};