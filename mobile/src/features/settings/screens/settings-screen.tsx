import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useAuth } from '../../../shared/contexts/auth-context';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.label}>Signed in as</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <Pressable
        style={styles.menuItem}
        onPress={() => navigation.navigate('Profile')}
        accessibilityRole="button"
        accessibilityLabel="My Profile"
      >
        <Text style={styles.menuItemText}>My Profile</Text>
      </Pressable>
      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityRole="button"
        accessibilityLabel="Log Out"
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  userInfo: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.primary,
  },
  menuItem: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  menuItemText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.primary,
  },
  logoutButton: {
    backgroundColor: colors.error,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  logoutText: {
    color: colors.text.inverse,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
