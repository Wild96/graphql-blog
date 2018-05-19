import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './login'
import './index.css'
class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            files: null
        };
        this.signUp = this.signUp.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }


    handleUsernameChange(e) {
        this.setState({ username: this.refs.username.value })
    }

    handlePasswordChange(e) {
        this.setState({ password: this.refs.password.value })
    }

    handleFileUpload(e) {
        switch (e.target.name) {
            case 'selectedFile':
                this.setState(Object.assign(this.state, { files: e.target.files }));
                console.log("current values", this.state);
                break;
            default: 
                let update = {};
                update[e.target.name] = e.target.value;
                this.setState(Object.assign(this.state, update));
        }
    }

   async signUp(){        
        try {
            // const fd = new FormData( )
            // fd.append('username',this.state.username);
            // fd.append('password',this.state.password);
            // fd.append('files', this.state.files[0]);
            // console.log("state values :",this.state);
            // const config = {
            //     headers: { 'content-type': 'multipart/form-data' }
            // }
            // // axios.post('http://localhost:3001/Signup',fd, config)
            // .then(function (response) {
            //     console.log("response sent by axios :", response);
            // });
            // axios.post(`http://localhost:3001/upload/${this.state.username}`, fd);
          const userdetails = await axios.post('http://localhost:3001/graphql',{ 
                query : `mutation($username: String, $password: String) {
                    addUser(username: $username, password: $password) {
                      username
                    }
                  }`,
                  variables: {
                      username: this.state.username,
                      password: this.state.password
                  }
                });
          //  console.log("user details:",userdetails.data.data.addUser.username);
            var username = userdetails.data.data.addUser.username;
            //console.log("username",username);
            this.props.history.push("/profilepic/"+username);
            // }).then(function(response){
            //         console.log("axios response for signup route",response);
            //         console.log("username",response.data.data.addUser.username);
            //     }).catch(err => { console.log(err); });
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (

            <div className="container">
                <ul className="flex-outer">
                    <h1> Signup Page </h1>
                    <li>
                        <label>Username </label>
                        <input type="text" name="username" ref="username"
                            onChange={this.handleUsernameChange}
                            id="username" placeholder="Enter your username" />
                    </li>
                    <li>
                        <label >Password</label>
                        <input type="text" name="password" ref="password"
                            onChange={this.handlePasswordChange}
                            id="password" placeholder="Enter your password" />
                    </li>
                    <li>
                        <input type="file" name="selectedFile" onChange={this.handleFileUpload} />
                    </li>

                    <li>
                        <button type="submit" onClick={this.signUp}>Signup</button>
                    </li>

                    <li>
                        <Link to="/">  Click here to login </Link>
                    </li>
                </ul>
            </div>

        )
    }
}
export default Signup