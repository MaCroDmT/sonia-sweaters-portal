import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDphb7K-Ys_EGyBK7S3QCbWacwL0HaCBIA",
  authDomain: "sonia-sweaters-careers-f45a4.firebaseapp.com",
  projectId: "sonia-sweaters-careers-f45a4",
  storageBucket: "sonia-sweaters-careers-f45a4.firebasestorage.app",
  messagingSenderId: "338601710303",
  appId: "1:338601710303:web:8f87427b0488b1e16ccf6a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
