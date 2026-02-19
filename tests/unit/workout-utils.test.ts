import { describe, it, expect } from 'vitest';
import {
  formatDuration,
  formatDifficulty,
  formatMuscleGroup,
} from '@mobile/shared/utils/workout-utils';
import type { Difficulty, MuscleGroup } from '@mobile/shared/types/workout';

// ---------------------------------------------------------------------------
// formatDuration
// ---------------------------------------------------------------------------
describe('formatDuration', () => {
  it('returns "0s" for 0 seconds', () => {
    expect(formatDuration(0)).toBe('0s');
  });

  it('returns seconds only for values under 1 minute', () => {
    expect(formatDuration(45)).toBe('45s');
  });

  it('returns minutes only when there are no remaining seconds', () => {
    expect(formatDuration(60)).toBe('1m');
  });

  it('returns combined minutes and seconds', () => {
    expect(formatDuration(90)).toBe('1m 30s');
  });

  it('returns large minute count for 3600 seconds', () => {
    expect(formatDuration(3600)).toBe('60m');
  });
});

// ---------------------------------------------------------------------------
// formatDifficulty
// ---------------------------------------------------------------------------
describe('formatDifficulty', () => {
  const cases: [Difficulty, string][] = [
    ['beginner', 'Beginner'],
    ['intermediate', 'Intermediate'],
    ['advanced', 'Advanced'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatDifficulty(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// formatMuscleGroup
// ---------------------------------------------------------------------------
describe('formatMuscleGroup', () => {
  const cases: [MuscleGroup, string][] = [
    ['chest', 'Chest'],
    ['back', 'Back'],
    ['shoulders', 'Shoulders'],
    ['arms', 'Arms'],
    ['legs', 'Legs'],
    ['core', 'Core'],
    ['full_body', 'Full Body'],
    ['cardio', 'Cardio'],
  ];

  it.each(cases)('formats "%s" as "%s"', (input, expected) => {
    expect(formatMuscleGroup(input)).toBe(expected);
  });
});
