import type { Timestamp } from 'firebase/firestore';

export type FeedbackItem = {
  id: string;
  userId: string;
  message: string;
  rating: number;
  appVersion: string;
  createdAt: Timestamp | null;
};
