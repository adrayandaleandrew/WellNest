import { useState, useEffect } from 'react';
import { useAuth } from '../../../shared/contexts/auth-context';
import { getWaterCount, updateWaterCount, MAX_GLASSES } from '../../../shared/services/water-service';

export function useWater() {
  const { user } = useAuth();
  const [glasses, setGlasses] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getWaterCount(user.uid)
      .then(setGlasses)
      .finally(() => setIsLoading(false));
  }, [user]);

  async function addGlass() {
    if (!user || glasses >= MAX_GLASSES) return;
    const next = glasses + 1;
    setGlasses(next); // optimistic update
    await updateWaterCount(user.uid, next);
  }

  async function removeGlass() {
    if (!user || glasses <= 0) return;
    const next = glasses - 1;
    setGlasses(next); // optimistic update
    await updateWaterCount(user.uid, next);
  }

  return { glasses, isLoading, addGlass, removeGlass, maxGlasses: MAX_GLASSES };
}
