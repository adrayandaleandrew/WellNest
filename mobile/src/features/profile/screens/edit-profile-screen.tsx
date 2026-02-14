import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import type { Goal, HealthFlag, ActivityLevel, Gender } from '../../../shared/types/profile';
import { useProfile } from '../../../shared/contexts/profile-context';
import {
  validateDisplayName,
  validateDateOfBirth,
  validateGender,
  validateHeight,
  validateWeight,
  validateGoals,
  validateActivityLevel,
} from '../../../shared/utils/validation';
import {
  formatGoalLabel,
  formatHealthFlagLabel,
  formatActivityLevelLabel,
  formatGenderLabel,
} from '../../../shared/utils/profile-utils';
import FormField from '../../../shared/components/form-field';
import SelectChip from '../../../shared/components/select-chip';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography } from '../../../shared/constants/theme';

function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
}

const ALL_GOALS: Goal[] = [
  'lose_weight', 'build_muscle', 'improve_endurance',
  'eat_healthier', 'reduce_stress', 'improve_sleep',
];
const ALL_GENDERS: Gender[] = ['male', 'female', 'prefer_not_to_say'];
const ALL_FLAGS: HealthFlag[] = [
  'none', 'diabetes', 'hypertension', 'heart_condition',
  'asthma', 'joint_issues', 'back_pain', 'pregnancy',
];
const ALL_LEVELS: ActivityLevel[] = [
  'sedentary', 'lightly_active', 'moderately_active', 'very_active',
];

type Props = NativeStackScreenProps<MainStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const { profile, updateProfile } = useProfile();

  const [displayName, setDisplayName] = useState(profile?.displayName ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(profile?.dateOfBirth ?? '');
  const [gender, setGender] = useState<Gender>(profile?.gender ?? 'prefer_not_to_say');
  const [heightCm, setHeightCm] = useState(String(profile?.heightCm ?? ''));
  const [weightKg, setWeightKg] = useState(String(profile?.weightKg ?? ''));
  const [goals, setGoals] = useState<Goal[]>(profile?.goals ?? []);
  const [healthFlags, setHealthFlags] = useState<HealthFlag[]>(profile?.healthFlags ?? ['none']);
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(
    profile?.activityLevel ?? null,
  );
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleGoal(goal: Goal) {
    setGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : prev.length < 3
          ? [...prev, goal]
          : prev,
    );
  }

  function toggleFlag(flag: HealthFlag) {
    if (flag === 'none') {
      setHealthFlags(['none']);
      return;
    }
    setHealthFlags((prev) => {
      const filtered = prev.filter((f) => f !== 'none');
      const updated = filtered.includes(flag)
        ? filtered.filter((f) => f !== flag)
        : [...filtered, flag];
      return updated.length === 0 ? ['none'] : updated;
    });
  }

  async function handleSave() {
    const newErrors: Record<string, string | null> = {
      displayName: validateDisplayName(displayName),
      dateOfBirth: validateDateOfBirth(dateOfBirth),
      gender: validateGender(gender),
      heightCm: validateHeight(heightCm),
      weightKg: validateWeight(weightKg),
      goals: validateGoals(goals),
      activityLevel: validateActivityLevel(activityLevel),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e !== null)) return;

    setIsSubmitting(true);
    try {
      await updateProfile({
        displayName: displayName.trim(),
        dateOfBirth,
        gender,
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        goals,
        healthFlags,
        activityLevel: activityLevel!,
      });
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <FormField
        label="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        error={errors.displayName}
        autoCapitalize="words"
      />
      <FormField
        label="Date of Birth"
        placeholder="YYYY-MM-DD"
        value={dateOfBirth}
        onChangeText={(v) => setDateOfBirth(formatDateInput(v))}
        error={errors.dateOfBirth}
        keyboardType="number-pad"
        maxLength={10}
      />

      <Text style={styles.sectionLabel}>Gender</Text>
      <View style={styles.chips}>
        {ALL_GENDERS.map((g) => (
          <SelectChip
            key={g}
            label={formatGenderLabel(g)}
            isSelected={gender === g}
            onPress={() => setGender(g)}
          />
        ))}
      </View>
      {errors.gender ? <Text style={styles.error}>{errors.gender}</Text> : null}

      <View style={styles.row}>
        <View style={styles.halfField}>
          <FormField
            label="Height (cm)"
            value={heightCm}
            onChangeText={setHeightCm}
            error={errors.heightCm}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfField}>
          <FormField
            label="Weight (kg)"
            value={weightKg}
            onChangeText={setWeightKg}
            error={errors.weightKg}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.sectionLabel}>Goals (1-3)</Text>
      <View style={styles.chips}>
        {ALL_GOALS.map((goal) => (
          <SelectChip
            key={goal}
            label={formatGoalLabel(goal)}
            isSelected={goals.includes(goal)}
            onPress={() => toggleGoal(goal)}
          />
        ))}
      </View>
      {errors.goals ? <Text style={styles.error}>{errors.goals}</Text> : null}

      <Text style={styles.sectionLabel}>Health Considerations</Text>
      <View style={styles.chips}>
        {ALL_FLAGS.map((flag) => (
          <SelectChip
            key={flag}
            label={formatHealthFlagLabel(flag)}
            isSelected={healthFlags.includes(flag)}
            onPress={() => toggleFlag(flag)}
          />
        ))}
      </View>

      <Text style={styles.sectionLabel}>Activity Level</Text>
      <View style={styles.chips}>
        {ALL_LEVELS.map((level) => (
          <SelectChip
            key={level}
            label={formatActivityLevelLabel(level)}
            isSelected={activityLevel === level}
            onPress={() => setActivityLevel(level)}
          />
        ))}
      </View>
      {errors.activityLevel ? <Text style={styles.error}>{errors.activityLevel}</Text> : null}

      <View style={styles.buttonContainer}>
        <PrimaryButton title="Save Changes" onPress={handleSave} isLoading={isSubmitting} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
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
  buttonContainer: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
