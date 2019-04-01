import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

var config = {
  apiKey: "AIzaSyAY-D8K295cTUy7sjT9RYdByxJL7LxP2KA",
  authDomain: "spot-e6c81.firebaseapp.com",
  databaseURL: "https://spot-e6c81.firebaseio.com",
  projectId: "spot-e6c81",
  storageBucket: "spot-e6c81.appspot.com",
  messagingSenderId: "858455943436"
};
firebase.initializeApp(config);

export default firebase;

