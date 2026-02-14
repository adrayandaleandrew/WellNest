import { useState, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingFormData } from '../../../shared/types/profile';
import { OnboardingFormContext } from '../hooks/use-onboarding-form';
import GoalSelectionScreen from '../screens/goal-selection-screen';
import BasicInfoScreen from '../screens/basic-info-screen';
import HealthFlagsScreen from '../screens/health-flags-screen';
import ActivityLevelScreen from '../screens/activity-level-screen';

export type OnboardingStackParamList = {
  GoalSelection: undefined;
  BasicInfo: undefined;
  HealthFlags: undefined;
  ActivityLevel: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const INITIAL_FORM: OnboardingFormData = {
  goals: [],
  displayName: '',
  dateOfBirth: '',
  gender: 'prefer_not_to_say',
  heightCm: '',
  weightKg: '',
  healthFlags: ['none'],
  activityLevel: null,
};

export default function OnboardingNavigator() {
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM);

  const updateForm = useCallback((partial: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <OnboardingFormContext.Provider value={{ formData, updateForm }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GoalSelection" component={GoalSelectionScreen} />
        <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
        <Stack.Screen name="HealthFlags" component={HealthFlagsScreen} />
        <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
      </Stack.Navigator>
    </OnboardingFormContext.Provider>
  );
}
