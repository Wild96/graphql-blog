import React from 'react';
import Authservice from './Authservice';
import './home.css';
import AddPost from './AddPost';
import { Link } from 'react-router-dom';
import axios from 'axios';

class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        this.logout = this.logout.bind(this);
        // this.getData = this.getData.bind(this);
        this.Auth = new Authservice();
    }


    componentWillMount() {

        if (!this.Auth.loggedIn()) {
            this.props.history.replace('/')
        }
        else {
            this.getData();
        }
    }
    async getData() {
        try {
            let url = "http://localhost:3001/graphql";

            // let response = await axios.post(url, {
            //     token: this.Auth.getToken(),
            // });
            var response = await axios.post(url,{
                query:`query{
                    PostQuery(all:true){
                    _id
                      title,
                      postcontent,
                      username,
                      image_path
                    }
                  }`
            });
           // console.log("response",response);
            var posts = response.data.data.PostQuery;
           // console.log("posts",posts);
            this.setState({ posts: posts })
            console.log("Posts data in state: ", this.state.posts)
        } catch (e) {
            console.log(e);
            alert(e);
        }

    }

    logout() {
        this.Auth.logout();
        this.props.history.replace('/');
    }
    singleroute(a){
        this.props.history.replace('/singlePost/'+a);
      //  console.log("postid:",a);
    }
   

    render() {
        let img;
        let temp;
        const dataList = this.state.posts.map(a => {
            if(typeof a.image_path !== 'undefined'){
                console.log("image_path",this.state);
              // temp = a.image_path.split('/').slice(1).join('/');
            }else{
                temp = null;
            }
            img = `http://localhost:3001/${temp}`
            console.log(" post image name",img);
            return (
                <div className="main-content" key={a._id} onClick={ this.singleroute.bind(this,a._id) }>
                    <div className="watch">
                        <div className="watch-info">
                            <img src={img} alt="pic"/>
                            Title:  {a.title}
                            Description: {a.postcontent}
                            Username :{a.username}
                        </div>
                    </div>
                </div>

            )
        })
        return (
            <div>
                <header className="header-container">
                    <div className="logo">
                        <h4> Blogging App</h4>
                    </div>
                    <nav>
                        <ul>
                            <li><Link to="/AddPost">AddPost</Link>  </li>
                            <li> <a onClick={this.logout}> Logout </a> </li>
                        </ul>
                    </nav>
                </header>

                <div className="main-heading">
                    <div className="logo">
                        User Feed
                    </div>
                </div>
                <div className="header-container">
                    <div className=" main-content">
                        {dataList}
                    </div>
                </div>


                <footer>
                    <h5>Copyright 2018 TheIoFactory PvtLtd. - All Rights Reserved</h5>
                </footer>

            </div>


        )
    }
}
export default home
