import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useWorkoutSession } from '../hooks/use-workout-session';
import RestTimer from '../components/rest-timer';
import { formatDuration } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutMode'>;

export default function WorkoutModeScreen({ route, navigation }: Props) {
  const { workout } = route.params;
  const session = useWorkoutSession(workout);

  const handleBack = () => {
    Alert.alert(
      'Quit Workout?',
      'Your progress will be lost. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Quit', style: 'destructive', onPress: () => navigation.goBack() },
      ],
    );
  };

  if (session.phase === 'complete') {
    const summary = session.getSummary();
    navigation.replace('WorkoutComplete', { summary, workoutId: workout.id });
    return null;
  }

  if (session.phase === 'rest') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleBack}>
            <Text style={styles.quitText}>Quit</Text>
          </Pressable>
          <Text style={styles.progress}>
            Exercise {session.currentExerciseIndex + 1}/{session.totalExercises}
          </Text>
        </View>
        <RestTimer
          seconds={session.currentExercise.restSeconds}
          onComplete={session.onRestComplete}
        />
      </SafeAreaView>
    );
  }

  const exercise = session.currentExercise;
  const workLabel = exercise.reps
    ? `${exercise.reps} reps`
    : formatDuration(exercise.durationSeconds!);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <Text style={styles.quitText}>Quit</Text>
        </Pressable>
        <Text style={styles.progress}>
          Exercise {session.currentExerciseIndex + 1}/{session.totalExercises}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.setInfo}>
          Set {session.currentSet} of {exercise.sets}
        </Text>
        <Text style={styles.workLabel}>{workLabel}</Text>
        <Text style={styles.description}>{exercise.description}</Text>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.completeButton} onPress={session.completeSet}>
          <Text style={styles.completeButtonText}>Complete Set</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  quitText: {
    fontSize: typography.fontSize.md,
    color: colors.error,
    fontWeight: typography.fontWeight.semibold,
  },
  progress: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  exerciseName: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  setInfo: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
  },
  workLabel: {
    fontSize: 48,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  completeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  completeButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
