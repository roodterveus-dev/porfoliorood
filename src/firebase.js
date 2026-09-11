import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Public web config — safe to expose client-side. Access is enforced by
// Firestore security rules, not by keeping this object secret.
const firebaseConfig = {
  apiKey: "AIzaSyDgFRT173szcsY8Y1T15v7kWj-mxhn5Ipw",
  authDomain: "roodkenleyportfolio.firebaseapp.com",
  projectId: "roodkenleyportfolio",
  storageBucket: "roodkenleyportfolio.firebasestorage.app",
  messagingSenderId: "514920904844",
  appId: "1:514920904844:web:ae4bb3413c2d21d26263a9",
  measurementId: "G-KJT2MX4YR9",
};

// Keep this module free of `firebase/auth` — it's imported by the public
// site (via PortfolioDataContext) and auth is only needed by /admin.
// See firebase-auth.js for that.
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Admin login is restricted to this address by firestore.rules — keep in sync.
export const ADMIN_EMAIL = "roodterveus@gmail.com";
