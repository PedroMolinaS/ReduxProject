import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCdqOwdLsClJv8Ci6ozCXDv5kHUbMaF4Ic",
    authDomain: "reduxlogin-bd0cb.firebaseapp.com",
    projectId: "reduxlogin-bd0cb",
    storageBucket: "reduxlogin-bd0cb.appspot.com",
    messagingSenderId: "674586301257",
    appId: "1:674586301257:web:fd1e07987c41cc22540098",
    measurementId: "G-TMHB0FJ3NG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

let db = firebase.firestore().collection('favs')

export const getFavoritesFirebase = (uid) => {
     return db.doc(uid).get()
        .then(snap => {
            return snap.data().array
        })
}

export const updateDB = (array, uid) => {
    return db.doc(uid).set({ array: [...array] })
}

export const signOutGoogle = () => {
    firebase.auth().signOut()
}

export const loginWithGoogle = () => {

    let provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
        .then(snap => snap.user)
}