import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAxZW9SrZHjbrJvWy1XoAYObts0z3RUtRA",
  authDomain: "project-fair-124b0.firebaseapp.com",
  projectId: "project-fair-124b0",
  storageBucket: "project-fair-124b0.firebasestorage.app",
  messagingSenderId: "283682214634",
  appId: "1:283682214634:web:3fb73d58e3930f8b90fd93",
  measurementId: "G-6YJN560N4N",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app as default, auth };
