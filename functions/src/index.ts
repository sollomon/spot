import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

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
