export type DailyLogType = 'workout' | 'manual';

export type DailyLog = {
  date: string; // YYYY-MM-DD
  loggedAt: string; // ISO timestamp
  type: DailyLogType;
};

export type Streak = {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string | null; // YYYY-MM-DD, null if never logged
  updatedAt: string;
};

export type StreakContextValue = {
  streak: Streak | null;
  hasLoggedToday: boolean;
  isLoadingStreak: boolean;
  logToday: (type?: DailyLogType) => Promise<void>;
  refreshStreak: () => Promise<void>;
};
