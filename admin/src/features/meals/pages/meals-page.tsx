import { useEffect, useState } from 'react';
import type { Meal } from '../../../shared/types/meal';
import {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} from '../services/meal-service';
import MealForm from '../components/meal-form';

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // null = closed, undefined = create new, Meal = edit existing
  const [modalMeal, setModalMeal] = useState<Meal | undefined | null>(null);

  async function loadMeals() {
    try {
      setError(null);
      const data = await getMeals();
      setMeals(data);
    } catch {
      setError('Failed to load meals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  async function handleSubmit(data: Omit<Meal, 'id'>) {
    if (modalMeal?.id) {
      await updateMeal(modalMeal.id, data);
    } else {
      await createMeal(data);
    }
    setModalMeal(null);
    await loadMeals();
  }

  async function handleDelete(meal: Meal) {
    if (!window.confirm(`Delete "${meal.name}"? This cannot be undone.`)) return;
    await deleteMeal(meal.id);
    await loadMeals();
  }

  const categoryColors: Record<string, string> = {
    breakfast: 'bg-orange-100 text-orange-700',
    lunch: 'bg-blue-100 text-blue-700',
    dinner: 'bg-purple-100 text-purple-700',
    snack: 'bg-green-100 text-green-700',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Meals</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage meal content</p>
        </div>
        <button
          onClick={() => setModalMeal(undefined)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Add Meal
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
          {meals.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              No meals yet. Click "Add Meal" to create one.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Prep Time</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Calories</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {meals.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors duration-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${categoryColors[m.category]}`}>
                        {m.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{m.prepTimeMinutes} min</td>
                    <td className="px-4 py-3 text-gray-600">{m.nutrition?.calories ?? '—'} kcal</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => setModalMeal(m)}
                        className="text-green-700 hover:text-green-800 font-medium cursor-pointer transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m)}
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
      {modalMeal !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {modalMeal ? 'Edit Meal' : 'Add Meal'}
              </h2>
            </div>
            <div className="px-6 py-5">
              <MealForm
                initial={modalMeal}
                onSubmit={handleSubmit}
                onCancel={() => setModalMeal(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
