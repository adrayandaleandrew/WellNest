import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import ExerciseItem from '../components/exercise-item';
import { formatDifficulty, formatMuscleGroup } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutDetail'>;

export default function WorkoutDetailScreen({ route, navigation }: Props) {
  const { workout } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.name}>{workout.name}</Text>
        <Text style={styles.description}>{workout.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatDifficulty(workout.difficulty)}</Text>
          </View>
          <Text style={styles.metaText}>{workout.durationMinutes} min</Text>
          <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
        </View>

        <View style={styles.muscleRow}>
          {workout.muscleGroups.map((group) => (
            <View key={group} style={styles.muscleChip}>
              <Text style={styles.muscleChipText}>{formatMuscleGroup(group)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Exercises</Text>
        {workout.exercises.map((exercise, index) => (
          <ExerciseItem key={exercise.name} exercise={exercise} index={index} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate('WorkoutMode', { workout })}
          accessibilityRole="button"
          accessibilityLabel="Start Workout"
        >
          <Text style={styles.startButtonText}>Start Workout</Text>
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
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  name: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primaryDark,
  },
  metaText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  muscleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  muscleChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  muscleChipText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
