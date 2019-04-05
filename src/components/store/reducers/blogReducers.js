const initState = {
    articleError:null
};

const blogReducer = (state= initState, action)=>{
    switch(action.type){
        case 'CREATE_ARTICLE':
        return{
            ...state,
            articleError:null
        }

    case 'CREATE_ARTICLE_ERROR':
        return{
            ...state,
            articleError:action.err.message
        }

    default:
    return state;
    }
}

export default blogReducer;