import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { useAuth } from './auth-context';
import type { Streak, DailyLogType, StreakContextValue } from '../types/log';
import {
  getTodayLog,
  saveDailyLog,
  getStreak,
  calculateAndUpdateStreak,
} from '../services/log-service';

const StreakContext = createContext<StreakContextValue | null>(null);

export function StreakProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [isLoadingStreak, setIsLoadingStreak] = useState(true);

  const fetchStreakData = useCallback(async (uid: string) => {
    setIsLoadingStreak(true);
    try {
      const [todayLog, currentStreak] = await Promise.all([
        getTodayLog(uid),
        getStreak(uid),
      ]);
      setHasLoggedToday(todayLog !== null);
      setStreak(currentStreak);
    } finally {
      setIsLoadingStreak(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchStreakData(user.uid);
    } else {
      setStreak(null);
      setHasLoggedToday(false);
      setIsLoadingStreak(false);
    }
  }, [user, fetchStreakData]);

  // Logs today's activity and recalculates the streak.
  // Safe to call multiple times per day — saveDailyLog is idempotent.
  async function logToday(type: DailyLogType = 'workout') {
    if (!user) return;
    await saveDailyLog(user.uid, type);
    const updated = await calculateAndUpdateStreak(user.uid);
    setStreak(updated);
    setHasLoggedToday(true);
  }

  async function refreshStreak() {
    if (!user) return;
    await fetchStreakData(user.uid);
  }

  return (
    <StreakContext.Provider
      value={{ streak, hasLoggedToday, isLoadingStreak, logToday, refreshStreak }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak(): StreakContextValue {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
}
