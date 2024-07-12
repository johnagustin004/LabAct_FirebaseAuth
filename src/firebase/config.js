import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAi911sElvsvNEfqyO86M_1vPFPyEGNNRY",
    authDomain: "labex-firebase.firebaseapp.com",
    projectId: "labex-firebase",
    storageBucket: "labex-firebase.appspot.com",
    messagingSenderId: "334298641944",
    appId: "1:334298641944:web:436bc2873cb5f1df19756d"
};

  initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export {db, auth}