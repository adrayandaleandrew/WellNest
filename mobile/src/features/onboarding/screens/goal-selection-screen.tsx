import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../navigation/onboarding-navigator';
import type { Goal } from '../../../shared/types/profile';
import { useOnboardingForm } from '../hooks/use-onboarding-form';
import { validateGoals } from '../../../shared/utils/validation';
import { formatGoalLabel } from '../../../shared/utils/profile-utils';
import StepProgressBar from '../../../shared/components/step-progress-bar';
import SelectChip from '../../../shared/components/select-chip';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography } from '../../../shared/constants/theme';
import { useState } from 'react';

const ALL_GOALS: Goal[] = [
  'lose_weight',
  'build_muscle',
  'improve_endurance',
  'eat_healthier',
  'reduce_stress',
  'improve_sleep',
];

type Props = NativeStackScreenProps<OnboardingStackParamList, 'GoalSelection'>;

export default function GoalSelectionScreen({ navigation }: Props) {
  const { formData, updateForm } = useOnboardingForm();
  const [error, setError] = useState<string | null>(null);

  function toggleGoal(goal: Goal) {
    const current = formData.goals;
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : current.length < 3
        ? [...current, goal]
        : current;
    updateForm({ goals: updated });
    setError(null);
  }

  function handleNext() {
    const validationError = validateGoals(formData.goals);
    if (validationError) {
      setError(validationError);
      return;
    }
    navigation.navigate('BasicInfo');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StepProgressBar currentStep={1} totalSteps={4} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>What are your goals?</Text>
        <Text style={styles.subtitle}>Select 1 to 3 goals</Text>
        <View style={styles.chips}>
          {ALL_GOALS.map((goal) => (
            <SelectChip
              key={goal}
              label={formatGoalLabel(goal)}
              isSelected={formData.goals.includes(goal)}
              onPress={() => toggleGoal(goal)}
            />
          ))}
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton title="Next" onPress={handleNext} />
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
