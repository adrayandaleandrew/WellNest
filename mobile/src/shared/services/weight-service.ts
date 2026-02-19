import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';
import type { WeightEntry } from '../types/weight';

function weightLogsCollection(uid: string) {
  return collection(db, 'users', uid, 'weightLogs');
}

function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function addWeightEntry(uid: string, weightKg: number): Promise<void> {
  const entry: Omit<WeightEntry, 'id'> = {
    weightKg,
    date: getTodayDateString(),
    loggedAt: new Date().toISOString(),
  };
  await addDoc(weightLogsCollection(uid), entry);
}

export async function getWeightHistory(uid: string): Promise<WeightEntry[]> {
  const q = query(weightLogsCollection(uid), orderBy('loggedAt', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as WeightEntry);
}
