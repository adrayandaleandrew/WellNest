import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  glasses: number;
  maxGlasses: number;
  onAdd: () => void;
  onRemove: () => void;
};

export default function WaterTracker({ glasses, maxGlasses, onAdd, onRemove }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="water" size={18} color={colors.primary} />
          <Text style={styles.title}>Water Today</Text>
        </View>
        <Text style={styles.count}>{glasses} / {maxGlasses} glasses</Text>
      </View>

      {/* Visual indicator — filled vs empty drops */}
      <View style={styles.dropsRow}>
        {Array.from({ length: maxGlasses }).map((_, i) => (
          <Ionicons
            key={i}
            name={i < glasses ? 'water' : 'water-outline'}
            size={26}
            color={i < glasses ? colors.primary : colors.border}
          />
        ))}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Pressable
          style={[styles.controlButton, glasses === 0 && styles.controlButtonDisabled]}
          onPress={onRemove}
          disabled={glasses === 0}
          accessibilityLabel="Remove one glass"
        >
          <Ionicons
            name="remove"
            size={22}
            color={glasses === 0 ? colors.text.disabled : colors.primary}
          />
        </Pressable>
        <Pressable
          style={[styles.controlButton, glasses === maxGlasses && styles.controlButtonDisabled]}
          onPress={onAdd}
          disabled={glasses === maxGlasses}
          accessibilityLabel="Add one glass"
        >
          <Ionicons
            name="add"
            size={22}
            color={glasses === maxGlasses ? colors.text.disabled : colors.primary}
          />
        </Pressable>
      </View>
    </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  count: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  dropsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  controls: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  controlButton: {
    flex: 1,
    height: 44, // 44px touch target
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonDisabled: {
    borderColor: colors.border,
  },
});
