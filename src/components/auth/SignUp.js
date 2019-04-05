import React, { Component } from 'preact';
import {connect} from 'react-redux'
import {signUp} from '../store/actions/authActions';
import { Redirect } from 'react-router-dom'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:null,
            password:null,
            firstName:null,
            lastName:null,
        }
    }
    
    handleSignIn(e){
        e.preventDefault();
        this.props.signUp(this.state);
    }
    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (
            <div>
                <form onSubmit={this.handleSignIn.bind(this)}>
                    <input type="text" placeholder="First name" onChange={e=>this.setState({firstName:e.target.value})}/>
                    <input type="text" placeholder="Last name" onChange={e=>this.setState({lastName:e.target.value})}/>
                    <input type="text" placeholder="Email" onChange={e=>this.setState({email:e.target.value})}/>
                    <input type="password" placeholder="Password" onChange={e=>this.setState({password:e.target.value})}/>
                    <button type="submit">Sign up</button>
                    {authError ? <p>{authError}</p> : null}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        auth:state.firebase.auth,
        authError:state.auth.authError
    }
}

const mapDispathToProps = (dispatch) =>{
    return{
        signUp:(newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(SignUp);