import React, { Component } from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';

class Header extends Component {
  render() {
    const {auth} = this.props;
    const links = auth.uid ? <SignedInLinks/> : <SignedOutLinks/>;
    return (
      <div className="header">
        {links}
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  console.log(state);
  return{
    auth:state.firebase.auth
  }
}

export default connect(mapStateToProps)(Header);
