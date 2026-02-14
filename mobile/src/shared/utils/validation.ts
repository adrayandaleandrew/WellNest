export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must include a number.';
  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): string | null {
  if (!confirmPassword) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null;
}

const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered.',
  'auth/invalid-email': 'Invalid email address.',
  'auth/operation-not-allowed': 'Email/password sign-in is not enabled.',
  'auth/weak-password': 'Password is too weak.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password.',
  'auth/invalid-credential': 'Invalid email or password.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Check your connection.',
};

export function getAuthErrorMessage(errorCode: string): string {
  return firebaseErrorMessages[errorCode] ?? 'An unexpected error occurred. Please try again.';
}

export function validateDisplayName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return 'Name is required.';
  if (trimmed.length < 2) return 'Name must be at least 2 characters.';
  if (trimmed.length > 50) return 'Name must be 50 characters or less.';
  return null;
}

export function validateDateOfBirth(dob: string): string | null {
  if (!dob.trim()) return 'Date of birth is required.';
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dob)) return 'Use format YYYY-MM-DD.';
  const date = new Date(dob);
  if (isNaN(date.getTime())) return 'Invalid date.';
  const now = new Date();
  if (date > now) return 'Date of birth cannot be in the future.';
  const age = now.getFullYear() - date.getFullYear();
  if (age > 120) return 'Please enter a valid date of birth.';
  if (age < 13) return 'You must be at least 13 years old.';
  return null;
}

export function validateHeight(height: string): string | null {
  if (!height.trim()) return 'Height is required.';
  const num = Number(height);
  if (isNaN(num) || num <= 0) return 'Enter a valid height.';
  if (num < 50 || num > 300) return 'Height must be between 50 and 300 cm.';
  return null;
}

export function validateWeight(weight: string): string | null {
  if (!weight.trim()) return 'Weight is required.';
  const num = Number(weight);
  if (isNaN(num) || num <= 0) return 'Enter a valid weight.';
  if (num < 20 || num > 500) return 'Weight must be between 20 and 500 kg.';
  return null;
}

export function validateGoals(goals: string[]): string | null {
  if (goals.length === 0) return 'Select at least one goal.';
  if (goals.length > 3) return 'Select up to 3 goals.';
  return null;
}

export function validateGender(gender: string | null): string | null {
  if (!gender) return 'Please select a gender option.';
  return null;
}

export function validateActivityLevel(level: string | null): string | null {
  if (!level) return 'Please select an activity level.';
  return null;
}
