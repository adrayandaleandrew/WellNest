import { auth } from 'firebase-functions/v1';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Creates a minimal user stub in Firestore immediately after signup.
// Ensures the user doc exists even if onboarding is never completed.
export const onUserCreated = auth.user().onCreate(async (user) => {
  const db = getFirestore();
  const docRef = db.collection('users').doc(user.uid);

  const existing = await docRef.get();
  if (existing.exists) return; // Onboarding may have already written the doc

  await docRef.set({
    uid: user.uid,
    email: user.email ?? '',
    onboardingComplete: false,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
});
