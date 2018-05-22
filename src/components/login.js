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
        try {
            const userdata = await axios.post('http://localhost:3001/graphql', {
                query:`query($username: String,$password: String){
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
            console.log("user data from login.js", userdata);
            var image_path = userdata.data.data.UserQuery.image_path;
            console.log("image_path",image_path);
        }
        catch (e) {
            console.log("user data error", e);
        }
        try {
            console.log("image_path of query:",image_path);
            const token_gen = await axios.post('http://localhost:3001/graphql', {
                query: `mutation($username: String, $password: String,$image_path: String) {
                    addToken(username: $username, password: $password, image_path: $image_path) {
                      token,
                      userData{
                          username,
                          password,
                          image_path
                      }
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
            if (this.Auth.loggedIn()) {
                this.props.history.replace('/home');
            }

        } catch (e) {
            console.log("token gen error",e)    ;
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