import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  collection: vi.fn().mockReturnValue({ _col: 'meals' }),
  doc: vi.fn().mockReturnValue({ _doc: 'meal-doc' }),
  getDocs: vi.fn(),
  getDoc: vi.fn(),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import { getMeals, getMealById } from '@mobile/shared/services/meal-service';

const mockCollection = vi.mocked(collection);
const mockDoc = vi.mocked(doc);
const mockGetDocs = vi.mocked(getDocs);
const mockGetDoc = vi.mocked(getDoc);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getMeals
// ---------------------------------------------------------------------------
describe('getMeals', () => {
  it('returns an array of meals with id field', async () => {
    mockGetDocs.mockResolvedValueOnce({
      docs: [
        { id: 'meal1', data: () => ({ name: 'Salad', category: 'lunch' }) },
        { id: 'meal2', data: () => ({ name: 'Pasta', category: 'dinner' }) },
      ],
    } as any);

    const result = await getMeals();

    expect(mockCollection).toHaveBeenCalledWith(db, 'meals');
    expect(result).toEqual([
      { id: 'meal1', name: 'Salad', category: 'lunch' },
      { id: 'meal2', name: 'Pasta', category: 'dinner' },
    ]);
  });
});

// ---------------------------------------------------------------------------
// getMealById
// ---------------------------------------------------------------------------
describe('getMealById', () => {
  it('returns a meal when the document exists', async () => {
    mockGetDoc.mockResolvedValueOnce({
      exists: () => true,
      id: 'meal1',
      data: () => ({ name: 'Salad', category: 'lunch' }),
    } as any);

    const result = await getMealById('meal1');

    expect(mockDoc).toHaveBeenCalledWith(db, 'meals', 'meal1');
    expect(result).toEqual({ id: 'meal1', name: 'Salad', category: 'lunch' });
  });

  it('returns null when the document does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getMealById('nonexistent');

    expect(result).toBeNull();
  });
});
