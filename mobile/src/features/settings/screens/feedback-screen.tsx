import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useAuth } from '../../../shared/contexts/auth-context';
import { submitFeedback } from '../../../shared/services/feedback-service';
import PrimaryButton from '../../../shared/components/primary-button';
import ErrorState from '../../../shared/components/error-state';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Feedback'>;

const STARS = [1, 2, 3, 4, 5] as const;

export default function FeedbackScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const canSubmit = message.trim().length >= 10;

  async function handleSubmit() {
    if (!user || !canSubmit) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await submitFeedback(user.uid, { message: message.trim(), rating, appVersion });
      navigation.goBack();
    } catch {
      setError('Could not send feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.heading}>How's WellNest working for you?</Text>
        <Text style={styles.subtext}>
          Share anything — we read every response and use it to make the app better.
        </Text>

        {/* Star rating */}
        <Text style={styles.sectionLabel}>Your rating</Text>
        <View style={styles.starsRow} accessibilityRole="radiogroup" accessibilityLabel="Rating">
          {STARS.map((star) => (
            <Pressable
              key={star}
              style={styles.starButton}
              onPress={() => setRating(star)}
              accessibilityRole="radio"
              accessibilityLabel={`${star} star${star > 1 ? 's' : ''}`}
              accessibilityState={{ checked: rating === star }}
            >
              <Text style={[styles.starIcon, rating >= star && styles.starActive]}>★</Text>
            </Pressable>
          ))}
        </View>

        {/* Message input */}
        <Text style={styles.sectionLabel}>Your message</Text>
        <TextInput
          style={styles.textArea}
          value={message}
          onChangeText={setMessage}
          placeholder="Tell us what you love, what's confusing, or what you wish WellNest could do…"
          placeholderTextColor={colors.text.disabled}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          accessibilityLabel="Feedback message"
          accessibilityHint="Minimum 10 characters"
          maxLength={1000}
        />
        {message.trim().length > 0 && !canSubmit ? (
          <Text style={styles.hint}>Keep going — just a few more characters.</Text>
        ) : null}

        {/* Inline error */}
        {error !== null ? (
          <View style={styles.errorWrapper}>
            <ErrorState message={error} compact />
          </View>
        ) : null}

        <PrimaryButton
          title="Send Feedback"
          onPress={handleSubmit}
          isLoading={isSubmitting}
          disabled={!canSubmit}
          accessibilityLabel="Send feedback"
        />
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  heading: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtext: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  // 44×44 minimum touch target (touch-target-size rule)
  starButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starIcon: {
    fontSize: 32,
    color: colors.border,
  },
  starActive: {
    color: colors.secondary,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    minHeight: 140,
    marginBottom: spacing.xs,
  },
  hint: {
    fontSize: typography.fontSize.sm,
    color: colors.text.disabled,
    marginBottom: spacing.xs,
  },
  errorWrapper: {
    marginBottom: spacing.xs,
  },
});
