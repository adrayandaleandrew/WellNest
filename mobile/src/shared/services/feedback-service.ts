import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface FeedbackPayload {
  message: string;
  rating: number; // 1–5
  appVersion: string;
}

export async function submitFeedback(uid: string, payload: FeedbackPayload): Promise<void> {
  await addDoc(collection(db, 'users', uid, 'feedback'), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}
