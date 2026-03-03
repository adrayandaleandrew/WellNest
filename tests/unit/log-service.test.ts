import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({ _doc: 'log-doc' }),
  getDoc: vi.fn(),
  setDoc: vi.fn().mockResolvedValue(undefined),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import {
  getTodayLog,
  saveDailyLog,
  getStreak,
  calculateAndUpdateStreak,
} from '@mobile/shared/services/log-service';

const mockGetDoc = vi.mocked(getDoc);
const mockSetDoc = vi.mocked(setDoc);

// Mirror the private date helpers from log-service so tests can match dates
function todayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function yesterdayString(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getTodayLog
// ---------------------------------------------------------------------------
describe('getTodayLog', () => {
  it('returns the daily log when the document exists', async () => {
    const today = todayString();
    const log = { date: today, loggedAt: '2026-01-01T00:00:00.000Z', type: 'workout' };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => log } as any);

    const result = await getTodayLog('user-123');

    expect(result).toEqual(log);
  });

  it('returns null when the document does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getTodayLog('user-123');

    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// saveDailyLog
// ---------------------------------------------------------------------------
describe('saveDailyLog', () => {
  it('writes a new log when none exists for today', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    await saveDailyLog('user-123');

    expect(mockSetDoc).toHaveBeenCalledOnce();
    const [, payload] = mockSetDoc.mock.calls[0];
    expect(payload).toMatchObject({
      date: todayString(),
      type: 'workout',
      loggedAt: expect.any(String),
    });
  });

  it('skips the write when a log already exists for today (idempotent)', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => true } as any);

    await saveDailyLog('user-123');

    expect(mockSetDoc).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// getStreak
// ---------------------------------------------------------------------------
describe('getStreak', () => {
  it('returns the streak when the document exists', async () => {
    const streak = { currentStreak: 5, longestStreak: 10, lastLogDate: '2026-01-01', updatedAt: '...' };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => streak } as any);

    const result = await getStreak('user-123');

    expect(result).toEqual(streak);
  });

  it('returns null when the document does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getStreak('user-123');

    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// calculateAndUpdateStreak
// ---------------------------------------------------------------------------
describe('calculateAndUpdateStreak', () => {
  it('returns unchanged streak without writing when already logged today', async () => {
    const today = todayString();
    const current = { currentStreak: 3, longestStreak: 5, lastLogDate: today, updatedAt: '...' };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => current } as any);

    const result = await calculateAndUpdateStreak('user-123');

    expect(mockSetDoc).not.toHaveBeenCalled();
    expect(result).toEqual(current);
  });

  it('increments the streak when last log was yesterday', async () => {
    const yesterday = yesterdayString();
    const current = { currentStreak: 3, longestStreak: 5, lastLogDate: yesterday, updatedAt: '...' };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => current } as any);

    const result = await calculateAndUpdateStreak('user-123');

    expect(mockSetDoc).toHaveBeenCalledOnce();
    expect(result.currentStreak).toBe(4);
    expect(result.lastLogDate).toBe(todayString());
  });

  it('resets streak to 1 when there is a gap of more than 1 day', async () => {
    const oldDate = '2020-01-01';
    const current = { currentStreak: 10, longestStreak: 15, lastLogDate: oldDate, updatedAt: '...' };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => current } as any);

    const result = await calculateAndUpdateStreak('user-123');

    expect(mockSetDoc).toHaveBeenCalledOnce();
    expect(result.currentStreak).toBe(1);
    expect(result.lastLogDate).toBe(todayString());
  });

  it('starts a fresh streak at 1 when there is no previous history', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await calculateAndUpdateStreak('user-123');

    expect(mockSetDoc).toHaveBeenCalledOnce();
    expect(result.currentStreak).toBe(1);
    expect(result.lastLogDate).toBe(todayString());
  });
});
