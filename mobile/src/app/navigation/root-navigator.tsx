import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../../shared/contexts/auth-context';
import { useProfile } from '../../shared/contexts/profile-context';
import AuthNavigator from '../../features/auth/navigation/auth-navigator';
import OnboardingNavigator from '../../features/onboarding/navigation/onboarding-navigator';
import HomeScreen from '../../features/home/screens/home-screen';
import SettingsScreen from '../../features/settings/screens/settings-screen';
import ProfileScreen from '../../features/profile/screens/profile-screen';
import EditProfileScreen from '../../features/profile/screens/edit-profile-screen';
import { colors } from '../../shared/constants/theme';

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WellNest' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, isLoading } = useAuth();
  const { profile, isLoadingProfile } = useProfile();

  if (isLoading || (user && isLoadingProfile)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) return <AuthNavigator />;
  if (!profile?.onboardingComplete) return <OnboardingNavigator />;
  return <MainNavigator />;
}
