import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  collection,
} from "firebase/firestore";

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
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const userId: string = user.uid;
    const name = user.displayName;

    const userRef = collection(db, "users");
    const isUserExist = query(userRef, where("userId", "==", userId));

    if (!isUserExist) {
      await setDoc(doc(db, "users", userId), {
        userId,
        name,
        createdAt: serverTimestamp(),
      });
    }

    return await result;
  } catch (error) {
    console.log(error);
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
export const provider = googleProvider.setCustomParameters({
  prompt: "select_account",
});
