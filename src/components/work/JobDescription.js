import React, { Component } from 'preact';
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
                    {job.title}
                    
                    <ShopDetails title={job.title} shopId={job.shopId}/>

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
    const jobId = ownProps.match.params.jobId;
    const work = state.firestore.ordered.work;
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