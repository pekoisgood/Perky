import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { SavedArticle } from "../types/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "test-50b43.firebaseapp.com",
  projectId: "test-50b43",
  storageBucket: "test-50b43.appspot.com",
  messagingSenderId: "627741027334",
  appId: "1:627741027334:web:4a3774abca3a01d1592787",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;
    const userId = user.uid;
    const name = user.displayName;
    const email = user.email;
    const avatar = user.photoURL;

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
        email: email,
        avatar: avatar,
        createdAt: serverTimestamp(),
      });
    }
    return result;
  } catch (error) {
    return;
  }
};

const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return;
  }
};
const provider = googleProvider.setCustomParameters({
  prompt: "select_account",
});

const getRecord = async (
  category: string,
  queryItem: string,
  operator: WhereFilterOp,
  userId: string,
  time: string,
  weekly: boolean = false
) => {
  const dateOffset = 24 * 60 * 60 * 1000 * 6;
  const today = new Date(new Date().toLocaleString().split(" ")[0]).getTime();
  const lastWeek = new Date(today - dateOffset);

  const data: DocumentData[] = [];
  const articleRef = collection(db, category);

  if (weekly) {
    const queryArticles = await query(
      articleRef,
      where(queryItem, operator, userId),
      where("time", ">=", lastWeek),
      where("time", "<=", new Date(today))
    );
    const result = await getDocs(queryArticles);
    result.forEach((doc) => data.push(doc.data()));

    return data;
  }

  const queryArticles = await query(
    articleRef,
    where(queryItem, operator, userId),
    where(time, ">=", lastWeek)
  );
  const result = await getDocs(queryArticles);
  result.forEach((doc) => data.push(doc.data()));

  return data;
};

const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    return error;
  }
};

const signInWithEmail = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};

const getUserInfo = async (id: string) => {
  const userRef = doc(db, "users", id);
  const userInfo: DocumentData = await getDoc(userRef);

  return userInfo;
};

const getSavedArticle = async (userId: string, limitNumber?: number) => {
  const savedArticles: SavedArticle[] = [];

  const q = () => {
    if (limitNumber) {
      return query(
        collection(db, "articles"),
        where("savedUsers", "array-contains", userId),
        orderBy("createdAt"),
        limit(limitNumber)
      );
    }
    return query(
      collection(db, "articles"),
      where("savedUsers", "array-contains", userId),
      orderBy("createdAt")
    );
  };

  const result = await getDocs(q());
  result.forEach((doc) => {
    savedArticles.push({
      title: doc.data().title,
      id: doc.id,
      authorName: doc.data().authorName,
      content: doc.data().content,
      image: doc.data().image,
      category: doc.data().category,
    });
  });

  return savedArticles;
};

export {
  app,
  db,
  storage,
  auth,
  signInWithGoogle,
  firebaseSignOut,
  getRecord,
  signUpWithEmail,
  signInWithEmail,
  getUserInfo,
  getSavedArticle,
};
