import React, { Component } from 'react';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';
import {NavLink} from 'react-router-dom';

class Work extends Component {
    constructor(props) {
        super(props);
        this.state={
            jobs:null
        }
    }

    /*componentDidMount(){
        this.getWork()
    }

    getWork(){
        firebase.firestore().collection("work").where("userId", "==", firebase.auth().currentUser.uid).get()
        .then(snapShot=>{
            const jobs = [];
            snapShot.forEach(doc=>{
                jobs.push(doc.data());
            })
            console.log(jobs);
            this.setState({jobs:jobs})
        })
    }
    
    getWork(){
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).collection("jobs").get()
        .then(snapshot=>{
            const jobs = [];
            snapshot.forEach(doc=>{
                firebase.firestore().collection("work").doc(doc.id).get().then(jobSnapshot=>{
                    jobs.push(jobSnapshot);
                })
            })
            console.log(jobs)
            this.setState({jobs:jobs})
        })
    }*/
    render() {
        const {work} = this.props;
        return (
            <div>
                {work && work.map(job=>{
                    return(
                        <NavLink to={`/jobs/${job.id}`} key={job.id}>{job.description} {job.shop.name}</NavLink>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    console.log(state)
    return {
        auth:state.firebase.auth,
        work:state.firestore.ordered.work
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
    firestoreConnect(props=>{
        return [
            {collection:'work',where:[['userId','==',props.auth.uid]]}
        ]
    })
)(Work);