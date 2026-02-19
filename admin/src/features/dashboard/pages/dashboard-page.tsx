import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';

type Stats = {
  totalUsers: number;
  totalWorkouts: number;
  totalMeals: number;
  totalWorkoutLogs: number;
};

// Inline SVG icons — no icon library dependency
function IconUsers() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconWorkout() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M3 9h3M18 9h3M3 15h3M18 15h3M6 9h12M6 15h12" />
    </svg>
  );
}

function IconMeals() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

const STAT_CARDS: Array<{
  key: keyof Stats;
  label: string;
  icon: React.ReactNode;
  color: string;
}> = [
  { key: 'totalUsers', label: 'Total Users', icon: <IconUsers />, color: 'text-blue-600 bg-blue-50' },
  { key: 'totalWorkouts', label: 'Total Workouts', icon: <IconWorkout />, color: 'text-green-600 bg-green-50' },
  { key: 'totalMeals', label: 'Total Meals', icon: <IconMeals />, color: 'text-orange-600 bg-orange-50' },
  { key: 'totalWorkoutLogs', label: 'Workout Logs', icon: <IconActivity />, color: 'text-purple-600 bg-purple-50' },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        // collectionGroup('workoutLogs') sums logs across ALL user subcollections
        const [usersSnap, workoutsSnap, mealsSnap, logsSnap] = await Promise.all([
          getDocs(collection(db, 'users')),
          getDocs(collection(db, 'workouts')),
          getDocs(collection(db, 'meals')),
          getDocs(collectionGroup(db, 'workoutLogs')),
        ]);

        setStats({
          totalUsers: usersSnap.size,
          totalWorkouts: workoutsSnap.size,
          totalMeals: mealsSnap.size,
          totalWorkoutLogs: logsSnap.size,
        });
      } catch {
        setError('Failed to load analytics. Check that your UID is in the admins collection.');
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Overview of WellNest content and activity</p>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {STAT_CARDS.map(({ key, label, icon, color }) => (
          <div key={key} className="bg-white border border-gray-200 rounded-lg p-5">
            {isLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-10 w-10 rounded-lg bg-gray-200" />
                <div className="h-7 w-16 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-100" />
              </div>
            ) : (
              <>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color} mb-3`}>
                  {icon}
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-1">
                  {stats?.[key] ?? 0}
                </div>
                <div className="text-sm text-gray-500">{label}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Quick nav */}
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        <div className="px-5 py-3">
          <h2 className="text-sm font-semibold text-gray-700">Quick Actions</h2>
        </div>
        {[
          { to: '/workouts', label: 'Manage Workouts', description: 'Add, edit or delete workout content' },
          { to: '/meals', label: 'Manage Meals', description: 'Add, edit or delete meal content' },
          { to: '/users', label: 'View Users', description: 'Browse registered user accounts' },
        ].map(({ to, label, description }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          >
            <div>
              <div className="text-sm font-medium text-gray-900">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{description}</div>
            </div>
            <span className="text-gray-400">
              <IconArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
