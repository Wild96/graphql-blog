import React from 'react';
import './addpost.css'
import axios from 'axios';
import Authservice from './Authservice';



class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: " ",
            postcontent: " ",
           // files: null,
            img_path:null,
            username:null

        };
        this.contentchange = this.contentchange.bind(this);
        this.sendcontent = this.sendcontent.bind(this);
        this.titlechange = this.titlechange.bind(this);
        this.logout = this.logout.bind(this);
        this.homeroute = this.homeroute.bind(this);
        // this.handleFileUpload = this.handleFileUpload.bind(this);
        this.Auth = new Authservice();
      //this.getImage = this.getImage.bind(this);
    }
    
    async componentWillMount(){
        let token = this.Auth.getToken();
         console.log("token details:",token);
        try{
            // const response = await axios.post("http://localhost:3001/getpic",{token: token});
            // console.log("axios response:",response);
            const response = await axios.post("http://localhost:3001/graphql",{
                query:`query($token: String){
                    TokenQuery(token:$token) {
                      userData {
                        username
                        image_path
                      }
                    }
                  }`,variables:{
                      token : token
                  }
                });
                console.log("response for add post",response);
                var userData = response.data.data.TokenQuery.userData;
                console.log("userData",userData);
                var username = userData.username;
                var image_path = userData.image_path;
                console.log("username:",username);
                console.log("profilepic",image_path);
                
            
            this.setState({ 
                img_path: image_path.split('/').slice(1).join('/'),
                username:username
            
            })
           console.log(this.state);
        }
        catch(e){
            console.log("error",e);
        }
    }

    contentchange() {
        this.setState(
            { postcontent: this.refs.postcontent.value }
        )
    }
    homeroute() {
        this.props.history.replace('/');
    }
    logout() {
        this.Auth.logout();
        this.props.history.replace('/');
    }
    titlechange() {
        this.setState(
            { title: this.refs.title.value }

        )
    }
    // handleFileUpload(e) {
    //     switch (e.target.name) {
    //         case 'post-image':
    //             this.setState(Object.assign(this.state, { files: e.target.files }));
    //             console.log("changed state values", this.state);
    //             break;
    //         default:
    //             let update = {};
    //             update[e.target.name] = e.target.value;
    //             this.setState(Object.assign(this.state, update));
    //     }
    // }
  async sendcontent() {
        try {

            // let token_id = this.Auth.getToken();
            // const data = new FormData();
            // data.append("title", this.state.title);
            // data.append("postcontent", this.state.postcontent);
            // //data.append("files", this.state.files[0]);
            // data.append("token_id",token_id);
            // var config = {
            //     headers: { 'content-type': 'multipart/form-data' }
            // }
            // axios.post("http://localhost:3001/AddPost", data, config)
            // .then(function (response) {
            //     console.log("response sent by axios :", response);
            // });
            console.log("state values before sending:",this.state);
            const response = await axios.post("http://localhost:3001/graphql",{
                query : `mutation($title:String,$postcontent:String,$username: String) {
                    addPost(title:$title,postcontent:$postcontent,username: $username) {
                      title,
                      postcontent,
                      username
                    }
                  }`,
                  variables: {
                    title:this.state.title,
                    postcontent:this.state.postcontent,  
                    username: this.state.username,
                  }
            });
            console.log("response:",response);
            var title = response.data.data.addPost.title;
            this.props.history.push("/AddPostPic/"+title);
        }
        catch (error) {
            console.log("Error while seding to server",error);
        };
        
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <nav className="navheader">
                        <a onClick={this.homeroute}>Home</a>
                        <a onClick={this.logout}> Logout </a>
                    </nav>
                </div>
                <div className="content">
                    <div>
                    <p>Active user : {this.state.username}</p>
                    Profile pic:
                        <img src={this.state.img_path} alt=" profile pic" />
                       
                    </div>
                    <h1> Create post </h1>
                    <div >
                        <textarea className="text-title" id="title" name="title" ref="title" placeholder="Enter post title"
                            onChange={this.titlechange} />
                    </div>
                    <div >
                        <textarea type="text" id="postcontent" ref="postcontent"
                            placeholder="Enter post description" onChange={this.contentchange} />
                    </div>
                </div>
                <div className=" post-image ">
                    {/* <input type="file" name="post-image" onChange={this.handleFileUpload} /> */}
                    <button type="button" value="submit" onClick={this.sendcontent} >
                        Create post
                         </button>
                </div>

            </div>
        )
    }
}
export default AddPost
