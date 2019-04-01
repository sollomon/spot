export const getOrCreateChatChannel = (otherUserId)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore = getFirestore();
        const firebase = getFirebase();
        firestore.collection("users").doc(firebase.auth().currentUser.uid).collection("engagedChatChannels").doc(otherUserId).get().then((doc)=>{
            if(doc.exists){
               let channelId = doc.data().channelId
               console.log(channelId)
               dispatch({type:"CHATCHANNEL_SUCCESS",channelId})
            }else{
                firestore.collection('chatChannels').add({users:[firebase.auth().currentUser.uid,otherUserId]})
                .then((channel)=>{
                    let newChannelId = channel.id
                    dispatch({type:'CREATED_CHATCHANNEL',newChannelId})
                    firestore.collection("users").doc(firebase.auth().currentUser.uid).collection("engagedChatChannels").doc(otherUserId).set({channelId:channel.id})
                    .then(()=>{
                        console.log('add to engaged')
                        dispatch({type:'ADD_TO_ENGAGEDCHATS'})
                    }).catch((err)=>{
                        console.log('add to engaged err', err)
                        dispatch({type:'ADD_TO_ENGAGEDCHAT_ERROR', err})
                    })
                    firestore.collection("users").doc(otherUserId).collection("engagedChatChannels").doc(firebase.auth().currentUser.uid).set({channelId:channel.id})
                    .then(()=>{
                        console.log('add to other engaged')
                        dispatch({type:'ADD_TO_OTHER_ENGAGEDCHATS'})
                    }).catch((err)=>{
                        console.log('add to other err', err)
                        dispatch({type:'ADD_TO_OTHER_ENGAGEDCHAT_ERROR', err})
                    })
                }).catch(err=>{
                    dispatch({type:'CREATE_CHATCHANNEL_ERROR', err})
                })
            }
        })
    }
}