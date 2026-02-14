import { StyleSheet, Text, View } from 'react-native';
import type { Exercise } from '../../../shared/types/workout';
import { formatDuration } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  exercise: Exercise;
  index: number;
};

export default function ExerciseItem({ exercise, index }: Props) {
  const workLabel = exercise.reps
    ? `${exercise.reps} reps`
    : `${formatDuration(exercise.durationSeconds!)}`;

  return (
    <View style={styles.container}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.detail}>
          {exercise.sets} sets x {workLabel} | {exercise.restSeconds}s rest
        </Text>
        <Text style={styles.description}>{exercise.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  indexText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryDark,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  detail: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
