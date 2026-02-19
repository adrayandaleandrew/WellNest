import { useState } from 'react';
import type { Workout, Exercise, Difficulty, MuscleGroup } from '../../../shared/types/workout';

type Props = {
  initial?: Workout;
  onSubmit: (data: Omit<Workout, 'id'>) => Promise<void>;
  onCancel: () => void;
};

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full_body', 'cardio',
];

function blankExercise(): Exercise {
  return {
    name: '',
    sets: 3,
    reps: 10,
    durationSeconds: null,
    restSeconds: 60,
    description: '',
  };
}

export default function WorkoutForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 'beginner');
  const [durationMinutes, setDurationMinutes] = useState(initial?.durationMinutes ?? 30);
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>(initial?.muscleGroups ?? []);
  const [exercises, setExercises] = useState<Exercise[]>(
    initial?.exercises?.length ? initial.exercises : [blankExercise()]
  );
  const [isSaving, setIsSaving] = useState(false);

  function toggleMuscleGroup(mg: MuscleGroup) {
    setMuscleGroups((prev) =>
      prev.includes(mg) ? prev.filter((m) => m !== mg) : [...prev, mg]
    );
  }

  function updateExercise(index: number, field: keyof Exercise, value: string | number | null) {
    setExercises((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function addExercise() {
    setExercises((prev) => [...prev, blankExercise()]);
  }

  function removeExercise(index: number) {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit({
        name,
        description,
        difficulty,
        durationMinutes: Number(durationMinutes),
        muscleGroups,
        exercises,
        createdAt: initial?.createdAt ?? new Date().toISOString(),
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Difficulty + Duration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
          <input
            type="number"
            required
            min={1}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Muscle Groups */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Muscle Groups</label>
        <div className="flex flex-wrap gap-2">
          {MUSCLE_GROUPS.map((mg) => (
            <label key={mg} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={muscleGroups.includes(mg)}
                onChange={() => toggleMuscleGroup(mg)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              {mg.replace('_', ' ')}
            </label>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Exercises</label>
          <button
            type="button"
            onClick={addExercise}
            className="text-xs text-green-700 hover:text-green-800 font-medium cursor-pointer transition-colors duration-150"
          >
            + Add Exercise
          </button>
        </div>

        <div className="space-y-4">
          {exercises.map((ex, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Exercise {i + 1}
                </span>
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(i)}
                    className="text-xs text-red-600 hover:text-red-700 cursor-pointer transition-colors duration-150"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Exercise name"
                    required
                    value={ex.name}
                    onChange={(e) => updateExercise(i, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Sets</label>
                  <input
                    type="number"
                    min={1}
                    value={ex.sets}
                    onChange={(e) => updateExercise(i, 'sets', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Reps (blank = timed)</label>
                  <input
                    type="number"
                    min={1}
                    value={ex.reps ?? ''}
                    onChange={(e) => updateExercise(i, 'reps', e.target.value ? Number(e.target.value) : null)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Duration (sec)</label>
                  <input
                    type="number"
                    min={1}
                    value={ex.durationSeconds ?? ''}
                    onChange={(e) => updateExercise(i, 'durationSeconds', e.target.value ? Number(e.target.value) : null)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Rest (sec)</label>
                  <input
                    type="number"
                    min={0}
                    value={ex.restSeconds}
                    onChange={(e) => updateExercise(i, 'restSeconds', Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={ex.description}
                    onChange={(e) => updateExercise(i, 'description', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : initial ? 'Save Changes' : 'Create Workout'}
        </button>
      </div>
    </form>
  );
}
