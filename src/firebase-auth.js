import { getAuth } from "firebase/auth";
import { app } from "./firebase";

// Admin-only — kept out of firebase.js so the public site never pulls in
// firebase/auth. Only import this from admin/ code.
export const auth = getAuth(app);
