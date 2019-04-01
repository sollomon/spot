export const createMessage = (channelId,message)=>{
    return (dispatch, getState,{getFirebase, getFirestore})=>{

        const firestore = getFirestore();
        firestore.collection('chatChannels').doc(channelId).collection("messages").add(message).then(()=>{
            dispatch({type:'CREATE_MESSAGE', message});
        }).catch((err)=>{
            dispatch({type:'CREATE_MESSAGE_ERROR', err});
        })
    }
};

export const messagesListener = (channelId)=>{
    return(dispatch,getState,{getFirestore, getFirebase})=>{
        const firestore = getFirestore();

        firestore.collection("chatChannels").doc(channelId).collection("messages").onSnapshot((querySnapshot)=>{
            const messages = [];
            querySnapshot.forEach(doc=>{
                messages.push(doc.data());
            });
            dispatch({type:"MESSAGES",messages});
        })
    }
}