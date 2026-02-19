import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { Workout } from '../../../shared/types/workout';

const COLLECTION = 'workouts';

export async function getWorkouts(): Promise<Workout[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Workout));
}

export async function createWorkout(data: Omit<Workout, 'id'>): Promise<void> {
  await addDoc(collection(db, COLLECTION), data);
}

export async function updateWorkout(id: string, data: Omit<Workout, 'id'>): Promise<void> {
  await setDoc(doc(db, COLLECTION, id), data);
}

export async function deleteWorkout(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
