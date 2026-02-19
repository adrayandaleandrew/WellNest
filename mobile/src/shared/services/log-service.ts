import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { DailyLog, DailyLogType, Streak } from '../types/log';

// Returns today's date as YYYY-MM-DD in local time
function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Returns yesterday's date as YYYY-MM-DD in local time
function getYesterdayDateString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function getTodayLog(uid: string): Promise<DailyLog | null> {
  const today = getTodayDateString();
  const docRef = doc(db, 'users', uid, 'logs', today);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as DailyLog;
}

// Idempotent: writes the daily log doc only if one doesn't already exist for today.
// The doc ID is the date string so at most one log doc exists per day per user.
export async function saveDailyLog(uid: string, type: DailyLogType = 'workout'): Promise<void> {
  const today = getTodayDateString();
  const docRef = doc(db, 'users', uid, 'logs', today);
  const existing = await getDoc(docRef);
  if (existing.exists()) return;

  const log: DailyLog = {
    date: today,
    loggedAt: new Date().toISOString(),
    type,
  };
  await setDoc(docRef, log);
}

export async function getStreak(uid: string): Promise<Streak | null> {
  const docRef = doc(db, 'users', uid, 'streak', 'current');
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as Streak;
}

// Reads the current streak, computes the new streak based on today's date,
// writes the updated streak back, and returns it.
export async function calculateAndUpdateStreak(uid: string): Promise<Streak> {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();

  const streakDocRef = doc(db, 'users', uid, 'streak', 'current');
  const snapshot = await getDoc(streakDocRef);
  const current: Streak | null = snapshot.exists() ? (snapshot.data() as Streak) : null;

  // Already logged today — return unchanged streak
  if (current?.lastLogDate === today) {
    return current;
  }

  let newCurrentStreak: number;
  if (current?.lastLogDate === yesterday) {
    // Consecutive day — extend the streak
    newCurrentStreak = current.currentStreak + 1;
  } else {
    // Gap of more than 1 day (or no history) — start fresh at 1
    newCurrentStreak = 1;
  }

  const updated: Streak = {
    currentStreak: newCurrentStreak,
    longestStreak: Math.max(newCurrentStreak, current?.longestStreak ?? 0),
    lastLogDate: today,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(streakDocRef, updated);
  return updated;
}
