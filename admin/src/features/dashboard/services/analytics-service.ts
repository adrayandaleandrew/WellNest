import { db } from '../../../shared/services/firebase';
import { doc, getDoc, collection, getCountFromServer } from 'firebase/firestore';

export interface AnalyticsSummary {
  totalUsers: number;
  totalWorkouts: number;
  totalMeals: number;
  totalWorkoutLogs: number;
  lastUpdated: string | null;
}

// Reads the pre-computed summary doc written nightly by scheduledAnalytics Cloud Function.
// Returns null if the doc hasn't been written yet (first deploy, before the first cron run).
export async function getAnalyticsSummary(): Promise<AnalyticsSummary | null> {
  const snap = await getDoc(doc(db, 'analytics', 'summary'));
  if (!snap.exists()) return null;
  return snap.data() as AnalyticsSummary;
}

// Reads actual counts from workouts/meals collections directly.
// Used by the seed panel to detect empty DB without depending on the analytics cron doc.
export async function getLiveCollectionCounts(): Promise<{ workouts: number; meals: number }> {
  const [workoutsSnap, mealsSnap] = await Promise.all([
    getCountFromServer(collection(db, 'workouts')),
    getCountFromServer(collection(db, 'meals')),
  ]);
  return {
    workouts: workoutsSnap.data().count,
    meals: mealsSnap.data().count,
  };
}
