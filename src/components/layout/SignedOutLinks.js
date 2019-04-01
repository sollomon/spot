import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SignedOutLinks extends Component {
    render() {
        return (
            <header>
                <NavLink to='/signup'><button>SignUp</button></NavLink>
                <NavLink to='/login'><button>Login</button></NavLink>
            </header>
        );
    }
}

export default SignedOutLinks;