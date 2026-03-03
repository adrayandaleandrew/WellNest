import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.hoisted runs before vi.mock factories, so these refs are available inside the factories
const { mockGet, mockSet, getHandler, setHandler } = vi.hoisted(() => {
  const mockGet = vi.fn();
  const mockSet = vi.fn();
  let _handler: ((user: { uid: string; email: string | null }) => Promise<void>) | undefined;
  return {
    mockGet,
    mockSet,
    getHandler: () => _handler,
    setHandler: (fn: (user: { uid: string; email: string | null }) => Promise<void>) => {
      _handler = fn;
    },
  };
});

// Mock the trigger wrapper — captures the handler when the module is imported
vi.mock('firebase-functions/v1', () => ({
  auth: {
    user: () => ({
      onCreate: (fn: (user: { uid: string; email: string | null }) => Promise<void>) => {
        setHandler(fn);
        return {};
      },
    }),
  },
}));

// Mock Admin SDK — returns a controllable docRef
vi.mock('firebase-admin/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: mockGet,
        set: mockSet,
      })),
    })),
  })),
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
  },
}));

// Import triggers module evaluation, which calls auth.user().onCreate(handler)
import '../../backend/functions/src/on-user-created';

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// onUserCreated
// ---------------------------------------------------------------------------
describe('onUserCreated', () => {
  it('creates stub when doc does not exist', async () => {
    mockGet.mockResolvedValueOnce({ exists: false });

    await getHandler()!({ uid: 'user123', email: 'test@example.com' });

    expect(mockSet).toHaveBeenCalledOnce();
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        uid: 'user123',
        email: 'test@example.com',
        onboardingComplete: false,
      })
    );
  });

  it('skips when doc already exists', async () => {
    mockGet.mockResolvedValueOnce({ exists: true });

    await getHandler()!({ uid: 'user123', email: 'test@example.com' });

    expect(mockSet).not.toHaveBeenCalled();
  });

  it('uses empty string when email is null', async () => {
    mockGet.mockResolvedValueOnce({ exists: false });

    await getHandler()!({ uid: 'user123', email: null });

    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({ email: '' })
    );
  });
});
