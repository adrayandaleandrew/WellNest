import { StyleSheet, Text, View } from 'react-native';
import type { Ingredient } from '../../../shared/types/meal';
import { colors, spacing, typography } from '../../../shared/constants/theme';

type Props = {
  ingredient: Ingredient;
};

export default function IngredientItem({ ingredient }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.amount}>{ingredient.amount}</Text>
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
  name: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    flex: 1,
  },
  amount: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
});
