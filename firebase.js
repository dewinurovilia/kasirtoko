import {
initializeApp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyCvco9APepbM1YRhDLGzE2uxFBVtLL2NLs",

authDomain:
"fauz2327-b8dfa.firebaseapp.com",

databaseURL:
"https://fauz2327-b8dfa-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId:
"fauz2327-b8dfa",

storageBucket:
"fauz2327-b8dfa.firebasestorage.app",

messagingSenderId:
"625104866445",

appId:
"1:625104866445:web:129165fbc539edb36466c4"

};

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

const auth =
getAuth(app);

/* GLOBAL */

window.firebaseDB = db;

window.firebaseRef = ref;

window.firebaseOnValue = onValue;

window.firebaseAuth = auth;

window.firebaseSignIn =
signInWithEmailAndPassword;

window.firebaseOnAuth =
onAuthStateChanged;

window.firebaseSignOut =
signOut;
