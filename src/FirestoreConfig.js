import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAm2Wn-J-KZWb5olCQ-xyXQfF3BXBFXq3A",
  authDomain: "passes-19acf.firebaseapp.com",
  databaseURL: "https://passes-19acf.firebaseio.com",
  projectId: "passes-19acf",
  storageBucket: "passes-19acf.appspot.com",
  messagingSenderId: "523878097748",
  appId: "1:523878097748:web:f5b7c678ec221a90749ec1",
  measurementId: "G-KYL50LSJ8W"
});
let db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;
