import React from 'react';
import axios from'axios';
import { Link } from 'react-router-dom'
class Profilepic extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            files: null
        };
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.upload = this.upload.bind(this);
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
    async upload(){
        const fd = new FormData( )
        fd.append('files', this.state.files[0]);
            console.log("state values :",this.state);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            var props = this.props;
            console.log("props",props);
            var pathname = this.props.location.pathname;
            var path_array = pathname.split('/');
            var username = path_array[2];
            console.log("username:",username);
            //const axios_profilepic = await axios.post('http://localhost:3001/profilepic/'+this.props.match.params.username,fd, config)
            const axios_profilepic = await axios.post(`http://localhost:3001/profilepic/${username}`,fd,config)
            console.log("axios status of prof pic:",axios_profilepic);
    }   
     render(){
        return(
            <div>
                <p> Upload user Profilepic </p>
                <input type="file" name="selectedFile" onChange={this.handleFileUpload} />
                <button type="submit" onClick={this.upload}>Upload files</button>
                <Link to="/">  Click here to login </Link>  
            </div>
        );
       
    }
   
}
export default Profilepic