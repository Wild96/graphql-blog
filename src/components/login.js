import React from 'react'
import { Link } from 'react-router-dom'
import './signup'
import Authservice from './Authservice'
import './index.css'
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: " ",
            password: " "
        };
        this.signIn = this.signIn.bind(this);
        this.Auth = new Authservice();
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentWillMount() {


        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        }

    }
    async signIn() {
        const userdata = await axios.post('http://localhost:3001/graphql', {
            query: `query($username: String,$password: String){
                         UserQuery(username: $username, password: $password) {
                            username,
                            password,
                            image_path
                            }       
                    }`, variables: {
                username: this.state.username,
                password: this.state.password
            }
        });
        console.log("userquery result in login.js", userdata);
        var image_path = userdata.data.data.UserQuery.image_path;
        // console.log("data is null", userdata);
        console.log("image_path from user query:", image_path);
        const user_result = userdata.data.data.UserQuery;
        console.log("userdata", user_result);
        if (user_result == null) {
            console.log("invalid user details");
            console.log("user data is not fetched from query");
        }
        else {
          console.log("imagepath inside else block:",image_path);
            const token_gen = await axios.post('http://localhost:3001/graphql', {
                query: `mutation($username: String, $password: String,$image_path: String) {
                        addToken(username: $username, password: $password, image_path: $image_path) {
                          userData{
                              username,
                              password,
                              image_path
                          },
                          token
                        }
                      }`,
                variables: {
                    username: this.state.username,
                    password: this.state.password,
                   image_path: image_path
                }
            });
           console.log("response from axios in login.js", token_gen);
            var token = token_gen.data.data.addToken.token;
            console.log("token", token);
            this.Auth.setToken(token)
        }
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        }
    }

    handleUsernameChange() {
        this.setState({ username: this.refs.username.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: this.refs.password.value })
    }




    render() {
        return (

            <div className="container">
                <ul className="flex-outer">
                    <p className="flex-inner"> WEBER AUTHENTICATION PORTAL </p>
                    <li>
                        <label>Username </label>
                        <input type="text" ref="username" onChange={this.handleUsernameChange}
                            id="username" placeholder="Enter your username" />
                    </li>
                    <li>
                        <label >Password</label>
                        <input type="text" ref="password" onChange={this.handlePasswordChange}
                            id="password" placeholder="Enter your password" />
                    </li>
                    <li>
                        <button type="submit" onClick={this.signIn} >Login</button>
                    </li>
                    <li>
                        <Link to="/signup">  Not a  Member ? Signup </Link>
                    </li>

                </ul>
            </div>

        )
    }


}

export default Login
  /*
        axios.post('http://localhost:3001', {
            username: this.state.username,
            password: this.state.password
          })
          .then(function (response) {
            console.log(response);
           
          })
          .catch(function (error) {
            console.log(error);
          });
          */