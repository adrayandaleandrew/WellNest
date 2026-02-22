import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AuthProvider } from './src/shared/contexts/auth-context';
import { ProfileProvider } from './src/shared/contexts/profile-context';
import { StreakProvider } from './src/shared/contexts/streak-context';
import RootNavigator from './src/app/navigation/root-navigator';

export default function App() {
  return (
    // Explicit SafeAreaProvider with initialWindowMetrics ensures OEM Android
    // display cutout (punch-hole camera) insets are reported synchronously.
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AuthProvider>
        <ProfileProvider>
          <StreakProvider>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </StreakProvider>
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
