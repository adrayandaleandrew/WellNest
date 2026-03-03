import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getFirestore } from 'firebase-admin/firestore';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const CHUNK_SIZE = 100;

// Validates that a token looks like a real Expo push token.
// Tokens must start with 'ExponentPushToken[' to be accepted by the Expo API.
function isValidExpoToken(token: unknown): token is string {
  return (
    typeof token === 'string' &&
    token.startsWith('ExponentPushToken[') &&
    token.length < 256
  );
}

// Runs daily at 09:00 UTC — sends a habit-building reminder to all registered devices.
// Uses native fetch (Node 20 built-in) — no extra HTTP dependency needed.
export const sendDailyReminder = onSchedule('0 9 * * *', async () => {
  const db = getFirestore();

  // Fetch all user docs and collect valid push tokens
  const usersSnap = await db.collection('users').get();
  const tokens: string[] = [];

  usersSnap.forEach((doc) => {
    const token = doc.get('pushToken');
    if (isValidExpoToken(token)) {
      tokens.push(token);
    }
  });

  if (tokens.length === 0) {
    console.log('sendDailyReminder: no valid push tokens found, skipping.');
    return;
  }

  console.log(`sendDailyReminder: sending to ${tokens.length} device(s).`);

  // Send in chunks of CHUNK_SIZE to stay within Expo API limits
  for (let i = 0; i < tokens.length; i += CHUNK_SIZE) {
    const chunk = tokens.slice(i, i + CHUNK_SIZE);

    const messages = chunk.map((to) => ({
      to,
      title: 'Time to move! 💪',
      body: "Your daily workout reminder — let's keep the streak going.",
      sound: 'default',
    }));

    try {
      const res = await fetch(EXPO_PUSH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messages),
      });

      if (!res.ok) {
        // Log status only — never log token values (PII)
        console.error(
          `sendDailyReminder: Expo API returned ${res.status} for chunk ${i / CHUNK_SIZE + 1}.`,
        );
      }
    } catch (err) {
      // Log error type only — never log token values (PII)
      const message = err instanceof Error ? err.message : 'unknown error';
      console.error(
        `sendDailyReminder: fetch failed for chunk ${i / CHUNK_SIZE + 1}: ${message}`,
      );
    }
  }
});
