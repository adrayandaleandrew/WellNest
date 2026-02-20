import { StyleSheet, Text, View } from 'react-native';
import type { WeightEntry } from '../../../shared/types/weight';
import EmptyState from '../../../shared/components/empty-state';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

const CHART_HEIGHT = 140;
const MAX_BARS = 7;

type Props = {
  entries: WeightEntry[];
};

export default function WeightChart({ entries }: Props) {
  const visible = entries.slice(-MAX_BARS);

  if (visible.length === 0) {
    return (
      <EmptyState
        icon="trending-up-outline"
        title="No data yet"
        message="Log your first weight to see the chart."
      />
    );
  }

  const weights = visible.map((e) => e.weightKg);
  const minW = Math.min(...weights);
  const maxW = Math.max(...weights);
  const range = maxW - minW;

  // Normalize bar height to 20%–95% of chart height.
  // When all values are equal, bars render at 60%.
  function barHeight(w: number): number {
    if (range === 0) return CHART_HEIGHT * 0.6;
    return CHART_HEIGHT * (0.2 + ((w - minW) / range) * 0.75);
  }

  function formatDate(dateStr: string): string {
    const [, month, day] = dateStr.split('-').map(Number);
    return `${month}/${day}`;
  }

  return (
    <View style={styles.container}>
      {/* Y-axis min/max labels */}
      <View style={styles.yAxis}>
        <Text style={styles.yLabel}>{maxW}</Text>
        <Text style={styles.yLabel}>{minW}</Text>
      </View>

      {/* Bar area */}
      <View style={[styles.barsArea, { height: CHART_HEIGHT + 40 }]}>
        {visible.map((entry, i) => (
          <View key={entry.id ?? i} style={styles.barCol}>
            <Text style={styles.weightLabel}>{entry.weightKg}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.bar, { height: barHeight(entry.weightKg) }]} />
            </View>
            <Text style={styles.dateLabel}>{formatDate(entry.date)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingBottom: 24, // align with bar top/bottom
    paddingTop: 16,
    marginRight: spacing.xs,
  },
  yLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    textAlign: 'right',
    width: 36,
  },
  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barCol: {
    alignItems: 'center',
    flex: 1,
  },
  weightLabel: {
    fontSize: 9,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  barTrack: {
    height: CHART_HEIGHT,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 18,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  dateLabel: {
    fontSize: 9,
    color: colors.text.secondary,
    marginTop: 4,
  },
});
