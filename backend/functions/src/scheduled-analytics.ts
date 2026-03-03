import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore } from 'firebase-admin/firestore';

// Runs nightly at 00:05 UTC to pre-compute admin dashboard stats.
// Writes a single doc so the dashboard makes one read instead of four collection queries.
export const scheduledAnalytics = onSchedule('5 0 * * *', async () => {
  const db = getFirestore();

  const [usersSnap, workoutsSnap, mealsSnap, logsSnap] = await Promise.all([
    db.collection('users').count().get(),
    db.collection('workouts').count().get(),
    db.collection('meals').count().get(),
    db.collectionGroup('workoutLogs').count().get(),
  ]);

  await db.collection('analytics').doc('summary').set({
    totalUsers:       usersSnap.data().count,
    totalWorkouts:    workoutsSnap.data().count,
    totalMeals:       mealsSnap.data().count,
    totalWorkoutLogs: logsSnap.data().count,
    lastUpdated:      new Date().toISOString(),
  });
});
