import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

type Props = {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export default function PrimaryButton({ title, onPress, isLoading, disabled, accessibilityLabel }: Props) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.text.inverse} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
