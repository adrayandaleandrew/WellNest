import { collection, doc, getDocs, getDoc, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Workout, WorkoutLog } from '../types/workout';

const WORKOUTS_COLLECTION = 'workouts';

function workoutLogsCollection(uid: string) {
  return collection(db, 'users', uid, 'workoutLogs');
}

export async function getWorkouts(): Promise<Workout[]> {
  const snapshot = await getDocs(collection(db, WORKOUTS_COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Workout);
}

export async function getWorkoutById(id: string): Promise<Workout | null> {
  const docRef = doc(db, WORKOUTS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Workout;
}

export async function saveWorkoutLog(uid: string, log: WorkoutLog): Promise<void> {
  await addDoc(workoutLogsCollection(uid), log);
}
