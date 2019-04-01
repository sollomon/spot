import React, { Component } from 'react';
import Messages from './Messages';
import {connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/fbConfig'; 
import BigMessage from './BigMessage';
//import {getOrCreateChatChannel} from '../store/actions/chatActions';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            userId:null,
            channelId:"pUstUNMmZARHl7PLbmDqFscKYEO2",
            otherUserId:null
        }
    }

    getOrCreateChatChannel(otherUserId){
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("engagedChatChannels").doc(otherUserId).get().then((doc)=>{
            if(doc.exists){
                let channelId = doc.data().channelId;
                this.setState({channelId:channelId})
                this.setState({otherUserId:otherUserId})
            }else{
                firebase.firestore().collection("chatChannels").add({users:[firebase.auth().currentUser.uid,otherUserId]})
                .then((channel)=>{
                    let newChannelId= channel.id;
                    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("engagedChatChannels").doc(otherUserId).set({channelId:newChannelId})
                    .then(()=>{
                        console.log('added to engaged');
                    })
                    .catch((err)=>{
                        console.log('add to engaged err',err)
                    })
                    firebase.firestore().collection("users").doc(otherUserId).collection("engagedChatChannels").doc(firebase.auth().currentUser.uid).set({channelId:newChannelId})
                    .then(()=>{
                        console.log('added to other engaged');
                    })
                    .catch((err)=>{
                        console.log('add to other engaged err',err);
                    })
                    this.setState({channelId:newChannelId})
                    this.setState({otherUserId:otherUserId})
                })
            }
        })
    }
    
    render() {
        const {users, auth} = this.props
        return (
            <div className="chat">
                <span className="engaged-chats">
                    {users && users.filter(user => user.id !== auth.uid).map(user=>{
                        return(
                            <div key={user.id}><button onClick={e=>this.getOrCreateChatChannel(user.id)}>{user.firstName} {user.lastName}</button></div>
                        )
                    })}
                </span>
                <span className="messages"><BigMessage otherUserId={this.state.otherUserId} channelId={this.state.channelId}/></span>
                <span className="chat-ads">ads</span>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log(state);
    return{
        auth:state.firebase.auth,
        users:state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        //getOrCreateChatChannel:(otherUserId)=>dispatch(getOrCreateChatChannel(otherUserId))
    }
  }

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection:'users'}
    ])
)(Chat);