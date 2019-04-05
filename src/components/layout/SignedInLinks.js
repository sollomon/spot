import React, { Component } from 'preact';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../store/actions/authActions';

class SignedInLinks extends Component {
    render() {
        const {profile} = this.props;
        return (
            <div>
            <header className="links-mobile">
            <NavLink to="/"><button>Client</button></NavLink>
                    <input type="text" placeholder="Search..."/>
                <span ></span>
                <NavLink to='/'><button>Home</button></NavLink>
                <NavLink to='/chat'><button>Chat</button></NavLink>
                <button>Create</button>
                <button>Notification</button>
                <NavLink to='/profile'><button>{profile.initials}</button></NavLink>
                <button onClick={e=>this.props.signOut() }>Log Out</button>
            </header>
            <header className="links">
                <NavLink to="/"><button>Client</button></NavLink>
                    <input className="search" type="text" placeholder="Search..."/>
                <span ></span>
                <NavLink to='/'><button>Home</button></NavLink>
                <NavLink to='/chat'><button>Chat</button></NavLink>
                <button>Create</button>
                <button>Notification</button>
                <NavLink to='/profile'><button>{profile.initials}</button></NavLink>
                <button onClick={e=>this.props.signOut() }>Log Out</button>
            </header>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut:()=>dispatch(signOut())
    }
}

const mapStateToProps = (state)=>{
    return{
      profile:state.firebase.profile
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);