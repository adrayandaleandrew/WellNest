import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/firestore before any imports that depend on it
vi.mock('firebase/firestore', () => ({
  addDoc: vi.fn().mockResolvedValue({ id: 'feedback-id' }),
  collection: vi.fn().mockReturnValue({ _col: 'feedback' }),
  serverTimestamp: vi.fn().mockReturnValue({ _serverTimestamp: true }),
}));

// Prevent actual Firebase app initialization
vi.mock('@mobile/shared/services/firebase', () => ({
  db: { _db: true },
}));

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@mobile/shared/services/firebase';
import { submitFeedback } from '@mobile/shared/services/feedback-service';

const mockAddDoc = vi.mocked(addDoc);
const mockCollection = vi.mocked(collection);
const mockServerTimestamp = vi.mocked(serverTimestamp);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// submitFeedback
// ---------------------------------------------------------------------------
describe('submitFeedback', () => {
  it('calls addDoc at users/{uid}/feedback with payload and serverTimestamp', async () => {
    const uid = 'user-123';
    const payload = { message: 'Great app!', rating: 5, appVersion: '1.0.0' };

    await submitFeedback(uid, payload);

    expect(mockCollection).toHaveBeenCalledWith(db, 'users', uid, 'feedback');
    expect(mockServerTimestamp).toHaveBeenCalledOnce();
    expect(mockAddDoc).toHaveBeenCalledOnce();
    const [, data] = mockAddDoc.mock.calls[0];
    expect(data).toMatchObject({
      ...payload,
      createdAt: { _serverTimestamp: true },
    });
  });
});
