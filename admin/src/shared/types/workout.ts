export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'core'
  | 'full_body'
  | 'cardio';

export type Exercise = {
  name: string;
  sets: number;
  reps: number | null;
  durationSeconds: number | null;
  restSeconds: number;
  description: string;
};

export type Workout = {
  id: string;
  name: string;
  description: string;
  difficulty: Difficulty;
  durationMinutes: number;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
  createdAt: string;
};
