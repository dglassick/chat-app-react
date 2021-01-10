// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyABP1mBqrSxGkBJe8ImAuqX01efA0_ghL0',
  authDomain: 'chat-app-12329.firebaseapp.com',
  projectId: 'chat-app-12329',
  storageBucket: 'chat-app-12329.appspot.com',
  messagingSenderId: '407784490548',
  appId: '1:407784490548:web:f767db2bcb18a156506c61',
  measurementId: 'G-JTR0BG1Z43'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
