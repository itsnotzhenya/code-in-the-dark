import Firebase from "firebase";


let config = {
    apiKey: "AIzaSyDWZvyI83vGieUtviHwaNeEq802ekbRjrc",
    authDomain: "code-19f91.firebaseapp.com",
    databaseURL: "https://code-19f91.firebaseio.com",
    projectId: "code-19f91",
    storageBucket: "gs://code-19f91.appspot.com",
    messagingSenderId: "855561499950"
};

export const app = Firebase.initializeApp(config);
console.log(app)
export const db = app.database();
