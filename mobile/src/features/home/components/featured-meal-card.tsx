import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { Meal } from '../../../shared/types/meal';
import { formatMealCategory } from '../../../shared/utils/meal-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = {
  meal: Meal;
  onPress: () => void;
};

export default function FeaturedMealCard({ meal, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{meal.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {meal.description}
      </Text>
      <View style={styles.footer}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{formatMealCategory(meal.category)}</Text>
        </View>
        <Text style={styles.meta}>
          {meal.prepTimeMinutes} min · {meal.nutrition.calories} kcal
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
