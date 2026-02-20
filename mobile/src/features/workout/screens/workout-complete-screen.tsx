import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useAuth } from '../../../shared/contexts/auth-context';
import { useStreak } from '../../../shared/contexts/streak-context';
import { saveWorkoutLog } from '../../../shared/services/workout-service';
import { formatDuration } from '../../../shared/utils/workout-utils';
import type { WorkoutLog } from '../../../shared/types/workout';
import ErrorState from '../../../shared/components/error-state';
import { FadeInView } from '../../../shared/components/animated-views';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutComplete'>;

export default function WorkoutCompleteScreen({ route, navigation }: Props) {
  const { summary, workoutId } = route.params;
  const { user } = useAuth();
  const { logToday } = useStreak();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDone = async () => {
    if (!user) return;
    setIsSaving(true);
    setError(null);
    try {
      const log: WorkoutLog = {
        workoutId,
        workoutName: summary.workoutName,
        exercisesCompleted: summary.exercisesCompleted,
        exercisesTotal: summary.exercisesTotal,
        durationSeconds: summary.durationSeconds,
        completedAt: new Date().toISOString(),
      };
      // Save detailed workout log and update today's daily log + streak in parallel
      await Promise.all([saveWorkoutLog(user.uid, log), logToday('workout')]);
      navigation.popToTop();
    } catch {
      setError('Failed to save workout log. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView duration={500} style={styles.fadeWrapper}>
        <View style={styles.body}>
          <Text style={styles.emoji}>&#127881;</Text>
          <Text style={styles.title}>Workout Complete!</Text>
          <Text style={styles.workoutName}>{summary.workoutName}</Text>

          <View
            style={styles.statsRow}
            accessibilityLiveRegion="polite"
          >
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {summary.exercisesCompleted}/{summary.exercisesTotal}
              </Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{formatDuration(summary.durationSeconds)}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>

          {error ? <ErrorState compact message={error} /> : null}
        </View>
      </FadeInView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.doneButton, isSaving && styles.doneButtonDisabled]}
          onPress={handleDone}
          disabled={isSaving}
          accessibilityRole="button"
          accessibilityLabel="Done"
          accessibilityState={{ disabled: isSaving, busy: isSaving }}
        >
          {isSaving ? (
            <ActivityIndicator color={colors.text.inverse} />
          ) : (
            <Text style={styles.doneButtonText}>Done</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  workoutName: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    minWidth: 130,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  doneButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  doneButtonDisabled: {
    opacity: 0.6,
  },
  doneButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  fadeWrapper: {
    flex: 1,
  },
});
