import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

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
const storage = getStorage(app);

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

const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
  if (!file) {
    errorCallback("File not found!");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;

  if (fileType.includes("image")) {
    errorCallback("File must be an image!");
    return;
  }

  if (fileSize > 4) {
    errorCallback("File size must be less than 4MB");
    return;
  }

  const storageRef = ref(storage, `images/${file.name}`);
  const task = uploadBytesResumable(storageRef, file);

  task.on(
    "state_changed",
    (snapShot) => {
      console.log(snapShot);
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      getDownloadURL(ref).then((url) => {
        urlCallback(url);
      });
    }
  );
};

export { app as default, auth, db, updateUserDb, getUserData, uploadImage };
