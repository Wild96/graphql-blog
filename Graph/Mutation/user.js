//mutation
const { GraphQLString } = require( 'graphql');
const mongoose = require( 'mongoose');
const UserType = require ('../Types/user');
const UserModel = mongoose.model('user');

module.exports={
    add:{
        type:UserType,
        args:{
            username:{type: GraphQLString},
            password:{type: GraphQLString}
        },
        resolve: async (parentValues,args)=>{
            try{
                console.log("args from user mutation",args);
                const newuser = new UserModel(args);
                return await newuser.save();       
            }   
            catch(e){
                console.log("error",e)

            }        
        }
    }
};