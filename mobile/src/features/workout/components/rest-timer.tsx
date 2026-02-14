import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTimer } from '../../../shared/hooks/use-timer';
import { formatDuration } from '../../../shared/utils/workout-utils';
import { colors, spacing, typography } from '../../../shared/constants/theme';

type Props = {
  seconds: number;
  onComplete: () => void;
};

export default function RestTimer({ seconds, onComplete }: Props) {
  const { secondsLeft, start } = useTimer(seconds, onComplete);

  useEffect(() => {
    start();
  }, [start]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rest</Text>
      <Text style={styles.timer}>{formatDuration(secondsLeft)}</Text>
      <Text style={styles.hint}>Next set starting soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  timer: {
    fontSize: 64,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  hint: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
});
