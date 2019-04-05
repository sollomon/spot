import React, { Component } from 'preact';
import firebase from '../../config/fbConfig';
import {createArticle} from '../store/actions/blogActions';
import {createGood} from '../store/actions/shopActions';
import {connect } from 'react-redux';
import {compose} from 'redux';

class ShopDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            shop:null,
            title:null,
            content:null,
            topics:null,
            name:null,
            photo:null
        }
    }

    componentWillMount(){
        this.getShop()
    }

    addArticle(e){
        const {shopId} = this.props;
        e.preventDefault();
        this.props.createArticle({
            title:this.state.title,
            time:new Date().getTime(),
            content:this.state.content,
            topic:this.state.topic,
            by:firebase.auth().currentUser.uid,
            blogId:shopId,
        })
    }

    addGood(e){
        const {shopId} = this.props;
        e.preventDefault();
        this.props.createGood({
            name:this.state.name,
            photo:this.state.photo,
            shopId:shopId
        })
    }
    
    getShop(){
        const {shopId} = this.props;
        firebase.firestore().collection("shops").doc(shopId).get().then(snapshot=>{
            if(snapshot.exists){
                const shop = snapshot.data()
                this.setState({shop:shop})
            }else{
                return null;
            }
        })
    }

    handleEditPhoto = event =>{
        this.setState({photo:event.target.files[0]})
    }

    render() {
        const {shop} = this.state;
        const {title} = this.props;
        if(shop){
            return (
                <div>
                    {shop.name}
                    {title === "ADMIN" && shop.type === "STORE" ? 
                        <form onSubmit={this.addGood.bind(this)}>
                            <input type="text" placeholder="Name" onChange={e=>this.setState({name:e.target.value})}/>
                            <input style={{display:"none"}} ref={fileInput => this.fileInput = fileInput} onChange={this.handleEditPhoto} type="file" />
                            <button onClick={()=>this.fileInput.click()}>Edit photo</button>
                            <button type="submit">Add</button>
                        </form> : null}
                    {title === "ADMIN" && shop.type === "BLOG" ? 
                        <form onSubmit={this.addArticle.bind(this)}>
                            <input type = "text" placeholder="Title" onChange={e=>this.setState({title:e.target.value})}/>
                            <input type = "text" placeholder="Content" onChange={e=>this.setState({content:e.target.value})}/>
                            <input type = "text" placeholder="Topic" onChange={e=>this.setState({topic:e.target.value})}/>
                            <button type="submit">Create</button>
                        </form> : null}
                    <img src={shop.photoUrl} alt={<svg class="placeholder" width="300px" height="300px"></svg>} className="user-img-big"/>
                    {shop.bio}
                </div>
            );
        }else{
            return(
                <div>No Shop Available</div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    return{
        auth:state.firebase.auth,
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return{
        createArticle:(article)=>dispatch(createArticle(article)),
        createGood:(good)=>dispatch(createGood(good))
    }
  }

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(ShopDetails);