import React, { Component } from 'react';
import {connect} from 'react-redux';
import {uploadProfile} from '../store/actions/userActions';
import { Redirect } from 'react-router-dom'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            photo:null,
        }
    }
    fileUploader = event =>{
        this.props.uploadProfile(this.state.photo)
    }
    handleEditPhoto = event =>{
        this.setState({photo:event.target.files[0]})
    }
    render() {
        const {profile} = this.props;
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/login'/>
        return (
            <div>
                <div>{profile.firstName} {profile.lastName} </div>
                <div>{ profile.photoUrl ? <img src={profile.photoUrl} alt="" className="user-img-big" /> : <button className="no-user-img">{profile.initials}</button>}</div>
                <input style={{display:"none"}} ref={fileInput => this.fileInput = fileInput} onChange={this.handleEditPhoto} type="file" />
                <button onClick={()=>this.fileInput.click()}>Edit photo</button>
                <button onClick={this.fileUploader}>Ok</button>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log(state);
    return{
      profile:state.firebase.profile,
      auth:state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        uploadProfile:(photo)=>dispatch(uploadProfile(photo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);