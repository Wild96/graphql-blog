import React, { Component } from 'react';
import axios from 'axios';
import Authservice from './Authservice';
import {Link} from 'react-router-dom';

class SinglePost extends Component {
    constructor(props) {
        super(props);
        this.state={
            feed : null
        }
        this.homeroute = this.homeroute.bind(this);
        this.logout = this.logout.bind(this);
        this.Auth = new Authservice();
    }
    homeroute() {
        this.props.history.replace('/');
    }
    logout() {
        this.Auth.logout();
        this.props.history.replace('/')
    }
    async componentWillMount() {
        try {
            // console.log("singlepostid:",this.props.match.params.id);
            // var feed = await axios.get(`http://localhost:3001/singlePost/${this.props.match.params.id}`);
            // this.setState({
            //     feed: feed.data.data
            // })
           const singlepost = await axios.post("http://localhost:3001/graphql",{
            query : `query($id:String){
                PostQuery(id:$id){
                  username
                  postcontent
                  title
                }
              }`,
              variables: {
                    id:this.props.match.params.id
              }
           });
           console.log(this.props.match.params.id)
            console.log("single post:",singlepost);
            var posts_data = singlepost.data.data.PostQuery[0];
            //console.log("universe",posts_data);
            this.setState({
                feed:singlepost.data.data.PostQuery[0]
            })

            console.log("singlepost state:",this.state);
           

        }
        catch (e) {
            console.log(e);
        }
    }



    render() {
        if(this.state.feed != null){
            return (
                <div>
                    <div>
                        <nav className="navheader">
                            <a onClick={this.homeroute}>Home</a>
                            <a onClick={this.logout}> Logout </a>
                        </nav>
                    </div>
                    <div>
                        Post detail
                        <p> title {this.state.feed.title}</p>
                        <p> description{this.state.feed.postcontent} </p>
                        <Link to ="/"> Home page </Link>
                    </div>
                  
                </div>
            );
        }
        return (<div>No Data</div>);
    }
}

export default SinglePost;