import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { Workout } from '../../../shared/types/workout';
import { formatDifficulty, formatMuscleGroup } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  workout: Workout;
  onPress: () => void;
};

export default function WorkoutCard({ workout, onPress }: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${workout.name}, ${formatDifficulty(workout.difficulty)}, ${workout.durationMinutes} minutes`}
    >
      <Text style={styles.name}>{workout.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {workout.description}
      </Text>
      <View style={styles.metaRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatDifficulty(workout.difficulty)}</Text>
        </View>
        <Text style={styles.metaText}>{workout.durationMinutes} min</Text>
      </View>
      <View style={styles.muscleRow}>
        {workout.muscleGroups.map((group) => (
          <View key={group} style={styles.muscleChip}>
            <Text style={styles.muscleChipText}>{formatMuscleGroup(group)}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
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
});
