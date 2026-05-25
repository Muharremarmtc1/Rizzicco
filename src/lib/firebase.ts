import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC636f0EFrgyekAVg2AQcU7nF6GJHXYsE",
  authDomain: "rizzicco-2117c.firebaseapp.com",
  projectId: "rizzicco-2117c",
  storageBucket: "rizzicco-2117c.firebasestorage.app",
  messagingSenderId: "2323567542",
  appId: "1:2323567542:web:9da8975b75f80852876717",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();