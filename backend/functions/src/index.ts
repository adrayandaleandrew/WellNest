import { initializeApp } from 'firebase-admin/app';
initializeApp(); // Must be called once before any Admin SDK usage

export { onUserCreated } from './on-user-created';
export { scheduledAnalytics } from './scheduled-analytics';
export { sendDailyReminder } from './send-daily-reminder';
