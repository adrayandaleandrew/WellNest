import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Meal } from '../types/meal';

const MEALS_COLLECTION = 'meals';

export async function getMeals(): Promise<Meal[]> {
  const snapshot = await getDocs(collection(db, MEALS_COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Meal);
}

export async function getMealById(id: string): Promise<Meal | null> {
  const docRef = doc(db, MEALS_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Meal;
}
