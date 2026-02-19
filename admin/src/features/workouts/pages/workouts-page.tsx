import { useEffect, useState } from 'react';
import type { Workout } from '../../../shared/types/workout';
import {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../services/workout-service';
import WorkoutForm from '../components/workout-form';

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // null = closed, undefined = create new, Workout = edit existing
  const [modalWorkout, setModalWorkout] = useState<Workout | undefined | null>(null);

  async function loadWorkouts() {
    try {
      setError(null);
      const data = await getWorkouts();
      setWorkouts(data);
    } catch {
      setError('Failed to load workouts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function handleSubmit(data: Omit<Workout, 'id'>) {
    if (modalWorkout?.id) {
      await updateWorkout(modalWorkout.id, data);
    } else {
      await createWorkout(data);
    }
    setModalWorkout(null);
    await loadWorkouts();
  }

  async function handleDelete(workout: Workout) {
    if (!window.confirm(`Delete "${workout.name}"? This cannot be undone.`)) return;
    await deleteWorkout(workout.id);
    await loadWorkouts();
  }

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Workouts</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage workout content</p>
        </div>
        <button
          data-testid="add-workout-button"
          onClick={() => setModalWorkout(undefined)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Add Workout
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {workouts.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No workouts yet. Click "Add Workout" to create one.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Difficulty</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Duration</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Exercises</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workouts.map((w) => (
                  <tr key={w.id} data-testid="workout-row" className="hover:bg-gray-50 transition-colors duration-100">
                    <td data-testid="workout-name" className="px-4 py-3 font-medium text-gray-900">{w.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[w.difficulty]}`}>
                        {w.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{w.durationMinutes} min</td>
                    <td className="px-4 py-3 text-gray-600">{w.exercises?.length ?? 0}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => setModalWorkout(w)}
                        className="text-green-700 hover:text-green-800 font-medium cursor-pointer transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        data-testid="delete-workout-button"
                        onClick={() => handleDelete(w)}
                        className="text-red-600 hover:text-red-700 font-medium cursor-pointer transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal */}
      {modalWorkout !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {modalWorkout ? 'Edit Workout' : 'Add Workout'}
              </h2>
            </div>
            <div className="px-6 py-5">
              <WorkoutForm
                initial={modalWorkout}
                onSubmit={handleSubmit}
                onCancel={() => setModalWorkout(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
