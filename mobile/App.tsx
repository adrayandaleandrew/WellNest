import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/shared/contexts/auth-context';
import { ProfileProvider } from './src/shared/contexts/profile-context';
import { StreakProvider } from './src/shared/contexts/streak-context';
import RootNavigator from './src/app/navigation/root-navigator';

export default function App() {
  return (
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
  );
}
