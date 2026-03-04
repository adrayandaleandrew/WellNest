import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../navigation/onboarding-navigator';
import type { ActivityLevel } from '../../../shared/types/profile';
import { useOnboardingForm } from '../hooks/use-onboarding-form';
import { useProfile } from '../../../shared/contexts/profile-context';
import { validateActivityLevel } from '../../../shared/utils/validation';
import { formatActivityLevelLabel } from '../../../shared/utils/profile-utils';
import StepProgressBar from '../../../shared/components/step-progress-bar';
import SelectChip from '../../../shared/components/select-chip';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography } from '../../../shared/constants/theme';

const ALL_LEVELS: ActivityLevel[] = [
  'sedentary',
  'lightly_active',
  'moderately_active',
  'very_active',
];

const LEVEL_DESCRIPTIONS: Record<ActivityLevel, string> = {
  sedentary: 'Little or no exercise',
  lightly_active: 'Light exercise 1-3 days/week',
  moderately_active: 'Moderate exercise 3-5 days/week',
  very_active: 'Hard exercise 6-7 days/week',
};

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ActivityLevel'>;

export default function ActivityLevelScreen(_props: Props) {
  const { formData, updateForm } = useOnboardingForm();
  const { saveOnboarding } = useProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function selectLevel(level: ActivityLevel) {
    if (isSubmitting) return;
    updateForm({ activityLevel: level });
    setError(null);
  }

  async function handleComplete() {
    const validationError = validateActivityLevel(formData.activityLevel);
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsSubmitting(true);
    try {
      await saveOnboarding(formData);
    } catch (err) {
      console.error('Onboarding save error:', err);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StepProgressBar currentStep={4} totalSteps={4} />
      <ScrollView contentContainerStyle={styles.content} pointerEvents={isSubmitting ? 'none' : 'auto'}>
        <Text style={styles.title}>Activity Level</Text>
        <Text style={styles.subtitle}>How active are you currently?</Text>
        <View style={styles.chips}>
          {ALL_LEVELS.map((level) => (
            <SelectChip
              key={level}
              label={formatActivityLevelLabel(level)}
              subtitle={LEVEL_DESCRIPTIONS[level]}
              isSelected={formData.activityLevel === level}
              onPress={() => selectLevel(level)}
            />
          ))}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Complete"
          onPress={handleComplete}
          isLoading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  chips: {
    gap: spacing.sm,
  },
  error: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.md,
  },
  footer: {
    padding: spacing.lg,
  },
});
