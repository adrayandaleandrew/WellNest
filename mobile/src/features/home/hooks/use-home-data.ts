import { useState, useEffect, useCallback } from 'react';
import type { Workout } from '../../../shared/types/workout';
import type { Meal } from '../../../shared/types/meal';
import { getWorkouts } from '../../../shared/services/workout-service';
import { getMeals } from '../../../shared/services/meal-service';

export function useHomeData() {
  const [featuredWorkout, setFeaturedWorkout] = useState<Workout | null>(null);
  const [featuredMeal, setFeaturedMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [workouts, meals] = await Promise.all([getWorkouts(), getMeals()]);
      setFeaturedWorkout(workouts[0] ?? null);
      setFeaturedMeal(meals[0] ?? null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { featuredWorkout, featuredMeal, isLoading };
}
