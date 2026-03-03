import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  collection: vi.fn().mockReturnValue({ _col: 'workouts' }),
  doc: vi.fn().mockReturnValue({ _doc: 'workout-doc' }),
  getDocs: vi.fn(),
  getDoc: vi.fn(),
  addDoc: vi.fn().mockResolvedValue({ id: 'log-id' }),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { collection, doc, getDocs, getDoc, addDoc } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import { getWorkouts, getWorkoutById, saveWorkoutLog } from '@mobile/shared/services/workout-service';

const mockCollection = vi.mocked(collection);
const mockDoc = vi.mocked(doc);
const mockGetDocs = vi.mocked(getDocs);
const mockGetDoc = vi.mocked(getDoc);
const mockAddDoc = vi.mocked(addDoc);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getWorkouts
// ---------------------------------------------------------------------------
describe('getWorkouts', () => {
  it('returns an array of workouts with id field', async () => {
    mockGetDocs.mockResolvedValueOnce({
      docs: [
        { id: 'w1', data: () => ({ name: 'Push Day', level: 'beginner' }) },
        { id: 'w2', data: () => ({ name: 'Pull Day', level: 'intermediate' }) },
      ],
    } as any);

    const result = await getWorkouts();

    expect(mockCollection).toHaveBeenCalledWith(db, 'workouts');
    expect(result).toEqual([
      { id: 'w1', name: 'Push Day', level: 'beginner' },
      { id: 'w2', name: 'Pull Day', level: 'intermediate' },
    ]);
  });
});

// ---------------------------------------------------------------------------
// getWorkoutById
// ---------------------------------------------------------------------------
describe('getWorkoutById', () => {
  it('returns a workout when the document exists', async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      id: 'w1',
      data: () => ({ name: 'Push Day', level: 'beginner' }),
    } as any);

    const result = await getWorkoutById('w1');

    expect(mockDoc).toHaveBeenCalledWith(db, 'workouts', 'w1');
    expect(result).toEqual({ id: 'w1', name: 'Push Day', level: 'beginner' });
  });

  it('returns null when the document does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getWorkoutById('nonexistent');

    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// saveWorkoutLog
// ---------------------------------------------------------------------------
describe('saveWorkoutLog', () => {
  it('calls addDoc at users/{uid}/workoutLogs with the log', async () => {
    const uid = 'user-123';
    const log = {
      workoutId: 'w1',
      completedAt: '2026-01-01T00:00:00.000Z',
      durationSeconds: 1200,
    } as any;

    await saveWorkoutLog(uid, log);

    expect(mockCollection).toHaveBeenCalledWith(db, 'users', uid, 'workoutLogs');
    expect(mockAddDoc).toHaveBeenCalledOnce();
    const [, payload] = mockAddDoc.mock.calls[0];
    expect(payload).toEqual(log);
  });
});
