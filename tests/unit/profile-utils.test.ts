import { describe, it, expect } from 'vitest';
import {
  formatGoalLabel,
  formatHealthFlagLabel,
  formatActivityLevelLabel,
  formatGenderLabel,
} from '@mobile/shared/utils/profile-utils';
import type { Goal, HealthFlag, ActivityLevel, Gender } from '@mobile/shared/types/profile';

// ---------------------------------------------------------------------------
// formatGoalLabel
// ---------------------------------------------------------------------------
describe('formatGoalLabel', () => {
  const cases: [Goal, string][] = [
    ['lose_weight', 'Lose Weight'],
    ['build_muscle', 'Build Muscle'],
    ['improve_endurance', 'Improve Endurance'],
    ['eat_healthier', 'Eat Healthier'],
    ['reduce_stress', 'Reduce Stress'],
    ['improve_sleep', 'Improve Sleep'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatGoalLabel(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// formatHealthFlagLabel
// ---------------------------------------------------------------------------
describe('formatHealthFlagLabel', () => {
  const cases: [HealthFlag, string][] = [
    ['none', 'None'],
    ['diabetes', 'Diabetes'],
    ['hypertension', 'Hypertension'],
    ['heart_condition', 'Heart Condition'],
    ['asthma', 'Asthma'],
    ['joint_issues', 'Joint Issues'],
    ['back_pain', 'Back Pain'],
    ['pregnancy', 'Pregnancy'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatHealthFlagLabel(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// formatActivityLevelLabel
// ---------------------------------------------------------------------------
describe('formatActivityLevelLabel', () => {
  const cases: [ActivityLevel, string][] = [
    ['sedentary', 'Sedentary'],
    ['lightly_active', 'Lightly Active'],
    ['moderately_active', 'Moderately Active'],
    ['very_active', 'Very Active'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatActivityLevelLabel(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// formatGenderLabel
// ---------------------------------------------------------------------------
describe('formatGenderLabel', () => {
  const cases: [Gender, string][] = [
    ['male', 'Male'],
    ['female', 'Female'],
    ['prefer_not_to_say', 'Prefer not to say'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatGenderLabel(input)).toBe(expected);
  });
});
