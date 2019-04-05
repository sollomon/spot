import React, { Component } from 'preact';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Good from '../shop/Good';

class Shopping extends Component {
    render() {
        const {goods} = this.props;
        return (
            <div>
                {goods && goods.map(good=>{
                    return <Good key={good.id} good={good}/>
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