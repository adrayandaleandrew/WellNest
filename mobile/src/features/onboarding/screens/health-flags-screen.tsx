import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../navigation/onboarding-navigator';
import type { HealthFlag } from '../../../shared/types/profile';
import { useOnboardingForm } from '../hooks/use-onboarding-form';
import { formatHealthFlagLabel } from '../../../shared/utils/profile-utils';
import StepProgressBar from '../../../shared/components/step-progress-bar';
import SelectChip from '../../../shared/components/select-chip';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography } from '../../../shared/constants/theme';

const ALL_FLAGS: HealthFlag[] = [
  'none',
  'diabetes',
  'hypertension',
  'heart_condition',
  'asthma',
  'joint_issues',
  'back_pain',
  'pregnancy',
];

type Props = NativeStackScreenProps<OnboardingStackParamList, 'HealthFlags'>;

export default function HealthFlagsScreen({ navigation }: Props) {
  const { formData, updateForm } = useOnboardingForm();

  function toggleFlag(flag: HealthFlag) {
    if (flag === 'none') {
      updateForm({ healthFlags: ['none'] });
      return;
    }
    const current = formData.healthFlags.filter((f) => f !== 'none');
    const updated = current.includes(flag)
      ? current.filter((f) => f !== flag)
      : [...current, flag];
    updateForm({ healthFlags: updated.length === 0 ? ['none'] : updated });
  }

  function handleNext() {
    navigation.navigate('ActivityLevel');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StepProgressBar currentStep={3} totalSteps={4} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Health Considerations</Text>
        <Text style={styles.subtitle}>
          Select any conditions we should know about
        </Text>
        <View style={styles.chips}>
          {ALL_FLAGS.map((flag) => (
            <SelectChip
              key={flag}
              label={formatHealthFlagLabel(flag)}
              isSelected={formData.healthFlags.includes(flag)}
              onPress={() => toggleFlag(flag)}
            />
          ))}
        </View>
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
  footer: {
    padding: spacing.lg,
  },
});
