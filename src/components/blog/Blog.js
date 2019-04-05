import React, { Component } from 'preact';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state={
            blog:null
        }
    }
    
    getBlog(){
        const {blogId} = this.props;
        firebase.firestore().collection("shops").doc(blogId).get().then((snapshot)=>{
            if(snapshot.exists){
                this.setState({blog:snapshot.data()})
            }else{
                this.setState({blog:null})
            }
        })
    }
    componentDidMount(){
        this.getBlog()
    }
    render() {
        const {blog}= this.state;
        return (
            <div>
                {blog ? 
                    <div>
                        <img className="avatar" alt={blog.name} src={blog.photoUrl}/>
                        <div>{blog.name}</div>
                    </div> : null}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps)=>{
    return {
        auth:state.firebase.auth,
        shops:state.firestore.ordered.shops
    }
}
//"I29tSSQHXLyHo0u9s3VC"

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(Blog);