import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import { SEED_WORKOUTS, SEED_MEALS } from '../../../shared/data/seed-data';

type Props = {
  totalWorkouts: number;
  totalMeals: number;
};

type SeedStatus = 'idle' | 'seeding' | 'done' | 'error';

// Only shown when BOTH collections are empty — hides itself after seeding
export default function SeedPanel({ totalWorkouts, totalMeals }: Props) {
  const [status, setStatus] = useState<SeedStatus>('idle');

  // Don't render if data already exists
  if (totalWorkouts > 0 || totalMeals > 0) return null;

  async function handleSeed() {
    setStatus('seeding');
    try {
      const workoutWrites = SEED_WORKOUTS.map(({ id, ...data }) =>
        setDoc(doc(db, 'workouts', id), data)
      );
      const mealWrites = SEED_MEALS.map(({ id, ...data }) =>
        setDoc(doc(db, 'meals', id), data)
      );
      await Promise.all([...workoutWrites, ...mealWrites]);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 mb-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-amber-800">Database is empty</p>
        <p className="text-xs text-amber-600 mt-0.5">
          {status === 'done'
            ? 'Done! Reload the page to see the counts update.'
            : 'Seed the initial 5 workouts and 6 meals to get started.'}
        </p>
      </div>

      {status !== 'done' && (
        <button
          onClick={handleSeed}
          disabled={status === 'seeding'}
          className="ml-4 flex-shrink-0 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'seeding' ? 'Seeding...' : 'Seed Initial Data'}
        </button>
      )}

      {status === 'error' && (
        <p className="ml-4 text-xs text-red-600 flex-shrink-0">
          Failed — check that your UID is in the admins collection.
        </p>
      )}
    </div>
  );
}
