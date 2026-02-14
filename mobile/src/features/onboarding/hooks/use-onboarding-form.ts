import { createContext, useContext } from 'react';
import type { OnboardingFormData } from '../../../shared/types/profile';

export type OnboardingFormContextValue = {
  formData: OnboardingFormData;
  updateForm: (partial: Partial<OnboardingFormData>) => void;
};

export const OnboardingFormContext = createContext<OnboardingFormContextValue | null>(null);

export function useOnboardingForm(): OnboardingFormContextValue {
  const context = useContext(OnboardingFormContext);
  if (!context) {
    throw new Error('useOnboardingForm must be used within OnboardingNavigator');
  }
  return context;
}
