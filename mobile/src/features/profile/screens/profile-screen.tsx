import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useProfile } from '../../../shared/contexts/profile-context';
import {
  formatGoalLabel,
  formatHealthFlagLabel,
  formatActivityLevelLabel,
  formatGenderLabel,
} from '../../../shared/utils/profile-utils';
import PrimaryButton from '../../../shared/components/primary-button';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const { profile } = useProfile();

  if (!profile) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileField label="Name" value={profile.displayName} />
      <ProfileField label="Email" value={profile.email} />
      <ProfileField label="Date of Birth" value={profile.dateOfBirth} />
      <ProfileField label="Gender" value={formatGenderLabel(profile.gender)} />
      <ProfileField label="Height" value={`${profile.heightCm} cm`} />
      <ProfileField label="Weight" value={`${profile.weightKg} kg`} />
      <ProfileField
        label="Goals"
        value={profile.goals.map(formatGoalLabel).join(', ')}
      />
      <ProfileField
        label="Health Considerations"
        value={profile.healthFlags.map(formatHealthFlagLabel).join(', ')}
      />
      <ProfileField
        label="Activity Level"
        value={formatActivityLevelLabel(profile.activityLevel)}
      />
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
      </View>
    </ScrollView>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
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
  field: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  fieldValue: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
});
