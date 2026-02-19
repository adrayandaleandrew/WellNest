import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Meal, MealCategory } from '../../../shared/types/meal';
import { getMeals } from '../../../shared/services/meal-service';

export function useMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MealCategory | null>(null);

  const fetchMeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMeals();
      setMeals(data);
    } catch {
      setError('Failed to load meals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  // Derived list — filter client-side so we don't need extra Firestore queries
  const filteredMeals = useMemo(() => {
    if (selectedCategory === null) return meals;
    return meals.filter((m) => m.category === selectedCategory);
  }, [meals, selectedCategory]);

  return {
    meals,
    filteredMeals,
    isLoading,
    error,
    selectedCategory,
    setSelectedCategory,
    refetch: fetchMeals,
  };
}
