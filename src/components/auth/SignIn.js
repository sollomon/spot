import React, { Component } from 'preact';
import {connect} from 'react-redux'
import {signIn} from '../store/actions/authActions';
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:null,
            password:null
        }
    }
    
    handleLogin(e){
        e.preventDefault();
        this.props.signIn(this.state);
        this.props.history.push('/');
    }
    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (
            <div>
                <form onSubmit={this.handleLogin.bind(this)}>
                    <input type="text" placeholder="Email" onChange={e=>this.setState({email:e.target.value})}/>
                    <input type="password" placeholder="Password" onChange={e=>this.setState({password:e.target.value})}/>
                    <button type="submit">Login</button>
                    {authError ? <p>{authError}</p> : null}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        authError:state.auth.authError,
        auth:state.firebase.auth
    }
}

const mapDispathToProps = (dispatch) =>{
    return{
        signIn:(creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispathToProps)(SignIn);