import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import type { MealCategory } from '../../../shared/types/meal';
import { formatMealCategory } from '../../../shared/utils/meal-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

const CATEGORIES: MealCategory[] = ['breakfast', 'lunch', 'dinner', 'snack'];

type Props = {
  selected: MealCategory | null;
  onSelect: (category: MealCategory | null) => void;
};

export default function FilterChips({ selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* "All" chip */}
      <Pressable
        style={[styles.chip, selected === null && styles.chipSelected]}
        onPress={() => onSelect(null)}
      >
        <Text style={[styles.chipText, selected === null && styles.chipTextSelected]}>All</Text>
      </Pressable>

      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat;
        return (
          <Pressable
            key={cat}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(cat)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {formatMealCategory(cat)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    // Ensure 44px min touch target height
    minHeight: 44,
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  chipTextSelected: {
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
});
