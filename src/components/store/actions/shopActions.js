import uuidv5 from 'uuid/v5';

export const createGood = (good)=>{
    return (dispatch, getState, {getFirestore, getFirebase})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        const uploadTask = firebase.storage().ref().child(`${good.shopId}/goods/${uuidv5.DNS}`).put(good.photo);
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (err)=>{
                dispatch({type:'UPLOAD_GOOD_IMAGE_ERROR',err})
            },
            ()=>{
                uploadTask.snapshot.ref.getDownloadURL().then(url=>{
                    firestore.collection("goods").add({
                        name:good.name,
                        photoUrl:url,
                        shopId:good.shopId
                    })
                    .then(()=>{
                        dispatch({type:'ADDED_GOOD'})
                    })
                    .catch((err)=>{
                        dispatch({type:'ADDING_GOOD_FAILED', err})
                    })
                })
            }
        )
    }
}