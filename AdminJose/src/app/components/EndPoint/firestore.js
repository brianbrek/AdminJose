import firebase from 'firebase'
require('firebase/firestore')
require('firebase/auth')


var config = {
    apiKey: "AIzaSyC27jHJi5PozCE7zI05b2ohdfvElDVrcTQ",
    authDomain: "admin-inventory.firebaseapp.com",
    databaseURL: "https://admin-inventory.firebaseio.com",
    projectId: "admin-inventory",
    storageBucket: "admin-inventory.appspot.com",
    messagingSenderId: "634856400716"
};

firebase.initializeApp(config);
export const connection = firebase.firestore();
export default firebase;