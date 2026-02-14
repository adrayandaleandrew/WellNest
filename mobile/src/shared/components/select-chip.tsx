import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

type Props = {
  label: string;
  subtitle?: string;
  isSelected: boolean;
  onPress: () => void;
};

export default function SelectChip({ label, subtitle, isSelected, onPress }: Props) {
  return (
    <Pressable
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, isSelected && styles.subtitleSelected]}>
          {subtitle}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  label: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  labelSelected: {
    color: colors.primaryDark,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  subtitleSelected: {
    color: colors.primaryDark,
  },
});
