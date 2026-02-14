import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, OnboardingFormData } from '../types/profile';

const USERS_COLLECTION = 'users';

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as UserProfile;
}

export async function saveOnboardingProfile(
  uid: string,
  email: string,
  data: OnboardingFormData,
): Promise<void> {
  const now = new Date().toISOString();
  const profile: UserProfile = {
    uid,
    email,
    displayName: data.displayName.trim(),
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    heightCm: Number(data.heightCm),
    weightKg: Number(data.weightKg),
    goals: data.goals,
    healthFlags: data.healthFlags,
    activityLevel: data.activityLevel!,
    onboardingComplete: true,
    createdAt: now,
    updatedAt: now,
  };
  const docRef = doc(db, USERS_COLLECTION, uid);
  await setDoc(docRef, profile);
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
}
