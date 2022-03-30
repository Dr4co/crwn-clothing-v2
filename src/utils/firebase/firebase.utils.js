
import { initializeApp } from 'firebase/app';

import { getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore,
    doc, // Get document
    getDoc, // Get data
    setDoc  // Set data
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWVVCDnkBCRNuKHN3CKXXwXuWzdFMtMUo",
    authDomain: "crwn-clothing-db-a30c0.firebaseapp.com",
    projectId: "crwn-clothing-db-a30c0",
    storageBucket: "crwn-clothing-db-a30c0.appspot.com",
    messagingSenderId: "143539408537",
    appId: "1:143539408537:web:9eff7856e2c6f4a4c33208"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();    // Singleton
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
      userAuth,
      additionalInformation = {displayName: 'mike'}
      ) => {
      const userDocRef = doc(db, 'users', userAuth.uid);

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()){
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
          } catch(error){
              console.log('error creating the user', error.message);

          }
      }

    // If user data does not exist, create/set the document with the data from userAuth in my collection

    // Check if user data exists
    // return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if(!email || !password) return;

        return await createUserWithEmailAndPassword(auth, email, password);
  }