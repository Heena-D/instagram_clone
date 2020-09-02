import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCfxaTjlOaRVkQ_DIBoeHSEFKFj33A91E0",
    authDomain: "ig-clone-2138a.firebaseapp.com",
    databaseURL: "https://ig-clone-2138a.firebaseio.com",
    projectId: "ig-clone-2138a",
    storageBucket: "ig-clone-2138a.appspot.com",
    messagingSenderId: "215770874557",
    appId: "1:215770874557:web:b95f6e553c17caa525add4",
    measurementId: "G-M9DVNGGYD9"
  });

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage};

