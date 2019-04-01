import uuidv5 from 'uuid/v5';

export const uploadProfile = (photo) =>{
    return (dispatch,getState,{getFirebase, getFirestore})=>{
        const firebase = getFirebase();
        const firestore  = getFirestore();

        const uploadTask = firebase.storage().ref().child(`${firebase.auth().currentUser.uid}/images/${uuidv5.DNS}`).put(photo);
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (err)=>{
                dispatch({type:'UPLOAD_PHOTO_ERROR',err})
            },
            ()=>{
               uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                const user = firebase.auth().currentUser;
                firestore.collection('users').doc(user.uid).update({
                    "photoUrl":url
                }).then(()=>{
                    dispatch({type:'UPDATED_PHOTO'})
                })
                .catch((err)=>{
                    dispatch({type:'UPDATE_PHOTO_ERROR',err})
                })
               })
               
            }
        )
    }
}