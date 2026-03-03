import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({ _doc: 'profile-doc' }),
  getDoc: vi.fn(),
  setDoc: vi.fn().mockResolvedValue(undefined),
  updateDoc: vi.fn().mockResolvedValue(undefined),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import {
  getUserProfile,
  saveOnboardingProfile,
  updateUserProfile,
} from '@mobile/shared/services/profile-service';

const mockDoc = vi.mocked(doc);
const mockGetDoc = vi.mocked(getDoc);
const mockSetDoc = vi.mocked(setDoc);
const mockUpdateDoc = vi.mocked(updateDoc);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getUserProfile
// ---------------------------------------------------------------------------
describe('getUserProfile', () => {
  it('returns the profile when the document exists', async () => {
    const profile = {
      uid: 'user-123',
      email: 'test@example.com',
      displayName: 'Test User',
      onboardingComplete: true,
    };
    mockGetDoc.mockResolvedValueOnce({ exists: () => true, data: () => profile } as any);

    const result = await getUserProfile('user-123');

    expect(mockDoc).toHaveBeenCalledWith(db, 'users', 'user-123');
    expect(result).toEqual(profile);
  });

  it('returns null when the document does not exist', async () => {
    mockGetDoc.mockResolvedValueOnce({ exists: () => false } as any);

    const result = await getUserProfile('user-123');

    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// saveOnboardingProfile
// ---------------------------------------------------------------------------
describe('saveOnboardingProfile', () => {
  it('calls setDoc with an assembled profile including onboardingComplete: true', async () => {
    const uid = 'user-123';
    const email = 'test@example.com';
    const data = {
      displayName: '  Alice  ',
      dateOfBirth: '1990-01-01',
      gender: 'female',
      heightCm: '165',
      weightKg: '55',
      goals: ['lose_weight'],
      healthFlags: [],
      activityLevel: 'moderate',
    };

    await saveOnboardingProfile(uid, email, data as any);

    expect(mockDoc).toHaveBeenCalledWith(db, 'users', uid);
    expect(mockSetDoc).toHaveBeenCalledOnce();
    const [, payload] = mockSetDoc.mock.calls[0];
    expect(payload).toMatchObject({
      uid,
      email,
      displayName: 'Alice', // trimmed
      heightCm: 165,        // converted to number
      weightKg: 55,         // converted to number
      goals: ['lose_weight'],
      onboardingComplete: true,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});

// ---------------------------------------------------------------------------
// updateUserProfile
// ---------------------------------------------------------------------------
describe('updateUserProfile', () => {
  it('calls updateDoc with partial data merged with updatedAt', async () => {
    const uid = 'user-123';
    const partial = { displayName: 'Bob' };

    await updateUserProfile(uid, partial);

    expect(mockDoc).toHaveBeenCalledWith(db, 'users', uid);
    expect(mockUpdateDoc).toHaveBeenCalledOnce();
    const [, payload] = mockUpdateDoc.mock.calls[0];
    expect(payload).toMatchObject({ displayName: 'Bob', updatedAt: expect.any(String) });
  });
});
