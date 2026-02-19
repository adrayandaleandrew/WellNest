import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../shared/contexts/auth-context';
import type { WeightEntry } from '../../../shared/types/weight';
import { getWeightHistory, addWeightEntry } from '../../../shared/services/weight-service';

export function useWeight() {
  const { user } = useAuth();
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeightHistory(user.uid);
      setHistory(data);
    } catch {
      setError('Failed to load weight history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  async function logWeight(weightKg: number): Promise<void> {
    if (!user) return;
    await addWeightEntry(user.uid, weightKg);
    await fetchHistory();
  }

  return { history, isLoading, error, logWeight, refetch: fetchHistory };
}
