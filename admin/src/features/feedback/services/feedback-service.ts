import { collectionGroup, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../shared/services/firebase';
import type { FeedbackItem } from '../../../shared/types/feedback';

export async function getFeedback(): Promise<FeedbackItem[]> {
  const q = query(collectionGroup(db, 'feedback'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    // The feedback doc lives at users/{uid}/feedback/{id} — parent.parent is the user doc
    userId: d.ref.parent.parent?.id ?? 'unknown',
    ...(d.data() as Omit<FeedbackItem, 'id' | 'userId'>),
  }));
}
