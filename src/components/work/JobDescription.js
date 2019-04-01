import React, { Component } from 'react';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import ShopDetails from '../shop/ShopDetails';
import {Redirect} from 'react-router-dom';

class JobDescription extends Component {
    render() {
        const {job, auth} = this.props;
        if(!auth.uid) return <Redirect to="/login"/> 
        if(job){
            return (
                <div>
                    {job.description}
                    <div>{job.shop.name}</div>
                    <ShopDetails shopId={job.shopId}/>
                </div>
            );
        }else{
            return(
                <div>loading</div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps)=>{
    console.log(state)
    const jobId = ownProps.match.params.jobId;
    console.log(jobId)
    const work = state.firestore.ordered.work;
    console.log(work)
    //const job = work ? work[jobId] : null
    const job = work ? work.find(x=> x.id === jobId) : null;
    return {
        auth:state.firebase.auth,
        job:job
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
)(JobDescription);