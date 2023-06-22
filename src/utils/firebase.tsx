import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbYjeFVcLpS-4FzXRPCFm32gjlhW2mMjg",
  authDomain: "test-50b43.firebaseapp.com",
  projectId: "test-50b43",
  storageBucket: "test-50b43.appspot.com",
  messagingSenderId: "627741027334",
  appId: "1:627741027334:web:4a3774abca3a01d1592787",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const signInwithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return await result;
  } catch (error) {
    console.log(error);
  }
};
export const provider = googleProvider.setCustomParameters({
  prompt: "select_account",
});
