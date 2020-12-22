import * as firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAiNHDGX2Yr1WoUVmblo_aqFGEOlcTV6w8",
  authDomain: "coderhouse-emmartinez.firebaseapp.com",
  projectId: "coderhouse-emmartinez",
  storageBucket: "coderhouse-emmartinez.appspot.com",
  messagingSenderId: "741545345082",
  appId: "1:741545345082:web:14581661807491fde53503",
};

const app = firebase.initializeApp(firebaseConfig);

export function getFirebase() {
  return app;
}

export function getFirestore() {
  return firebase.firestore(app);
}
