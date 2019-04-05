import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const attachArticleToBlog = functions.firestore.document('articles/{article}').onCreate((snapshot,context)=>{
  const articleData = snapshot.data()!;
  const articleId = snapshot.id;
  const blogId = articleData.blogId;
  return admin.firestore().collection("shops").doc(blogId).update({articles:admin.firestore.FieldValue.arrayUnion(articleId)})
  
})

export const attachGoodToShop = functions.firestore.document('goods/{good}').onCreate((snapshot,context)=>{
  const goodData = snapshot.data()!;
  const goodId = snapshot.id;
  const shopId = goodData.shopId;
  return admin.firestore().collection("shops").doc(shopId).update({goods:admin.firestore.FieldValue.arrayUnion(goodId)})
})

export const createShopAdmin = functions.firestore.document('shops/{shop}').onCreate((snapshot,context)=>{
  const shopData = snapshot.data()!;
  const shopId = snapshot.id;
  const creatorId = shopData.createdBy;
  return admin.firestore().collection("work").add({
    title:"ADMIN",
    description:"CREATOR",
    shopId:shopId,
    userId:creatorId

  }).then((results)=>{
    const workId = results.id;
    const p1 = admin.firestore().collection("shops").doc(shopId).collection("workers").doc(creatorId).set({workId:workId})
    const p2 = admin.firestore().collection("users").doc(creatorId).collection("jobs").doc(workId).set({status:true})
    return Promise.all([p1, p2])
  })
  
})

export const nameToUpperCase = functions.firestore.document('users/{user}').onCreate((snapshot,context)=>{
    const userdata = snapshot.data()!;
    const userId = snapshot.id;
    const fName = userdata.firstName;
    const lName = userdata.lastName;
    const firstName = capitalizeName(fName)
    const lastName = capitalizeName(lName)
    console.log(firstName,lastName,userId)
    const initials = firstName[0] + lastName[0];
    return admin.firestore().doc(`users/${userId}`).update({firstName:firstName,lastName:lastName,initials:initials});
})

function capitalizeName(name:String){
    if(!name) return name;
    return name[0].toUpperCase() + name.substr(1).toLowerCase();
}

export const notifyNewMessage = functions.firestore.document('chatChannels/{channelId}/messages/{message}').onCreate((snapshot,context)=>{
  const messageSnapShot = snapshot.data()!
  const recipientId = messageSnapShot.recipientId
  const senderfName = messageSnapShot.senderfName
  const senderlName = messageSnapShot.senderlName
  const senderId = messageSnapShot.senderId
  return admin.firestore().doc(`users/${recipientId}`).get().then(userDoc=>{
    const registrationTokens = userDoc.get('registrationTokens')
    const notificationBody = (messageSnapShot.type === "TEXT") ? messageSnapShot.text : "New Message."
    const payload = {
      notification:{
        title :`${senderfName} ${senderlName} sent you a message`,
        body:notificationBody,
        clickAction:"ChatActivity"
      },
      data:{
        FIRST_NAME: senderfName,
        LAST_NAME:senderlName,
        USER_ID: senderId
      }
    }

    return admin.messaging().sendToDevice(registrationTokens[0], payload).then(response=>{
      const stillRegisteredTokens = registrationTokens
      response.results.forEach((result,index)=>{
        const error = result.error;
        if(error){
          const failedRegistrationTokens = registrationTokens[index]
          console.error('error',failedRegistrationTokens,error);
          if(error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-registerd'){
            const failedIndex = stillRegisteredTokens.indexOf(failedRegistrationTokens)
            if(failedIndex > -1){
              stillRegisteredTokens.splice(failedIndex, 1)
            }
          }
        }
      })
      return admin.firestore().doc(`users/${recipientId}`).update({registrationTokens:stillRegisteredTokens})
    })
  })
})
