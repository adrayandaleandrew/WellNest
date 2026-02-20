import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { Meal } from '../../../shared/types/meal';
import { formatMealCategory, formatDietaryTag } from '../../../shared/utils/meal-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  meal: Meal;
  onPress: () => void;
};

export default function MealCard({ meal, onPress }: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${meal.name}, ${meal.prepTimeMinutes} minutes prep, ${meal.nutrition.calories} calories`}
    >
      <Text style={styles.name}>{meal.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {meal.description}
      </Text>
      <View style={styles.metaRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatMealCategory(meal.category)}</Text>
        </View>
        <Text style={styles.metaText}>{meal.prepTimeMinutes} min</Text>
        <Text style={styles.metaText}>{meal.nutrition.calories} kcal</Text>
      </View>
      <View style={styles.tagRow}>
        {meal.dietaryTags.map((tag) => (
          <View key={tag} style={styles.tagChip}>
            <Text style={styles.tagChipText}>{formatDietaryTag(tag)}</Text>
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
    lineHeight: 20,
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
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  tagChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagChipText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
});
