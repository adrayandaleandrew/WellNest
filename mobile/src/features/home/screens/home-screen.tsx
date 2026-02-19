import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useProfile } from '../../../shared/contexts/profile-context';
import { useStreak } from '../../../shared/contexts/streak-context';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { profile } = useProfile();
  const { streak, hasLoggedToday, isLoadingStreak } = useStreak();

  const firstName = profile?.displayName?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey, {firstName} 👋</Text>
        <Text style={styles.subtitle}>Let's keep the momentum going.</Text>
      </View>

      {/* Streak card */}
      <View style={styles.streakCard}>
        {isLoadingStreak ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <>
            <View style={styles.streakRow}>
              <Ionicons name="flame" size={32} color={colors.secondary} />
              <Text style={styles.streakCount}>{streak?.currentStreak ?? 0}</Text>
              <Text style={styles.streakLabel}>
                {(streak?.currentStreak ?? 0) === 1 ? 'day streak' : 'day streak'}
              </Text>
            </View>
            <Text style={styles.streakSub}>
              {hasLoggedToday
                ? 'You\'ve already logged today — great work!'
                : 'Complete a workout to keep your streak alive.'}
            </Text>
            {(streak?.longestStreak ?? 0) > 0 && (
              <Text style={styles.streakBest}>
                Personal best: {streak!.longestStreak} {streak!.longestStreak === 1 ? 'day' : 'days'}
              </Text>
            )}
          </>
        )}
      </View>

      {/* Quick actions */}
      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('WorkoutList')}>
          <Text style={styles.primaryButtonText}>Start a Workout</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.secondaryButtonText}>My Profile</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.secondaryButtonText}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    minHeight: 96,
    justifyContent: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  streakCount: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  streakLabel: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  streakSub: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  streakBest: {
    fontSize: typography.fontSize.xs,
    color: colors.text.disabled,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  secondaryButton: {
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
