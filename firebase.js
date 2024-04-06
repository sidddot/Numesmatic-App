// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcNHXAtbKppO_Zz3x8NyPqbtAsTk5HNHw",
  authDomain: "numes-887a6.firebaseapp.com",
  databaseURL: "https://numes-887a6-default-rtdb.firebaseio.com",
  projectId: "numes-887a6",
  storageBucket: "numes-887a6.appspot.com",
  messagingSenderId: "822897312104",
  appId: "1:822897312104:web:6c2a4915ac26bdc77bd6dd",
  measurementId: "G-GC7PVZ7F1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const storage = getStorage(app);
const storage = getStorage(app);

export default storage;
