import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  collection: vi.fn().mockReturnValue({ _col: 'weightLogs' }),
  addDoc: vi.fn().mockResolvedValue({ id: 'new-entry' }),
  getDocs: vi.fn(),
  orderBy: vi.fn().mockReturnValue({ _orderBy: 'loggedAt' }),
  query: vi.fn().mockReturnValue({ _query: true }),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import { addWeightEntry, getWeightHistory } from '@mobile/shared/services/weight-service';

const mockCollection = vi.mocked(collection);
const mockAddDoc = vi.mocked(addDoc);
const mockGetDocs = vi.mocked(getDocs);
const mockOrderBy = vi.mocked(orderBy);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// addWeightEntry
// ---------------------------------------------------------------------------
describe('addWeightEntry', () => {
  it('calls addDoc with the correct data shape', async () => {
    const uid = 'user-123';
    const weightKg = 70.5;

    await addWeightEntry(uid, weightKg);

    expect(mockCollection).toHaveBeenCalledWith(db, 'users', uid, 'weightLogs');
    expect(mockAddDoc).toHaveBeenCalledOnce();
    const [, payload] = mockAddDoc.mock.calls[0];
    expect(payload).toMatchObject({
      weightKg,
      date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      loggedAt: expect.any(String),
    });
  });
});

// ---------------------------------------------------------------------------
// getWeightHistory
// ---------------------------------------------------------------------------
describe('getWeightHistory', () => {
  it('returns an ordered array of weight entries', async () => {
    mockGetDocs.mockResolvedValueOnce({
      docs: [
        {
          id: 'e1',
          data: () => ({ weightKg: 68, date: '2026-01-01', loggedAt: '2026-01-01T00:00:00.000Z' }),
        },
        {
          id: 'e2',
          data: () => ({ weightKg: 70, date: '2026-01-02', loggedAt: '2026-01-02T00:00:00.000Z' }),
        },
      ],
    } as any);

    const uid = 'user-123';
    const result = await getWeightHistory(uid);

    expect(mockCollection).toHaveBeenCalledWith(db, 'users', uid, 'weightLogs');
    expect(mockOrderBy).toHaveBeenCalledWith('loggedAt', 'asc');
    expect(result).toEqual([
      { id: 'e1', weightKg: 68, date: '2026-01-01', loggedAt: '2026-01-01T00:00:00.000Z' },
      { id: 'e2', weightKg: 70, date: '2026-01-02', loggedAt: '2026-01-02T00:00:00.000Z' },
    ]);
  });
});
