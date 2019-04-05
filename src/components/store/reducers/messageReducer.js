const initState = {
    messages:null,
    messageError:null
}

const messageReducer = (state=initState,action)=>{
    switch(action.type){
        case 'CREATE_MESSAGE':
            return state;

        case 'CREATE_MESSAGE_ERROR':
            return{
                ...state,
                messageError:action.err.message
            };

        case 'MESSAGES':
            return{
                ...state,
                messages:action.messages
            }

        case 'MESSAGES_ERROR':
            return{
                ...state,
                messageError:action.err.message
            };

        default:
            return state;
    }
}

export default messageReducer;