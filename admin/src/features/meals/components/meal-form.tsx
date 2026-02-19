import { useState } from 'react';
import type { Meal, MealCategory, DietaryTag, Ingredient } from '../../../shared/types/meal';

type Props = {
  initial?: Meal;
  onSubmit: (data: Omit<Meal, 'id'>) => Promise<void>;
  onCancel: () => void;
};

const CATEGORIES: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snack'];

const DIETARY_TAGS: DietaryTag[] = [
  'vegetarian', 'vegan', 'high_protein', 'low_carb', 'gluten_free', 'dairy_free',
];

function blankIngredient(): Ingredient {
  return { name: '', amount: '' };
}

export default function MealForm({ initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [category, setCategory] = useState<MealCategory>(initial?.category ?? 'breakfast');
  const [dietaryTags, setDietaryTags] = useState<DietaryTag[]>(initial?.dietaryTags ?? []);
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(initial?.prepTimeMinutes ?? 15);
  const [servings, setServings] = useState(initial?.servings ?? 2);
  const [calories, setCalories] = useState(initial?.nutrition?.calories ?? 0);
  const [proteinG, setProteinG] = useState(initial?.nutrition?.proteinG ?? 0);
  const [carbsG, setCarbsG] = useState(initial?.nutrition?.carbsG ?? 0);
  const [fatG, setFatG] = useState(initial?.nutrition?.fatG ?? 0);
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initial?.ingredients?.length ? initial.ingredients : [blankIngredient()]
  );
  const [instructions, setInstructions] = useState<string[]>(
    initial?.instructions?.length ? initial.instructions : ['']
  );
  const [isSaving, setIsSaving] = useState(false);

  function toggleTag(tag: DietaryTag) {
    setDietaryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function updateIngredient(index: number, field: keyof Ingredient, value: string) {
    setIngredients((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  function updateInstruction(index: number, value: string) {
    setInstructions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSubmit({
        name,
        description,
        category,
        dietaryTags,
        prepTimeMinutes: Number(prepTimeMinutes),
        servings: Number(servings),
        nutrition: {
          calories: Number(calories),
          proteinG: Number(proteinG),
          carbsG: Number(carbsG),
          fatG: Number(fatG),
        },
        ingredients: ingredients.filter((i) => i.name.trim()),
        instructions: instructions.filter((s) => s.trim()),
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

      {/* Category + Prep + Servings */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MealCategory)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min)</label>
          <input
            type="number"
            required
            min={1}
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
          <input
            type="number"
            required
            min={1}
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Dietary Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Tags</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_TAGS.map((tag) => (
            <label key={tag} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={dietaryTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
              />
              {tag.replace('_', ' ')}
            </label>
          ))}
        </div>
      </div>

      {/* Nutrition */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nutrition (per serving)</label>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Calories', value: calories, set: setCalories },
            { label: 'Protein (g)', value: proteinG, set: setProteinG },
            { label: 'Carbs (g)', value: carbsG, set: setCarbsG },
            { label: 'Fat (g)', value: fatG, set: setFatG },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <button
            type="button"
            onClick={() => setIngredients((prev) => [...prev, blankIngredient()])}
            className="text-xs text-green-700 hover:text-green-800 font-medium cursor-pointer transition-colors duration-150"
          >
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ing.name}
                onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Amount"
                value={ing.amount}
                onChange={(e) => updateIngredient(i, 'amount', e.target.value)}
                className="w-28 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => setIngredients((prev) => prev.filter((_, idx) => idx !== i))}
                  className="text-red-600 hover:text-red-700 text-sm cursor-pointer transition-colors duration-150 px-1"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <button
            type="button"
            onClick={() => setInstructions((prev) => [...prev, ''])}
            className="text-xs text-green-700 hover:text-green-800 font-medium cursor-pointer transition-colors duration-150"
          >
            + Add Step
          </button>
        </div>
        <div className="space-y-2">
          {instructions.map((step, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="mt-2 text-xs text-gray-400 w-5 flex-shrink-0 text-right">{i + 1}.</span>
              <input
                type="text"
                placeholder={`Step ${i + 1}`}
                value={step}
                onChange={(e) => updateInstruction(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {instructions.length > 1 && (
                <button
                  type="button"
                  onClick={() => setInstructions((prev) => prev.filter((_, idx) => idx !== i))}
                  className="mt-1.5 text-red-600 hover:text-red-700 text-sm cursor-pointer transition-colors duration-150 px-1"
                >
                  ×
                </button>
              )}
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
          {isSaving ? 'Saving...' : initial ? 'Save Changes' : 'Create Meal'}
        </button>
      </div>
    </form>
  );
}
