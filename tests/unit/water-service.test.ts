import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({ _doc: 'water-doc' }),
  getDoc: vi.fn(),
  setDoc: vi.fn().mockResolvedValue(undefined),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import { getWaterCount, updateWaterCount } from '@mobile/shared/services/water-service';

const mockDoc = vi.mocked(doc);
const mockGetDoc = vi.mocked(getDoc);
const mockSetDoc = vi.mocked(setDoc);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getWaterCount
// ---------------------------------------------------------------------------
describe('getWaterCount', () => {
  it('returns the glasses count when the doc exists', async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => ({ glasses: 5, updatedAt: '2026-01-01T12:00:00.000Z' }),
    } as any);

    const result = await getWaterCount('user-123');

    expect(mockDoc).toHaveBeenCalledWith(
      db,
      'users',
      'user-123',
      'water',
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    );
    expect(result).toBe(5);
  });

  it('returns 0 when the doc does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getWaterCount('user-123');

    expect(result).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// updateWaterCount
// ---------------------------------------------------------------------------
describe('updateWaterCount', () => {
  it('calls setDoc with the correct path and data', async () => {
    const uid = 'user-123';
    const glasses = 4;

    await updateWaterCount(uid, glasses);

    expect(mockDoc).toHaveBeenCalledWith(
      db,
      'users',
      uid,
      'water',
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    );
    expect(mockSetDoc).toHaveBeenCalledOnce();
    const [, payload] = mockSetDoc.mock.calls[0];
    expect(payload).toMatchObject({ glasses, updatedAt: expect.any(String) });
  });
});
