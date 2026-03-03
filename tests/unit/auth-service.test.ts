import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock firebase/auth before any imports that depend on it
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn().mockResolvedValue({ user: {} }),
  signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: {} }),
  signOut: vi.fn().mockResolvedValue(undefined),
  onAuthStateChanged: vi.fn().mockReturnValue(vi.fn()), // returns mock unsubscribe fn
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
}));

// Prevent actual Firebase app initialization (firebase.ts uses React Native deps)
vi.mock('@mobile/shared/services/firebase', () => ({
  auth: { _isAuth: true }, // sentinel object so toHaveBeenCalledWith can match it
  db: {},
}));

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@mobile/shared/services/firebase';
import {
  loginWithEmail,
  registerWithEmail,
  logout,
  subscribeToAuthChanges,
  sendPasswordReset,
} from '@mobile/shared/services/auth-service';

const mockSignIn = vi.mocked(signInWithEmailAndPassword);
const mockRegister = vi.mocked(createUserWithEmailAndPassword);
const mockSignOut = vi.mocked(signOut);
const mockOnAuthStateChanged = vi.mocked(onAuthStateChanged);
const mockSendPasswordResetEmail = vi.mocked(sendPasswordResetEmail);

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// loginWithEmail
// ---------------------------------------------------------------------------
describe('loginWithEmail', () => {
  it('calls signInWithEmailAndPassword with auth, email, and password', async () => {
    const email = 'user@example.com';
    const password = 'Password1';

    await loginWithEmail(email, password);

    expect(mockSignIn).toHaveBeenCalledOnce();
    expect(mockSignIn).toHaveBeenCalledWith(auth, email, password);
  });
});

// ---------------------------------------------------------------------------
// registerWithEmail
// ---------------------------------------------------------------------------
describe('registerWithEmail', () => {
  it('calls createUserWithEmailAndPassword with auth, email, and password', async () => {
    const email = 'newuser@example.com';
    const password = 'Password1';

    await registerWithEmail(email, password);

    expect(mockRegister).toHaveBeenCalledOnce();
    expect(mockRegister).toHaveBeenCalledWith(auth, email, password);
  });
});

// ---------------------------------------------------------------------------
// logout
// ---------------------------------------------------------------------------
describe('logout', () => {
  it('calls signOut with auth', async () => {
    await logout();

    expect(mockSignOut).toHaveBeenCalledOnce();
    expect(mockSignOut).toHaveBeenCalledWith(auth);
  });
});

// ---------------------------------------------------------------------------
// subscribeToAuthChanges
// ---------------------------------------------------------------------------
describe('subscribeToAuthChanges', () => {
  it('calls onAuthStateChanged with auth and the callback', () => {
    const callback = vi.fn();
    subscribeToAuthChanges(callback);

    expect(mockOnAuthStateChanged).toHaveBeenCalledOnce();
    expect(mockOnAuthStateChanged).toHaveBeenCalledWith(auth, callback);
  });

  it('returns the unsubscribe function provided by onAuthStateChanged', () => {
    const mockUnsubscribe = vi.fn();
    mockOnAuthStateChanged.mockReturnValueOnce(mockUnsubscribe);

    const callback = vi.fn();
    const result = subscribeToAuthChanges(callback);

    expect(result).toBe(mockUnsubscribe);
  });
});

// ---------------------------------------------------------------------------
// sendPasswordReset
// ---------------------------------------------------------------------------
describe('sendPasswordReset', () => {
  it('calls sendPasswordResetEmail with auth and email', async () => {
    const email = 'user@example.com';

    await sendPasswordReset(email);

    expect(mockSendPasswordResetEmail).toHaveBeenCalledOnce();
    expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });
});
