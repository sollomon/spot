import React, { Component } from 'preact';
import {connect } from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {getOrCreateChatChannel} from '../store/actions/chatActions';
import {withRouter} from 'react-router-dom';

class EngagedChats1 extends Component {
    constructor(props) {
        super(props);
        this.state={
            engagedUsers:null
        }
    }

    handleClick(user){
        this.props.getOrCreateChatChannel(user.id)
        this.props.history.push(`/chat/${user.id}`)
    }
    
    render() {
        const {users, auth} = this.props;
        return (
            <div>
                {users && users.filter(user => user.id !== auth.uid).map(user=>{
                    return(
                        <div key={user.id}><button className="contact" onClick={e=>this.handleClick(user)}>{user.firstName}</button></div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        auth:state.firebase.auth,
        users:state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        getOrCreateChatChannel:(otherUserId)=>dispatch(getOrCreateChatChannel(otherUserId))
    }
  }
const EngagedChats = withRouter(EngagedChats1)
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection:'users'}
    ])
)(EngagedChats);