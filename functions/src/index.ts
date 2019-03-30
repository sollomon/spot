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
