import React, { Component } from 'react';
import firebase from '../../config/fbConfig';

class ShopDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            shop:null
        }
    }

    componentWillMount(){
        this.getShop()
    }
    
    getShop(){
        const {shopId} = this.props;
        firebase.firestore().collection("shops").doc(shopId).get().then(snapshot=>{
            if(snapshot.exists){
                const shop = snapshot.data()
                this.setState({shop:shop})
            }else{
                console.log("no such document")
            }
        })
    }

    render() {
        const {shop} = this.state;
        if(shop){
            return (
                <div>
                    {shop.name}
                    <img src={shop.photoUrl} alt="https://via.placeholder.com/300" className="user-img-big"/>
                    {shop.bio}
                    {shop.goods && shop.goods.map(good=>{
                        return (
                            <div>{good.name}</div>
                        )
                    })}
                </div>
            );
        }else{
            return(
                <div>loading</div>
            )
        }
    }
}

export default ShopDetails;