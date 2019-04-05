const initState = {
    goodError:null
};

const shopReducer = (state=initState, action)=>{
    switch(action.type){
        case 'UPLOAD_GOOD_IMAGE_ERROR':
            return{
                ...state,
                goodError:action.err.message
            }
        
        case 'ADDED_GOOD':
            return{
                ...state,
                goodError:null
            }
        case 'ADDING_GOOD_FAILED':
            return{
                ...state,
                goodError:action.err.message
            }
        default:
        return state;
    }
}

export default shopReducer;