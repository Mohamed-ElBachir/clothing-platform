import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
const config = {
    apiKey: "AIzaSyAj-JCOrlR79oG4_IwWttxtGFr4yY-Phlc",
    authDomain: "crwn-db-bbee6.firebaseapp.com",
    projectId: "crwn-db-bbee6",
    storageBucket: "crwn-db-bbee6.appspot.com",
    messagingSenderId: "567389452184",
    appId: "1:567389452184:web:0829a65d9228f22d0a9ded",
    measurementId: "G-10D7YTYHVB"
  };


  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;