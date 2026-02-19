import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { Meal } from '../../../shared/types/meal';

const COLLECTION = 'meals';

export async function getMeals(): Promise<Meal[]> {
  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Meal));
}

export async function createMeal(data: Omit<Meal, 'id'>): Promise<void> {
  await addDoc(collection(db, COLLECTION), data);
}

export async function updateMeal(id: string, data: Omit<Meal, 'id'>): Promise<void> {
  await setDoc(doc(db, COLLECTION, id), data);
}

export async function deleteMeal(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}
