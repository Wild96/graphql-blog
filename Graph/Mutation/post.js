const { GraphQLString, GraphQLList } = require( 'graphql');
const mongoose = require( 'mongoose');
const PostType = require ('../Types/post');
const PostModel = mongoose.model('post');
module.exports = {
    add:{
        type: PostType,
        args:{
            title:{type: GraphQLString},
            postcontent:{type: GraphQLString},
            username:{type: GraphQLString},
            img_path:{type:GraphQLString}
        },
        resolve: async(parentValue,args)=>{
            try{
                console.log(args);
                const newpost = new PostModel(args);
                const data = await newpost.save();
                console.log(data);
                return data;
            }
            catch(e){
                console.log("post creation error",e);
            }
        }
    }
};