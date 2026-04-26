// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQLjrhYupZeA6OXPZ2td4agewFXaCfC9Y",
  authDomain: "app-demo-58c65.firebaseapp.com",
  databaseURL: "https://app-demo-58c65-default-rtdb.firebaseio.com",
  projectId: "app-demo-58c65",
  storageBucket: "app-demo-58c65.firebasestorage.app",
  messagingSenderId: "841298938574",
  appId: "1:841298938574:web:0c341dec24dfb73d79de9f",
  measurementId: "G-KE6FBDMGVZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
