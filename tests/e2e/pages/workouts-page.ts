import { type Page } from '@playwright/test';

export class WorkoutsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/workouts');
  }

  get addWorkoutButton() {
    return this.page.getByTestId('add-workout-button');
  }

  get workoutRows() {
    return this.page.getByTestId('workout-row');
  }

  async getWorkoutNames(): Promise<string[]> {
    const cells = this.page.getByTestId('workout-name');
    return cells.allTextContents();
  }

  async clickAddWorkout() {
    await this.addWorkoutButton.click();
  }

  async fillWorkoutForm(name: string, difficulty: string, durationMinutes: number) {
    // The modal is open — fill the workout-level fields
    await this.page.getByLabel('Name').fill(name);
    await this.page.locator('select').first().selectOption(difficulty);
    await this.page.getByLabel('Duration (min)').fill(String(durationMinutes));
  }

  async fillExercise(index: number, exerciseName: string, sets: number, reps: number, restSeconds: number) {
    const exerciseBlocks = this.page.locator('[class*="border"][class*="rounded-md"][class*="bg-gray-50"]');
    const block = exerciseBlocks.nth(index);

    await block.getByPlaceholder('Exercise name').fill(exerciseName);
    await block.getByLabel('Sets').fill(String(sets));
    await block.getByLabel('Reps (blank = timed)').fill(String(reps));
    await block.getByLabel('Rest (sec)').fill(String(restSeconds));
  }

  async submitWorkoutForm() {
    await this.page.getByRole('button', { name: 'Create Workout' }).click();
  }

  async deleteWorkout(name: string) {
    // Mock window.confirm to auto-accept — avoids dialog blocking
    await this.page.evaluate(() => {
      window.confirm = () => true;
    });

    const rows = this.page.getByTestId('workout-row');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const cellText = await row.getByTestId('workout-name').textContent();
      if (cellText?.trim() === name) {
        await row.getByTestId('delete-workout-button').click();
        return;
      }
    }
  }
}
