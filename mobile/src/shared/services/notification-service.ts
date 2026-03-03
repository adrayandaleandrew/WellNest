import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Requests permission and returns the Expo Push Token, or null if unavailable.
// Physical device is required — simulators do not support push tokens.
export async function registerForPushNotifications(): Promise<string | null> {
  // Push tokens are only available on physical devices
  if (!Notifications.isDevice) {
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  // Android requires a notification channel to be set up before receiving push
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  // Return only the token string — never log it (device identifier / PII)
  return tokenData.data;
}

// Saves the push token to the user's Firestore doc.
// Uses updateDoc so other fields (profile, onboarding) are preserved.
export async function savePushToken(uid: string, token: string): Promise<void> {
  await updateDoc(doc(db, 'users', uid), { pushToken: token });
}

// Attaches foreground notification and response listeners.
// Returns a cleanup function to remove both listeners.
export function setupNotificationListeners(
  onNotification?: (notification: Notifications.Notification) => void,
): () => void {
  const foregroundSub = Notifications.addNotificationReceivedListener((notification) => {
    onNotification?.(notification);
  });

  const responseSub = Notifications.addNotificationResponseReceivedListener(() => {
    // Response handler — extend here to navigate based on notification data
  });

  return () => {
    foregroundSub.remove();
    responseSub.remove();
  };
}
