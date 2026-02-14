import type { Goal, HealthFlag, ActivityLevel, Gender } from '../types/profile';

const goalLabels: Record<Goal, string> = {
  lose_weight: 'Lose Weight',
  build_muscle: 'Build Muscle',
  improve_endurance: 'Improve Endurance',
  eat_healthier: 'Eat Healthier',
  reduce_stress: 'Reduce Stress',
  improve_sleep: 'Improve Sleep',
};

const healthFlagLabels: Record<HealthFlag, string> = {
  none: 'None',
  diabetes: 'Diabetes',
  hypertension: 'Hypertension',
  heart_condition: 'Heart Condition',
  asthma: 'Asthma',
  joint_issues: 'Joint Issues',
  back_pain: 'Back Pain',
  pregnancy: 'Pregnancy',
};

const activityLevelLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly Active',
  moderately_active: 'Moderately Active',
  very_active: 'Very Active',
};

const genderLabels: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
  prefer_not_to_say: 'Prefer not to say',
};

export function formatGoalLabel(goal: Goal): string {
  return goalLabels[goal];
}

export function formatHealthFlagLabel(flag: HealthFlag): string {
  return healthFlagLabels[flag];
}

export function formatActivityLevelLabel(level: ActivityLevel): string {
  return activityLevelLabels[level];
}

export function formatGenderLabel(gender: Gender): string {
  return genderLabels[gender];
}
