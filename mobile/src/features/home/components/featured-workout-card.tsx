import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { Workout } from '../../../shared/types/workout';
import { formatDifficulty } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  workout: Workout;
  onPress: () => void;
};

export default function FeaturedWorkoutCard({ workout, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{workout.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {workout.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatDifficulty(workout.difficulty)}</Text>
        </View>
        <Text style={styles.meta}>
          {workout.durationMinutes} min · {workout.exercises.length} exercises
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
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
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  meta: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});
