import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Contacts from '../user/Contacts';
import firebase from '../../config/fbConfig';
import Messages from '../chat/Messages';
import Work from '../work/Work';
import Shopping from '../shopping/Shopping';


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            channelId:null,
            otherUserId:null,
        }
    }
    
    handleClick(user){
        this.setState({})
        document.getElementById("chat-room").style.width = "100%";
    }
    getOrCreateChatChannel(otherUserId){
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("engagedChatChannels").doc(otherUserId).get().then((doc)=>{
            if(doc.exists){
                let channelId = doc.data().channelId;
                console.log(channelId)
                this.setState({channelId:channelId})
                this.setState({otherUserId:otherUserId})
                document.getElementById("chat-room").style.width = "100%";
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
                    document.getElementById("chat-room").style.width = "100%";
                })
            }
        })
    }
    closeSlide(){
        document.getElementById("chat-room").style.width = "0";
    }
    render() {
        const {auth, users} = this.props;
        if(!auth.uid) return <Redirect to="/login"/> 
        return (
            <div className="home">
                <span className="contacts">
                <div></div>
                    <div className="sticky">
                    {users && users.filter(user => user.id !== auth.uid).map(user=>{
                        return(
                            <div key={user.id}><button onClick={e=>this.getOrCreateChatChannel(user.id)}>
                        <img src={user.photoUrl} alt={user.initials} className="avatar-small"/>
                        {user.firstName}
                        </button><br/></div>
                        )
                    })}
                    </div>
                    
                </span>
                <span className="shopping">
                    {this.state.channelId ? <Messages otherUserId={this.state.otherUserId} channelId={this.state.channelId}/> : null}
                    <div>
                        <Shopping/>
                    </div>
                </span>
                <span className="work">
                    <Work/>
                </span>
                <span className="ads">ads</span>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        auth:state.firebase.auth,
        users:state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'users'}
    ])
)(DashBoard);