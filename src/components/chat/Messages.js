import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import {getOrCreateChatChannel} from '../store/actions/chatActions';
import {createMessage} from '../store/actions/messageActions';
import {connect } from 'react-redux';
import moment from 'moment';
//"O41DbCPQpBGAQXbItvf9"

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state={
            messages:null,
            messageToSend:null,
        }
    }
    
    componentDidUpdate(){
        const {channelId} = this.props;
            firebase.firestore().collection("chatChannels").doc(channelId).collection("messages").orderBy("time").onSnapshot((querySnapshot)=>{
                const messages = [];
                querySnapshot.forEach(doc=>{
                    messages.push(doc.data());
                });
                
                this.setState({messages:messages})
            })
    }
    handleSendMessage(){
        const {channelId, auth, profile, otherUserId}= this.props;
        this.props.createMessage(channelId,{
            recipientId:otherUserId,
            senderfName:profile.firstName,
            senderlName:profile.lastName,
            senderId:auth.uid,
            text:this.state.messageToSend,
            time:new Date().getTime(),
            type:"TEXT"
        })
    }
    closeSlide(){
        document.getElementById("chat-room").style.width = "0";
    }
    render() {
        const {messages} = this.state;
        const {auth} = this.props;
        return (
            <div className="chat-room" id="chat-room">
            <button onClick={e=>this.closeSlide()}>close</button>
            <div className="messages">
                {messages && messages.map(message=>{
                    const time = moment(message.time).format('MMM Do, h:mm a');
                    if(message.type === "TEXT"){
                        return(
                            <div className="message1" key={message.time}><button className="text1">{message.text}</button><br/> <p className="time">{time}</p> </div>
                        )
                    }else{
                        return(
                            <img key={message.time} src={message.imagePath} alt="waiting" className="message-image"/>
                        )
                    }
                })}
            </div>
            <hr/>
            <div className="send-message">
                <input type="text" placeholder="Send Message" onChange={e=>this.setState({messageToSend:e.target.value})}/>
                <button onClick={e=>this.handleSendMessage()}>Send</button>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log(state)
    return{
        auth:state.firebase.auth,
        id:state.chat.id,
        profile:state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getOrCreateChatChannel:(otherUserId)=>dispatch(getOrCreateChatChannel(otherUserId)),
        createMessage:(id,messageToSend)=>dispatch(createMessage(id,messageToSend))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Messages);