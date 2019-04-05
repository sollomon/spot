import React, { Component } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard';
import './App.css';
import Header from './components/layout/Header';
import Chat from './components/chat/Chat';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Profile from './components/user/Profile';
import JobDescription from './components/work/JobDescription';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div style={{marginTop:'50px'}}>
                <Route exact path="/" component={DashBoard}/>
                <Route exact path='/chat/:userId' component={Chat}/>
                <Route exact path='/chat' component={Chat}/>
                <Route exact path="/login" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/profile" component={Profile}/>
                <Route exact path="/jobs/:jobId" component={JobDescription}/>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
