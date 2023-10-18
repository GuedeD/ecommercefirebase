import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  inMemoryPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDNxmPxBCXTpwer47yVgz3cxlFWP_S-e4M",
  authDomain: "test-5bef2.firebaseapp.com",
  projectId: "test-5bef2",
  storageBucket: "test-5bef2.appspot.com",
  messagingSenderId: "949064995468",
  appId: "1:949064995468:web:2db1b2cbec1d85347621a9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// setPersistence(auth, browserLocalPersistence);
