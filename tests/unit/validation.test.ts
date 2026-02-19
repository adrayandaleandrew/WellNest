import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateDisplayName,
  validateDateOfBirth,
  validateHeight,
  validateWeight,
  validateGoals,
  validateGender,
  validateActivityLevel,
  getAuthErrorMessage,
} from '@mobile/shared/utils/validation';

// ---------------------------------------------------------------------------
// validateEmail
// ---------------------------------------------------------------------------
describe('validateEmail', () => {
  it('returns error for empty string', () => {
    expect(validateEmail('')).toBe('Email is required.');
  });

  it('returns error for whitespace-only string', () => {
    expect(validateEmail('   ')).toBe('Email is required.');
  });

  it('returns error for missing @ symbol', () => {
    expect(validateEmail('notanemail.com')).toBe('Enter a valid email address.');
  });

  it('returns error for missing domain', () => {
    expect(validateEmail('user@')).toBe('Enter a valid email address.');
  });

  it('returns null for valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });

  it('returns null for email with subdomain', () => {
    expect(validateEmail('user@mail.example.com')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validatePassword
// ---------------------------------------------------------------------------
describe('validatePassword', () => {
  it('returns error for empty password', () => {
    expect(validatePassword('')).toBe('Password is required.');
  });

  it('returns error when shorter than 8 characters', () => {
    expect(validatePassword('Ab1!')).toBe('Password must be at least 8 characters.');
  });

  it('returns error when no uppercase letter', () => {
    expect(validatePassword('lowercase1')).toBe('Password must include an uppercase letter.');
  });

  it('returns error when no lowercase letter', () => {
    expect(validatePassword('UPPERCASE1')).toBe('Password must include a lowercase letter.');
  });

  it('returns error when no number', () => {
    expect(validatePassword('NoNumberHere')).toBe('Password must include a number.');
  });

  it('returns null for a valid password', () => {
    expect(validatePassword('ValidPass1')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateConfirmPassword
// ---------------------------------------------------------------------------
describe('validateConfirmPassword', () => {
  it('returns error when confirm is empty', () => {
    expect(validateConfirmPassword('Password1', '')).toBe('Please confirm your password.');
  });

  it('returns error when passwords do not match', () => {
    expect(validateConfirmPassword('Password1', 'Password2')).toBe('Passwords do not match.');
  });

  it('returns null when passwords match', () => {
    expect(validateConfirmPassword('Password1', 'Password1')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateDisplayName
// ---------------------------------------------------------------------------
describe('validateDisplayName', () => {
  it('returns error for empty name', () => {
    expect(validateDisplayName('')).toBe('Name is required.');
  });

  it('returns error for single character', () => {
    expect(validateDisplayName('A')).toBe('Name must be at least 2 characters.');
  });

  it('returns error for name exceeding 50 characters', () => {
    expect(validateDisplayName('A'.repeat(51))).toBe('Name must be 50 characters or less.');
  });

  it('returns null for a valid 2-character name', () => {
    expect(validateDisplayName('Al')).toBeNull();
  });

  it('returns null for a valid 50-character name', () => {
    expect(validateDisplayName('A'.repeat(50))).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateDateOfBirth
// ---------------------------------------------------------------------------
describe('validateDateOfBirth', () => {
  it('returns error for empty string', () => {
    expect(validateDateOfBirth('')).toBe('Date of birth is required.');
  });

  it('returns error for wrong format (MM/DD/YYYY)', () => {
    expect(validateDateOfBirth('01/15/2000')).toBe('Use format YYYY-MM-DD.');
  });

  it('returns error for future date', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dob = tomorrow.toISOString().slice(0, 10);
    expect(validateDateOfBirth(dob)).toBe('Date of birth cannot be in the future.');
  });

  it('returns error when age is under 13', () => {
    const birthYear = new Date().getFullYear() - 12;
    expect(validateDateOfBirth(`${birthYear}-06-15`)).toBe('You must be at least 13 years old.');
  });

  it('returns error when age exceeds 120', () => {
    const birthYear = new Date().getFullYear() - 121;
    expect(validateDateOfBirth(`${birthYear}-01-01`)).toBe('Please enter a valid date of birth.');
  });

  it('returns null for a valid 25-year-old DOB', () => {
    const birthYear = new Date().getFullYear() - 25;
    expect(validateDateOfBirth(`${birthYear}-06-15`)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateHeight
// ---------------------------------------------------------------------------
describe('validateHeight', () => {
  it('returns error for non-numeric input', () => {
    expect(validateHeight('abc')).toBe('Enter a valid height.');
  });

  it('returns error for height below minimum (49 cm)', () => {
    expect(validateHeight('49')).toBe('Height must be between 50 and 300 cm.');
  });

  it('returns error for height above maximum (301 cm)', () => {
    expect(validateHeight('301')).toBe('Height must be between 50 and 300 cm.');
  });

  it('returns null for valid height (170 cm)', () => {
    expect(validateHeight('170')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateWeight
// ---------------------------------------------------------------------------
describe('validateWeight', () => {
  it('returns error for non-numeric input', () => {
    expect(validateWeight('abc')).toBe('Enter a valid weight.');
  });

  it('returns error for weight below minimum (19 kg)', () => {
    expect(validateWeight('19')).toBe('Weight must be between 20 and 500 kg.');
  });

  it('returns error for weight above maximum (501 kg)', () => {
    expect(validateWeight('501')).toBe('Weight must be between 20 and 500 kg.');
  });

  it('returns null for valid weight (70 kg)', () => {
    expect(validateWeight('70')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateGoals
// ---------------------------------------------------------------------------
describe('validateGoals', () => {
  it('returns error for empty goals array', () => {
    expect(validateGoals([])).toBe('Select at least one goal.');
  });

  it('returns error when more than 3 goals selected', () => {
    expect(validateGoals(['a', 'b', 'c', 'd'])).toBe('Select up to 3 goals.');
  });

  it('returns null for 1 goal', () => {
    expect(validateGoals(['lose_weight'])).toBeNull();
  });

  it('returns null for 3 goals', () => {
    expect(validateGoals(['lose_weight', 'build_muscle', 'eat_healthier'])).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateGender
// ---------------------------------------------------------------------------
describe('validateGender', () => {
  it('returns error for null', () => {
    expect(validateGender(null)).toBe('Please select a gender option.');
  });

  it('returns error for empty string', () => {
    expect(validateGender('')).toBe('Please select a gender option.');
  });

  it('returns null for a valid gender value', () => {
    expect(validateGender('male')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// validateActivityLevel
// ---------------------------------------------------------------------------
describe('validateActivityLevel', () => {
  it('returns error for null', () => {
    expect(validateActivityLevel(null)).toBe('Please select an activity level.');
  });

  it('returns error for empty string', () => {
    expect(validateActivityLevel('')).toBe('Please select an activity level.');
  });

  it('returns null for a valid activity level', () => {
    expect(validateActivityLevel('sedentary')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// getAuthErrorMessage
// ---------------------------------------------------------------------------
describe('getAuthErrorMessage', () => {
  it('maps auth/user-not-found', () => {
    expect(getAuthErrorMessage('auth/user-not-found')).toBe('No account found with this email.');
  });

  it('maps auth/wrong-password', () => {
    expect(getAuthErrorMessage('auth/wrong-password')).toBe('Incorrect password.');
  });

  it('maps auth/email-already-in-use', () => {
    expect(getAuthErrorMessage('auth/email-already-in-use')).toBe('This email is already registered.');
  });

  it('maps auth/invalid-email', () => {
    expect(getAuthErrorMessage('auth/invalid-email')).toBe('Invalid email address.');
  });

  it('returns fallback for unknown error code', () => {
    expect(getAuthErrorMessage('auth/unknown-error')).toBe(
      'An unexpected error occurred. Please try again.',
    );
  });
});
