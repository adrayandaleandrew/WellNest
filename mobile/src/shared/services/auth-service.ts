import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  type User as FirebaseUser,
  type Unsubscribe,
} from 'firebase/auth';
import { auth } from './firebase';

export function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function subscribeToAuthChanges(
  callback: (user: FirebaseUser | null) => void,
): Unsubscribe {
  return onAuthStateChanged(auth, callback);
}

export function sendPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email);
}
