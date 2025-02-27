// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYUgndo3lL9KZ07TJcCM29oIeCRsguE-4",
  authDomain: "protizogita.firebaseapp.com",
  projectId: "protizogita",
  storageBucket: "protizogita.firebasestorage.app",
  messagingSenderId: "756259054692",
  appId: "1:756259054692:web:a0c1b6903c1757b67a2b71"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
