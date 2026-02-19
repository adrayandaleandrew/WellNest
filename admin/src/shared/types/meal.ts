export type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type DietaryTag =
  | 'vegetarian'
  | 'vegan'
  | 'high_protein'
  | 'low_carb'
  | 'gluten_free'
  | 'dairy_free';

export type Ingredient = {
  name: string;
  amount: string;
};

export type NutritionInfo = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type Meal = {
  id: string;
  name: string;
  description: string;
  category: MealCategory;
  dietaryTags: DietaryTag[];
  prepTimeMinutes: number;
  servings: number;
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  instructions: string[];
  createdAt: string;
};
