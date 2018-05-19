import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
class AddPostPic extends React.Component{
    constructor(props){
        super(props)
        this.state={
            files: null,
        }
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.upload = this.upload.bind(this);
    }
    handleFileUpload(e){
        switch (e.target.name) {
            case 'post-image':
                this.setState(Object.assign(this.state, { files: e.target.files }));
                console.log("changed state values", this.state);
                break;
            default:
                let update = {};
                update[e.target.name] = e.target.value;
                this.setState(Object.assign(this.state, update));
        }
    }
  async  upload(){
       
        const fd = new FormData( )
        fd.append('files', this.state.files[0]);
            console.log("state values :",this.state);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            var props = this.props;
            console.log("props",props);
            var pathname = this.props.location.pathname;
            var path_array= pathname.split('/');
            var post_title = path_array[2];
            console.log("psot title",post_title);
            const axios_postpic = await axios.post(`http://localhost:3001/postpic/${post_title}`,fd,config)
            console.log("axios status of prof pic:",axios_postpic);
            
    }
    render(){
        return(
            <div>
                 <input type="file" name="post-image" onChange={this.handleFileUpload} />
                 <button type="button" value="submit" onClick={this.upload} >Upload Pic </button>
                 <Link to="/home">  home </Link>  

            </div>
        )
    }
}
export default AddPostPic