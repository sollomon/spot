import React, { Component } from 'preact';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Shops extends Component {
    render() {
        const {shops} = this.props;
        return (
            <div>
                {shops && shops.map(shop=>{
                    return (
                        <div key={shop.id}>
                            <img alt={shop.name} src={shop.photoUrl} className="avatar"/>
                            <div>{shop.name}</div>
                        </div>
                    )
                })}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps)=>{
    return {
        auth:state.firebase.auth,
        shops:state.firestore.ordered.shops
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
    firestoreConnect(props=>{
        return [
            {
                collection:'shops',
                where:[['goods','array-contains',props.goodId]]
            }
        ]
    })
)(Shops);