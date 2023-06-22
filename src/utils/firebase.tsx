import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbYjeFVcLpS-4FzXRPCFm32gjlhW2mMjg",
  authDomain: "test-50b43.firebaseapp.com",
  projectId: "test-50b43",
  storageBucket: "test-50b43.appspot.com",
  messagingSenderId: "627741027334",
  appId: "1:627741027334:web:4a3774abca3a01d1592787",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
