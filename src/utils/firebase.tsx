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
  WhereFilterOp,
  DocumentData,
  getDocs,
  Timestamp,
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
    const userId = user.uid;
    const name = user.displayName;

    const userRef = collection(db, "users");
    const q = query(userRef, where("userId", "==", userId));

    const userDoc = await getDocs(q);
    let isUserExist;
    userDoc.forEach((userDoc) => {
      isUserExist = userDoc.data();
    });

    if (!isUserExist) {
      await setDoc(doc(db, "users", userId), {
        userId: userId,
        name: name,
        createdAt: serverTimestamp(),
      });
    }

    return result;
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

export async function getRecord(
  category: string,
  queryItem: string,
  operator: WhereFilterOp,
  userId: string,
  time: string
) {
  const dateOffset = 24 * 60 * 60 * 1000 * 6; // 7days
  const today = new Date(new Date().toLocaleString().split(" ")[0]).getTime();
  const lastWeek = new Date(today - dateOffset);

  let data: DocumentData[] = [];
  const articleRef = collection(db, category);
  const queryArticles = await query(
    articleRef,
    where(queryItem, operator, userId),
    where(time, ">=", lastWeek)
  );
  const result = await getDocs(queryArticles);
  result.forEach((doc) => data.push(doc.data()));

  return data;
}

export type Article = {
  authorName: string;
  authorUserId: string;
  content: string;
  title: string;
  id: string;
  category: string;
  tags: string[];
  createdAt: Timestamp;
  image: string;
};

export type BookClub = {
  host: string;
  name: string;
  roomId: string;
  time: Timestamp;
  createdAt: Timestamp;
  attendees: string[];
  guest: string[];
};
