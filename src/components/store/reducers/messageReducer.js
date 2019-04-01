const initState = {
    messages:null
}

const messageReducer = (state=initState,action)=>{
    switch(action.type){
        case 'CREATE_MESSAGE':
            console.log('message created');
            return state;

        case 'CREATE_MESSAGE_ERROR':
            console.log('message creation error',action.err);
            return state;

        case 'MESSAGES':
            console.log('messages',action.messages);
            return{
                ...state,
                messages:action.messages
            }

        case 'MESSAGES_ERROR':
            console.log('messages error',action.err);
            return state;

        default:
            return state;
    }
}

export default messageReducer;