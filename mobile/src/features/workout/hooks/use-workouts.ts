import { useState, useEffect, useCallback } from 'react';
import type { Workout } from '../../../shared/types/workout';
import { getWorkouts } from '../../../shared/services/workout-service';

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch {
      setError('Failed to load workouts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return { workouts, isLoading, error, refetch: fetchWorkouts };
}
