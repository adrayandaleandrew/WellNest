import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import IngredientItem from '../components/ingredient-item';
import { formatMealCategory, formatDietaryTag } from '../../../shared/utils/meal-utils';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'MealDetail'>;

export default function MealDetailScreen({ route, navigation }: Props) {
  const { meal } = route.params;

  // Set the header title to the specific meal name (fallback 'Meal Details' stays in root-navigator.tsx)
  useEffect(() => {
    navigation.setOptions({ title: meal.name });
  }, [meal.name, navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Description — header now shows the meal name */}
        <Text style={styles.description}>{meal.description}</Text>

        {/* Meta row: category badge, prep time, servings */}
        <View style={styles.metaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{formatMealCategory(meal.category)}</Text>
          </View>
          <Text style={styles.metaText}>{meal.prepTimeMinutes} min</Text>
          <Text style={styles.metaText}>{meal.servings} serving{meal.servings !== 1 ? 's' : ''}</Text>
        </View>

        {/* Dietary tag chips */}
        <View style={styles.tagRow}>
          {meal.dietaryTags.map((tag) => (
            <View key={tag} style={styles.tagChip}>
              <Text style={styles.tagChipText}>{formatDietaryTag(tag)}</Text>
            </View>
          ))}
        </View>

        {/* Nutrition grid */}
        <Text style={styles.sectionTitle}>Nutrition</Text>
        <View style={styles.nutritionGrid}>
          <NutritionCell label="Calories" value={`${meal.nutrition.calories}`} unit="kcal" />
          <NutritionCell label="Protein" value={`${meal.nutrition.proteinG}`} unit="g" />
          <NutritionCell label="Carbs" value={`${meal.nutrition.carbsG}`} unit="g" />
          <NutritionCell label="Fat" value={`${meal.nutrition.fatG}`} unit="g" />
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {meal.ingredients.map((ingredient) => (
          <IngredientItem key={ingredient.name} ingredient={ingredient} />
        ))}

        {/* Instructions */}
        <Text style={styles.sectionTitle}>Instructions</Text>
        {meal.instructions.map((step, index) => (
          <View key={index} style={styles.instructionRow}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.instructionText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function NutritionCell({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View style={styles.nutritionCell}>
      <Text style={styles.nutritionValue}>{value}</Text>
      <Text style={styles.nutritionUnit}>{unit}</Text>
      <Text style={styles.nutritionLabel}>{label}</Text>
    </View>
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
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
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
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  nutritionGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  nutritionCell: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  nutritionValue: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  nutritionUnit: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  nutritionLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    marginTop: 2,
  },
  instructionRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
    flexShrink: 0,
  },
  stepNumber: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryDark,
  },
  instructionText: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    lineHeight: 22,
  },
});
