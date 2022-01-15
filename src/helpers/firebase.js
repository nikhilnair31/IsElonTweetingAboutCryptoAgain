import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyC4rIPge2S2ZiNEgv43GOyjTa3Rt1J7iAQ",
    authDomain: "crypto-musk.firebaseapp.com",
    projectId: "crypto-musk",
    storageBucket: "crypto-musk.appspot.com",
    messagingSenderId: "730394249825",
    appId: "1:730394249825:web:43a32c420c5ec0980af820",
    measurementId: "G-YF1JS902JL"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const dbref = firebase.firestore();

export const twitterProvider = new firebase.auth.TwitterAuthProvider();