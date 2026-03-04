import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from '../navigation/onboarding-navigator';
import type { Gender } from '../../../shared/types/profile';
import { useOnboardingForm } from '../hooks/use-onboarding-form';
import {
  validateDisplayName,
  validateDateOfBirth,
  validateGender,
  validateHeight,
  validateWeight,
} from '../../../shared/utils/validation';
import { formatGenderLabel } from '../../../shared/utils/profile-utils';
import StepProgressBar from '../../../shared/components/step-progress-bar';
import FormField from '../../../shared/components/form-field';
import SelectChip from '../../../shared/components/select-chip';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography } from '../../../shared/constants/theme';

const ALL_GENDERS: Gender[] = ['male', 'female', 'prefer_not_to_say'];

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

type Props = NativeStackScreenProps<OnboardingStackParamList, 'BasicInfo'>;

export default function BasicInfoScreen({ navigation }: Props) {
  const { formData, updateForm } = useOnboardingForm();
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  function handleNext() {
    const newErrors: Record<string, string | null> = {
      displayName: validateDisplayName(formData.displayName),
      dateOfBirth: validateDateOfBirth(formData.dateOfBirth),
      gender: validateGender(formData.gender),
      heightCm: validateHeight(formData.heightCm),
      weightKg: validateWeight(formData.weightKg),
    };
    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e !== null);
    if (hasErrors) return;
    navigation.navigate('HealthFlags');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StepProgressBar currentStep={2} totalSteps={4} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>About You</Text>

        <FormField
          label="Display Name"
          placeholder="Your name"
          value={formData.displayName}
          onChangeText={(v) => updateForm({ displayName: v })}
          error={errors.displayName}
          autoCapitalize="words"
        />

        <FormField
          label="Date of Birth"
          placeholder="YYYY-MM-DD"
          value={formData.dateOfBirth}
          onChangeText={(v) => updateForm({ dateOfBirth: formatDateInput(v) })}
          error={errors.dateOfBirth}
          keyboardType="number-pad"
          maxLength={10}
        />

        <Text style={styles.fieldLabel}>Gender</Text>
        <View style={styles.chips}>
          {ALL_GENDERS.map((g) => (
            <SelectChip
              key={g}
              label={formatGenderLabel(g)}
              isSelected={formData.gender === g}
              onPress={() => updateForm({ gender: g })}
            />
          ))}
        </View>
        {errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}

        <View style={styles.row}>
          <View style={styles.halfField}>
            <FormField
              label="Height (cm)"
              placeholder="170"
              value={formData.heightCm}
              onChangeText={(v) => updateForm({ heightCm: v })}
              error={errors.heightCm}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.halfField}>
            <FormField
              label="Weight (kg)"
              placeholder="70"
              value={formData.weightKg}
              onChangeText={(v) => updateForm({ weightKg: v })}
              error={errors.weightKg}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  chips: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  error: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfField: {
    flex: 1,
  },
  footer: {
    padding: spacing.lg,
  },
});
