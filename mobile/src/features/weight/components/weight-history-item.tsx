import { StyleSheet, Text, View } from 'react-native';
import type { WeightEntry } from '../../../shared/types/weight';
import { colors, spacing, typography } from '../../../shared/constants/theme';

type Props = {
  entry: WeightEntry;
  previousWeight?: number;
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function WeightHistoryItem({ entry, previousWeight }: Props) {
  const diff =
    previousWeight !== undefined ? +(entry.weightKg - previousWeight).toFixed(1) : null;

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.date}>{formatDate(entry.date)}</Text>
        <Text style={styles.time}>{formatTime(entry.loggedAt)}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.weight}>{entry.weightKg} kg</Text>
        {diff !== null && diff !== 0 && (
          <Text style={[styles.diff, diff > 0 ? styles.diffUp : styles.diffDown]}>
            {diff > 0 ? '+' : ''}
            {diff} kg
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  date: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  },
  time: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  weight: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  diff: {
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  diffUp: {
    color: colors.error,
  },
  diffDown: {
    color: colors.success,
  },
});
