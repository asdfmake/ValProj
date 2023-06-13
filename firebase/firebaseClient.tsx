import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA2nqPELxOmtVeA4T_JVLCAQZEtRYiBY_o",
    authDomain: "apipokusaj.firebaseapp.com",
    projectId: "apipokusaj",
    storageBucket: "apipokusaj.appspot.com",
    messagingSenderId: "934828638527",
    appId: "1:934828638527:web:dac4e3562202aba592938a",
    measurementId: "G-PV91CLZNF1"
};//prebaci da ne pisu ovde svi podatci nego da vadi iz env

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore()

const auth = getAuth(app)
export {firebase, auth, firestore}


/* import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA2nqPELxOmtVeA4T_JVLCAQZEtRYiBY_o",
    authDomain: "apipokusaj.firebaseapp.com",
    projectId: "apipokusaj",
    storageBucket: "apipokusaj.appspot.com",
    messagingSenderId: "934828638527",
    appId: "1:934828638527:web:dac4e3562202aba592938a",
    measurementId: "G-PV91CLZNF1"
};//prebaci da ne pisu ovde svi podatci nego da vadi iz env

export const app = initializeApp(firebaseConfig); // Initialize Firebase

export const auth = getAuth(app); // Initialize Firebase Authentication */
