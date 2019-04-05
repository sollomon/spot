import { combineReducers } from 'redux';
import {firestoreReducer} from 'redux-firestore';
import {firebaseReducer} from 'react-redux-firebase';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';
import jobReducer from './jobReducer';
import blogReducer from './blogReducers';

const rootReducer = combineReducers({
    firestore:firestoreReducer,
    firebase:firebaseReducer,
    auth:authReducer,
    chat:chatReducer,
    message:messageReducer,
    shop:jobReducer,
    blog:blogReducer
});

export default rootReducer;