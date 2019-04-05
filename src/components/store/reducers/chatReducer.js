const initState = {
    chats:[
        {id:1, user:'mercy'},
        {id:2, user:'james'},
        {id:3, user:'naomi'}
    ],
    id:null,
    chatError:null
};


const chatReducer = (state = initState,action)=>{
    switch (action.type){
        case 'CREATE_CHAT':
            return state;

        case 'CREATE_CHAT_ERROR':
            return{
                ...state,
                chatError:action.err.message
            };

        case 'ADD_TO_ENGAGEDCHATS':
            return state;

        case 'ADD_TO_ENGAGEDCHAT_ERROR':
            return{
                ...state,
                chatError:action.err.message
            };

        case 'ADD_TO_OTHER_ENGAGEDCHATS':
            return state;

        case 'ADD_TO_OTHER_ENGAGEDCHAT_ERROR':
            return{
                ...state,
                chatError:action.err.message
            };

        case 'CREATED_CHATCHANNEL':
            return{
                ...state,
                id:action.newChannelId
            }

        case "CHATCHANNEL_SUCCESS":
            return{
                ...state,
                id:action.channelId
            }

        case 'CREATE_CHATCHANNEL_ERROR':
            return{
                ...state,
                chatError:action.err.message
            };

        default: 
            return state;
    }

}

export default chatReducer