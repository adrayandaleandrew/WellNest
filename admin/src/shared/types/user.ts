export type Goal =
  | 'lose_weight'
  | 'build_muscle'
  | 'improve_endurance'
  | 'eat_healthier'
  | 'reduce_stress'
  | 'improve_sleep';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';

export type Gender = 'male' | 'female' | 'prefer_not_to_say';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  dateOfBirth: string;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  goals: Goal[];
  activityLevel: ActivityLevel;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
};
