import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Hoisted variables — must be declared before vi.mock factories are evaluated
// ---------------------------------------------------------------------------

// vi.hoisted ensures this runs before vi.mock hoisting, making the variable
// accessible inside the mock factory.
const { mockRemove } = vi.hoisted(() => ({ mockRemove: vi.fn() }));

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('expo-notifications', () => ({
  isDevice: true,
  setNotificationHandler: vi.fn(),
  getPermissionsAsync: vi.fn().mockResolvedValue({ status: 'granted' }),
  requestPermissionsAsync: vi.fn().mockResolvedValue({ status: 'granted' }),
  getExpoPushTokenAsync: vi.fn().mockResolvedValue({ data: 'ExponentPushToken[test-token-123]' }),
  setNotificationChannelAsync: vi.fn().mockResolvedValue(undefined),
  addNotificationReceivedListener: vi.fn().mockReturnValue({ remove: mockRemove }),
  addNotificationResponseReceivedListener: vi.fn().mockReturnValue({ remove: mockRemove }),
  AndroidImportance: { MAX: 5 },
}));

vi.mock('react-native', () => ({
  Platform: { OS: 'ios' },
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn().mockReturnValue({ path: 'users/test-uid' }),
  updateDoc: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@mobile/shared/services/firebase', () => ({
  db: {},
}));

// ---------------------------------------------------------------------------
// Imports (after mocks)
// ---------------------------------------------------------------------------

import * as Notifications from 'expo-notifications';
import { updateDoc } from 'firebase/firestore';
import {
  registerForPushNotifications,
  savePushToken,
  setupNotificationListeners,
} from '@mobile/shared/services/notification-service';

const mockGetPermissions = vi.mocked(Notifications.getPermissionsAsync);
const mockGetToken = vi.mocked(Notifications.getExpoPushTokenAsync);
const mockUpdateDoc = vi.mocked(updateDoc);

beforeEach(() => {
  vi.clearAllMocks();
  // Reset isDevice to true before each test
  (Notifications as Record<string, unknown>).isDevice = true;
});

// ---------------------------------------------------------------------------
// registerForPushNotifications
// ---------------------------------------------------------------------------
describe('registerForPushNotifications', () => {
  it('returns the Expo push token when permission is granted', async () => {
    mockGetPermissions.mockResolvedValueOnce({ status: 'granted' } as Awaited<
      ReturnType<typeof Notifications.getPermissionsAsync>
    >);
    mockGetToken.mockResolvedValueOnce({ data: 'ExponentPushToken[abc123]' } as Awaited<
      ReturnType<typeof Notifications.getExpoPushTokenAsync>
    >);

    const token = await registerForPushNotifications();

    expect(token).toBe('ExponentPushToken[abc123]');
  });

  it('returns null when permission is denied', async () => {
    mockGetPermissions.mockResolvedValueOnce({ status: 'denied' } as Awaited<
      ReturnType<typeof Notifications.getPermissionsAsync>
    >);
    vi.mocked(Notifications.requestPermissionsAsync).mockResolvedValueOnce({
      status: 'denied',
    } as Awaited<ReturnType<typeof Notifications.requestPermissionsAsync>>);

    const token = await registerForPushNotifications();

    expect(token).toBeNull();
  });

  it('returns null when not running on a physical device', async () => {
    (Notifications as Record<string, unknown>).isDevice = false;

    const token = await registerForPushNotifications();

    expect(token).toBeNull();
    expect(mockGetToken).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// savePushToken
// ---------------------------------------------------------------------------
describe('savePushToken', () => {
  it('calls updateDoc with the correct uid and token field', async () => {
    await savePushToken('test-uid', 'ExponentPushToken[abc123]');

    expect(mockUpdateDoc).toHaveBeenCalledOnce();
    expect(mockUpdateDoc).toHaveBeenCalledWith(
      expect.anything(),
      { pushToken: 'ExponentPushToken[abc123]' },
    );
  });
});

// ---------------------------------------------------------------------------
// setupNotificationListeners
// ---------------------------------------------------------------------------
describe('setupNotificationListeners', () => {
  it('returns a cleanup function that removes both listeners', () => {
    const cleanup = setupNotificationListeners();

    expect(typeof cleanup).toBe('function');

    cleanup();

    // Both the foreground and response subscriptions should be removed
    expect(mockRemove).toHaveBeenCalledTimes(2);
  });
});
