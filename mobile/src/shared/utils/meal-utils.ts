import type { MealCategory, DietaryTag } from '../types/meal';

const categoryLabels: Record<MealCategory, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
};

const dietaryTagLabels: Record<DietaryTag, string> = {
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  high_protein: 'High Protein',
  low_carb: 'Low Carb',
  gluten_free: 'Gluten Free',
  dairy_free: 'Dairy Free',
};

export function formatMealCategory(cat: MealCategory): string {
  return categoryLabels[cat];
}

export function formatDietaryTag(tag: DietaryTag): string {
  return dietaryTagLabels[tag];
}
