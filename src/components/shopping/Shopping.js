import React, { Component } from 'react';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Shopping extends Component {
    render() {
        const {goods} = this.props;
        return (
            <div>
                {goods && goods.map(good=>{
                    return <div>{good.name}</div>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        auth:state.firebase.auth,
        goods:state.firestore.ordered.goods
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'goods'}
    ])
)(Shopping);