const initState = {
    chats:[
        {id:1, user:'mercy'},
        {id:2, user:'james'},
        {id:3, user:'naomi'}
    ],
    id:null
};


const chatReducer = (state = initState,action)=>{
    switch (action.type){
        case 'CREATE_CHAT':
            console.log('created chat',action.chat);
            return state;

        case 'CREATE_CHAT_ERROR':
            console.log('create project error',action.err);
            return state;

        case 'ADD_TO_ENGAGEDCHATS':
            console.log('added chat to engagedChat');
            return state;

        case 'ADD_TO_ENGAGEDCHAT_ERROR':
            console.log('error adding chat to engagedChats',action.err);
            return state;

        case 'ADD_TO_OTHER_ENGAGEDCHATS':
            console.log('added chat to other engagedChat');
            return state;

        case 'ADD_TO_OTHER_ENGAGEDCHAT_ERROR':
            console.log('error adding chat to other engagedChat',action.err);
            return state;

        case 'CREATED_CHATCHANNEL':
            console.log('created new chat successfully',action.newChannelId);
            return{
                ...state,
                id:action.newChannelId
            }

        case "CHATCHANNEL_SUCCESS":
            console.log('chat channel there',action.channelId)
            return{
                ...state,
                id:action.channelId
            }

        case 'CREATE_CHATCHANNEL_ERROR':
            console.log('error creating new chat channel', action.err);
            return state;

        default: 
            return state;
    }

}

export default chatReducer