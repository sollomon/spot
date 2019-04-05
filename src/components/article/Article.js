import React, { Component } from 'preact';
import {connect} from 'react-redux';
import { compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Blog from '../blog/Blog';

class Article extends Component {
    render() {
        const {articles} = this.props;
        return (
            <div>
                {articles && articles.map(article=>{
                    return <div id="article" key={article.id}>
                        <div>{article.title}</div>
                        <div>{article.content}</div>
                        <Blog blogId={article.blogId}/>
                    </div>
                })}
                

            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        auth:state.firebase.auth,
        articles:state.firestore.ordered.articles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'articles'}
    ])
)(Article);