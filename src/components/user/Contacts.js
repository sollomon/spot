import React, { Component } from 'react';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {NavLink} from 'react-router-dom';

class Contacts extends Component {
    handleClick(){
        document.getElementById("slide").style.width = "auto";
    }
    render() {
        const {users,auth} = this.props;
        console.log(users)
        return (
            <div>
                {users && users.filter(user => user.id !== auth.uid).map(user=>{
                    return(
                        <div key={user.id}><button onClick={e=>this.handleClick(user)}>
                        <img src={user.photoUrl} alt={user.initials} className="avatar-small"/>
                        {user.firstName}
                        </button><br/></div>
                    )
                })}
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
)(Contacts);