export type Goal =
  | 'lose_weight'
  | 'build_muscle'
  | 'improve_endurance'
  | 'eat_healthier'
  | 'reduce_stress'
  | 'improve_sleep';

export type HealthFlag =
  | 'none'
  | 'diabetes'
  | 'hypertension'
  | 'heart_condition'
  | 'asthma'
  | 'joint_issues'
  | 'back_pain'
  | 'pregnancy';

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
  healthFlags: HealthFlag[];
  activityLevel: ActivityLevel;
  onboardingComplete: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OnboardingFormData = {
  goals: Goal[];
  displayName: string;
  dateOfBirth: string;
  gender: Gender;
  heightCm: string;
  weightKg: string;
  healthFlags: HealthFlag[];
  activityLevel: ActivityLevel | null;
};

export type ProfileContextValue = {
  profile: UserProfile | null;
  isLoadingProfile: boolean;
  saveOnboarding: (data: OnboardingFormData) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
};
