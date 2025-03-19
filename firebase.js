import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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

const addProjectInDb = async (project) => {
  if (typeof project != "object") return;
  const colRef = collection(db, "projects");
  await addDoc(colRef, { ...project });
};

const updateProjectInDb = async (project, pid) => {
  if (typeof project != "object") return;
  const docRef = doc(db, "projects", pid);
  await setDoc(docRef, { ...project });
};

const getAllProjects = async () => {
  return await getDocs(collection(db, "projects"));
};

const fetchProjectDetails = async (uid) => {
  if (!uid) return;
  const colRef = collection(db, "projects");
  const condition = where("refUser", "==", uid);
  const dbQuery = query(colRef, condition);
  const querySnapshot = await getDocs(dbQuery);
  return querySnapshot;
};

const updateUserDb = async (user, uid) => {
  if (typeof user != "object") return;
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, { ...user, uid }, { merge: true });
};

const getUserData = async (uid) => {
  const docRef = doc(db, "users", uid);
  const res = await getDoc(docRef);
  if (res.exists()) return res.data();
  else return null;
};

const uploadImage = async (
  file,
  progressCallback,
  urlCallback,
  errorCallback
) => {
  if (!file) {
    errorCallback("File not found!");
    return;
  }

  const fileType = file.type;
  const fileSize = file.size / 1024 / 1024;
  console.log("Type: ", fileType);
  console.log("Size: ", fileSize);

  if (!fileType.includes("image")) {
    errorCallback("File must be an image!");
    return;
  }

  if (fileSize > 4) {
    errorCallback("File size must be less than 4MB");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my_unsigned_preset");
  formData.append("cloud_name", "dknw3mf6e");

  try {
    progressCallback(50);
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dknw3mf6e/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.secure_url;
    progressCallback(70);
    await storeImageUrl(imageUrl);

    console.log("updated img link: ", imageUrl);
    progressCallback(100);
    urlCallback(imageUrl);
  } catch (error) {
    console.error("Upload failed: ", error.message);
    errorCallback(`Error uploading image: ${error.message}`);
  }
};

const storeImageUrl = async (url) => {
  try {
    const docRef = doc(db, "images", `${Date.now()}`);
    await setDoc(docRef, {
      imageUrl: url,
      timestamp: new Date(),
    });
    console.log("Image URL stored:", url);
  } catch (error) {
    console.error("Error storing URL:", error);
  }
};

export {
  app as default,
  auth,
  db,
  updateUserDb,
  getUserData,
  uploadImage,
  addProjectInDb,
  getAllProjects,
  fetchProjectDetails,
  updateProjectInDb,
};
