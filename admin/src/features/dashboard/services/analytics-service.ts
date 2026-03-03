import { db } from '../../../shared/services/firebase';
import { doc, getDoc } from 'firebase/firestore';

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
