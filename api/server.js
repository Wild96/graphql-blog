require('../models/index');
const express = require('express');
const expressGraphQL = require('express-graphql');
const app = express();
const Schema = require('../Graph/Schema');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const User = require("../models/user");
const Post = require("../models/post");
const cors = require('cors');
const multer = require('multer');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log('Succesfully connected to blog database'))
    .catch((err) => console.error(err));

app.use(cors());
app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

app.use('/graphql', expressGraphQL({
    schema: Schema,
    graphiql: true
}));

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename(req, file, cb) {
        cb(null, `${file.originalname}`);
    },
})
const upload = multer({ storage: storage });


const postimg_storage = multer.diskStorage({
    destination:'./public/postUploads',
    filename(req,file,cb){
        cb(null,`${file.originalname}`);
    },
})
const post_upload = multer({ storage: postimg_storage });


app.post('/profilepic/:username',upload.single('files'), (req, res) => {
    console.log("req.parmas.username:",req.params.username);
    var username = req.params.username;
    var file_path = req.file.path;
    console.log("file",file_path);
    User.findOneAndUpdate({username:req.params.username},{$set:{image_path:file_path}},function(err,response){
        if(err){
            console.log("cant update:",err);
        }
        else{
            console.log("response",response);
        }
    });

})
app.post('/postpic/:post_title',post_upload.single('files'),(req,res)=>{
    console.log("post tile:",req.params.post_title);
    var post_title = req.params.post_title;
    var file_path =req.file.path
    console.log("File:",file_path);
    Post.findOneAndUpdate({title:post_title},{$set:{image_path:file_path}},function(err,response){
        if(err){
            console.log("cant update post collection:",err);
        }
        console.log("post collection updated",response);
    });

})


app.listen(3001, () => {
    console.log("server is running on port 3001");
});