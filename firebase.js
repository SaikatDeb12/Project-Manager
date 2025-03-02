import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const updateUserDb = async (user, uid) => {
  if (typeof user != "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user });
};

const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  if (res.exists()) return res.data();
  else return null;
};

export { app as default, auth, db, updateUserDb, getUserData };
