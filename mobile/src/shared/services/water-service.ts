import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const MAX_GLASSES = 8;

type WaterLog = {
  glasses: number;
  updatedAt: string;
};

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getWaterCount(uid: string): Promise<number> {
  const docRef = doc(db, 'users', uid, 'water', getTodayDateString());
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return 0;
  return (snapshot.data() as WaterLog).glasses;
}

export async function updateWaterCount(uid: string, glasses: number): Promise<void> {
  const docRef = doc(db, 'users', uid, 'water', getTodayDateString());
  const log: WaterLog = { glasses, updatedAt: new Date().toISOString() };
  await setDoc(docRef, log);
}
