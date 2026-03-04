import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/auth-navigator';
import { validateEmail, getAuthErrorMessage } from '../../../shared/utils/validation';
import { sendPasswordReset } from '../../../shared/services/auth-service';
import PrimaryButton from '../../../shared/components/primary-button';
import ErrorState from '../../../shared/components/error-state';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit() {
    const emailError = validateEmail(email);
    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await sendPasswordReset(email);
      setIsSuccess(true);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      setErrors({ general: getAuthErrorMessage(code) });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send you a reset link.
          </Text>

          {isSuccess ? (
            // Success state — form replaced with confirmation message
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                If an account exists for this email, a reset link has been sent.
              </Text>
              <Pressable
                onPress={() => navigation.navigate('Login')}
                style={styles.backButton}
                accessibilityRole="button"
                accessibilityLabel="Back to Login"
              >
                <Text style={styles.backButtonText}>Back to Login</Text>
              </Pressable>
            </View>
          ) : (
            <>
              {errors.general ? (
                <View style={styles.errorBannerWrapper}>
                  <ErrorState compact message={errors.general} />
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.text.disabled}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoComplete="email"
                  accessibilityLabel="Email address"
                />
                {errors.email ? <Text style={styles.fieldError}>{errors.email}</Text> : null}
              </View>

              <PrimaryButton
                title="Send Reset Link"
                onPress={handleSubmit}
                isLoading={isSubmitting}
                accessibilityLabel="Send Reset Link"
              />

              <Pressable
                onPress={() => navigation.navigate('Login')}
                style={styles.linkContainer}
                accessibilityRole="link"
                accessibilityLabel="Back to Login"
              >
                <Text style={styles.linkText}>
                  Back to <Text style={styles.linkBold}>Login</Text>
                </Text>
              </Pressable>
            </>
          )}
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorBannerWrapper: {
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  fieldError: {
    color: colors.error,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
  linkContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  linkText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  successContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  successText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  backButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  backButtonText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
});
