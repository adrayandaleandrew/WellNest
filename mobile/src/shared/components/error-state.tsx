import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

type Props = {
  message: string;
  onRetry?: () => void;
  compact?: boolean;
};

/**
 * Displays an error message with optional retry action.
 * compact=true — inline row layout (home sections, auth banners)
 * compact=false — full-screen centered layout (list screens)
 */
export default function ErrorState({ message, onRetry, compact = false }: Props) {
  if (compact) {
    return (
      <View
        style={styles.compactContainer}
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
      >
        <Ionicons name="alert-circle-outline" size={16} color={colors.error} />
        <Text style={styles.compactMessage}>{message}</Text>
        {onRetry ? (
          <Pressable onPress={onRetry} accessibilityRole="button" accessibilityLabel="Retry">
            <Text style={styles.retryLink}>Retry</Text>
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container} accessibilityRole="alert" accessibilityLiveRegion="assertive">
      <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Pressable
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel="Try Again"
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.errorSurface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  compactMessage: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.error,
  },
  retryLink: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    fontWeight: typography.fontWeight.semibold,
    textDecorationLine: 'underline',
  },
});
