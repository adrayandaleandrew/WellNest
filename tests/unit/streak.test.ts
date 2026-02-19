import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({}),
  getDoc: vi.fn(),
  setDoc: vi.fn().mockResolvedValue(undefined),
}));

// Prevent actual Firebase app initialization (firebase.ts uses React Native deps)
vi.mock('@mobile/shared/services/firebase', () => ({
  auth: {},
  db: {},
}));

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { calculateAndUpdateStreak } from '@mobile/shared/services/log-service';
import type { Streak } from '@mobile/shared/types/log';

const mockGetDoc = vi.mocked(getDoc);
const mockSetDoc = vi.mocked(setDoc);

// Mirrors the service's private date helpers so tests stay in sync with the implementation
function todayStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function yesterdayStr(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const y = yesterday.getFullYear();
  const m = String(yesterday.getMonth() + 1).padStart(2, '0');
  const d = String(yesterday.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Helper to build a Firestore snapshot mock
function makeSnapshot(exists: boolean, data?: Partial<Streak>) {
  return {
    exists: () => exists,
    data: () => data ?? null,
  } as unknown as Awaited<ReturnType<typeof getDoc>>;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(doc).mockReturnValue({} as ReturnType<typeof doc>);
  mockSetDoc.mockResolvedValue(undefined);
});

describe('calculateAndUpdateStreak', () => {
  it('starts streak at 1 when no prior streak document exists', async () => {
    mockGetDoc.mockResolvedValue(makeSnapshot(false));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.lastLogDate).toBe(todayStr());
    expect(mockSetDoc).toHaveBeenCalledOnce();
  });

  it('increments streak when lastLogDate is yesterday', async () => {
    const existing: Streak = {
      currentStreak: 3,
      longestStreak: 5,
      lastLogDate: yesterdayStr(),
      updatedAt: new Date().toISOString(),
    };
    mockGetDoc.mockResolvedValue(makeSnapshot(true, existing));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(4);
    expect(result.longestStreak).toBe(5); // unchanged — 4 < 5
    expect(result.lastLogDate).toBe(todayStr());
    expect(mockSetDoc).toHaveBeenCalledOnce();
  });

  it('updates longestStreak when new streak exceeds the previous record', async () => {
    const existing: Streak = {
      currentStreak: 5,
      longestStreak: 5,
      lastLogDate: yesterdayStr(),
      updatedAt: new Date().toISOString(),
    };
    mockGetDoc.mockResolvedValue(makeSnapshot(true, existing));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(6);
    expect(result.longestStreak).toBe(6); // new record
  });

  it('is idempotent: returns unchanged streak when lastLogDate is today', async () => {
    const existing: Streak = {
      currentStreak: 3,
      longestStreak: 5,
      lastLogDate: todayStr(),
      updatedAt: new Date().toISOString(),
    };
    mockGetDoc.mockResolvedValue(makeSnapshot(true, existing));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(5);
    expect(result.lastLogDate).toBe(todayStr());
    // Already logged today — must NOT write to Firestore again
    expect(mockSetDoc).not.toHaveBeenCalled();
  });

  it('resets currentStreak to 1 when gap is more than 1 day', async () => {
    const existing: Streak = {
      currentStreak: 5,
      longestStreak: 10,
      lastLogDate: '2020-01-01', // well in the past
      updatedAt: new Date().toISOString(),
    };
    mockGetDoc.mockResolvedValue(makeSnapshot(true, existing));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(1);
    expect(result.lastLogDate).toBe(todayStr());
    expect(mockSetDoc).toHaveBeenCalledOnce();
  });

  it('never decreases longestStreak when streak breaks', async () => {
    const existing: Streak = {
      currentStreak: 4,
      longestStreak: 4,
      lastLogDate: '2020-01-01', // streak is now broken
      updatedAt: new Date().toISOString(),
    };
    mockGetDoc.mockResolvedValue(makeSnapshot(true, existing));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(4); // preserved
  });

  it('lastLogDate uses YYYY-MM-DD format', async () => {
    mockGetDoc.mockResolvedValue(makeSnapshot(false));

    const result = await calculateAndUpdateStreak('uid-1');

    expect(result.lastLogDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
