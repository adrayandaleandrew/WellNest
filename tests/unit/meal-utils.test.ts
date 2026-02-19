import { describe, it, expect } from 'vitest';
import { formatMealCategory, formatDietaryTag } from '@mobile/shared/utils/meal-utils';
import type { MealCategory, DietaryTag } from '@mobile/shared/types/meal';

// ---------------------------------------------------------------------------
// formatMealCategory
// ---------------------------------------------------------------------------
describe('formatMealCategory', () => {
  const cases: [MealCategory, string][] = [
    ['breakfast', 'Breakfast'],
    ['lunch', 'Lunch'],
    ['dinner', 'Dinner'],
    ['snack', 'Snack'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatMealCategory(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// formatDietaryTag
// ---------------------------------------------------------------------------
describe('formatDietaryTag', () => {
  const cases: [DietaryTag, string][] = [
    ['vegetarian', 'Vegetarian'],
    ['vegan', 'Vegan'],
    ['high_protein', 'High Protein'],
    ['low_carb', 'Low Carb'],
    ['gluten_free', 'Gluten Free'],
    ['dairy_free', 'Dairy Free'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatDietaryTag(input)).toBe(expected);
  });
});
