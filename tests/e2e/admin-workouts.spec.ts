import { test, expect } from '@playwright/test';
import { WorkoutsPage } from './pages/workouts-page';

/**
 * Admin workout CRUD flow — runs in the 'chromium' project (stored auth from global-setup).
 *
 * Requires:
 *   1. .env.test with PLAYWRIGHT_ADMIN_EMAIL + PLAYWRIGHT_ADMIN_PASSWORD
 *   2. admin/.env.local with Firebase credentials (so the dev server connects to Firestore)
 */
test.describe('Workouts CRUD', () => {
  const TEST_WORKOUT_NAME = 'E2E Test Workout';

  test('create a workout and verify it appears in the table', async ({ page }) => {
    const workoutsPage = new WorkoutsPage(page);
    await workoutsPage.goto();

    await expect(workoutsPage.addWorkoutButton).toBeVisible();
    await workoutsPage.clickAddWorkout();

    // Fill the workout modal form
    await workoutsPage.fillWorkoutForm(TEST_WORKOUT_NAME, 'beginner', 10);

    // Fill the first (default) exercise
    await workoutsPage.fillExercise(0, 'Test Push-up', 2, 10, 30);

    await workoutsPage.submitWorkoutForm();

    // Wait for the modal to close and the table to reload
    await expect(page.getByRole('button', { name: 'Create Workout' })).not.toBeVisible();

    // Verify the new workout is in the table
    const names = await workoutsPage.getWorkoutNames();
    expect(names).toContain(TEST_WORKOUT_NAME);
  });

  test('delete a workout and verify it is removed from the table', async ({ page }) => {
    const workoutsPage = new WorkoutsPage(page);
    await workoutsPage.goto();

    // Ensure the test workout exists before we try to delete it
    const namesBefore = await workoutsPage.getWorkoutNames();
    if (!namesBefore.includes(TEST_WORKOUT_NAME)) {
      test.skip(true, `"${TEST_WORKOUT_NAME}" not found — run the create test first`);
    }

    await workoutsPage.deleteWorkout(TEST_WORKOUT_NAME);

    // Wait for the row to disappear
    await expect(async () => {
      const names = await workoutsPage.getWorkoutNames();
      expect(names).not.toContain(TEST_WORKOUT_NAME);
    }).toPass({ timeout: 10_000 });
  });
});
