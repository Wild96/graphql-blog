const {GraphQLString,GraphQLBoolean, GraphQLList} = require( 'graphql');
const mongoose =require( 'mongoose');
const PostType =require( '../Types/post');
const PostModel = mongoose.model('post');
module.exports = {
    type:new GraphQLList(PostType),
    args:{
        id:{type: GraphQLString},
        all:{type: GraphQLBoolean}
    },
    resolve: async(parentValue,args)=>{
        try{
            if(args.all === true){
               return await PostModel.find().exec();
            }
            console.log(args);
            const data = await PostModel.find({_id: mongoose.mongo.ObjectId(args.id)}).exec();
            console.log(data);
            return data;
        }catch(err){
            throw new Error(err);
        }
    }

};