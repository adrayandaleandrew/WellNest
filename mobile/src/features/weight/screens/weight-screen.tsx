import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWeight } from '../hooks/use-weight';
import WeightChart from '../components/weight-chart';
import WeightHistoryItem from '../components/weight-history-item';
import ErrorState from '../../../shared/components/error-state';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

export default function WeightScreen() {
  const { history, isLoading, error, logWeight } = useWeight();
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // History is stored oldest-first; reverse for display
  const recentHistory = [...history].reverse();

  async function handleSubmit() {
    const trimmed = input.trim();
    const parsed = parseFloat(trimmed);

    if (!trimmed || isNaN(parsed)) {
      setInputError('Please enter a valid weight.');
      return;
    }
    if (parsed <= 0 || parsed > 500) {
      setInputError('Weight must be between 1 and 500 kg.');
      return;
    }

    setInputError(null);
    setIsSaving(true);
    try {
      await logWeight(+parsed.toFixed(1));
      setInput('');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          {/* Log weight form */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Log Weight</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={[styles.input, inputError ? styles.inputError : null]}
                placeholder="e.g. 68.5"
                placeholderTextColor={colors.text.disabled}
                keyboardType="decimal-pad"
                value={input}
                onChangeText={(t) => {
                  setInput(t);
                  if (inputError) setInputError(null);
                }}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                accessibilityLabel="Weight in kilograms"
                accessibilityHint="Enter your current weight"
              />
              <Text style={styles.unit}>kg</Text>
            </View>
            {inputError && <Text style={styles.errorText}>{inputError}</Text>}
            <Pressable
              style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSaving}
              accessibilityRole="button"
              accessibilityLabel="Save weight entry"
              accessibilityState={{ disabled: isSaving, busy: isSaving }}
            >
              {isSaving ? (
                <ActivityIndicator color={colors.text.inverse} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Save</Text>
              )}
            </Pressable>
          </View>

          {/* Chart */}
          {isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.loader} />
          ) : error ? (
            <ErrorState compact message={error} />
          ) : (
            <>
              <Text style={styles.sectionTitle}>Progress (last 7 entries)</Text>
              <WeightChart entries={history} />

              {/* History list */}
              {recentHistory.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, styles.sectionTitleTop]}>History</Text>
                  <View style={styles.historyCard}>
                    {recentHistory.map((entry, i) => (
                      <WeightHistoryItem
                        key={entry.id}
                        entry={entry}
                        // previousWeight is the entry just before in chronological order
                        previousWeight={i < recentHistory.length - 1 ? recentHistory[i + 1].weightKg : undefined}
                      />
                    ))}
                  </View>
                </>
              )}
            </>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.error,
  },
  unit: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: colors.error,
    marginBottom: spacing.sm,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  loader: {
    paddingVertical: spacing.lg,
  },
  globalError: {
    fontSize: typography.fontSize.md,
    color: colors.error,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sectionTitleTop: {
    marginTop: spacing.lg,
  },
  historyCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
