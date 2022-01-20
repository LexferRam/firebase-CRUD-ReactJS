// import firebase from "firebase/app";
// import 'firebase/firestore'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDeHdf1ShCUCmmsCXdud1XUMDj14oxv2z4",
    authDomain: "fir-crud-7bbe2.firebaseapp.com",
    projectId: "fir-crud-7bbe2",
    storageBucket: "fir-crud-7bbe2.appspot.com",
    messagingSenderId: "934299070612",
    appId: "1:934299070612:web:dea57c5c4f640878ffc481"
};

// Initialize Firebase
// const fb = firebase.initializeApp(firebaseConfig);

// export const db = fb.firestore();

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore()


