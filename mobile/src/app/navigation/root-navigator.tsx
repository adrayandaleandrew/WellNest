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
import WorkoutListScreen from '../../features/workout/screens/workout-list-screen';
import WorkoutDetailScreen from '../../features/workout/screens/workout-detail-screen';
import WorkoutModeScreen from '../../features/workout/screens/workout-mode-screen';
import WorkoutCompleteScreen from '../../features/workout/screens/workout-complete-screen';
import MealListScreen from '../../features/meal/screens/meal-list-screen';
import MealDetailScreen from '../../features/meal/screens/meal-detail-screen';
import WeightScreen from '../../features/weight/screens/weight-screen';
import { colors } from '../../shared/constants/theme';
import type { Workout, WorkoutSessionSummary } from '../../shared/types/workout';
import type { Meal } from '../../shared/types/meal';

export type MainStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  EditProfile: undefined;
  WorkoutList: undefined;
  WorkoutDetail: { workout: Workout };
  WorkoutMode: { workout: Workout };
  WorkoutComplete: { summary: WorkoutSessionSummary; workoutId: string };
  MealList: undefined;
  MealDetail: { meal: Meal };
  Weight: undefined;
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
      <Stack.Screen name="WorkoutList" component={WorkoutListScreen} options={{ title: 'Workouts' }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
      <Stack.Screen name="WorkoutMode" component={WorkoutModeScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
      <Stack.Screen name="WorkoutComplete" component={WorkoutCompleteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MealList" component={MealListScreen} options={{ title: 'Meals' }} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} options={{ title: 'Meal Details' }} />
      <Stack.Screen name="Weight" component={WeightScreen} options={{ title: 'Weight' }} />
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
