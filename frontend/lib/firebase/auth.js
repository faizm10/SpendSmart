import { 
  onAuthStateChanged as _onAuthStateChanged, 
  onIdTokenChanged as _onIdTokenChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as _signOut 
} from "firebase/auth";
import { auth } from "./firebase";

export function onAuthStateChanged(cb) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return _signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
  }
}