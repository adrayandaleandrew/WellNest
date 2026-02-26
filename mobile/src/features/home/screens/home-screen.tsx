import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useProfile } from '../../../shared/contexts/profile-context';
import { useStreak } from '../../../shared/contexts/streak-context';
import { useHomeData } from '../hooks/use-home-data';
import { useWater } from '../hooks/use-water';
import FeaturedWorkoutCard from '../components/featured-workout-card';
import FeaturedMealCard from '../components/featured-meal-card';
import WaterTracker from '../components/water-tracker';
import EmptyState from '../../../shared/components/empty-state';
import ErrorState from '../../../shared/components/error-state';
import { FadeInView } from '../../../shared/components/animated-views';
import { colors, spacing, typography, borderRadius } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { profile } = useProfile();
  const { streak, hasLoggedToday, isLoadingStreak } = useStreak();
  const { featuredWorkout, featuredMeal, isLoading: isLoadingData, error, refetch } = useHomeData();
  const { glasses, addGlass, removeGlass, maxGlasses } = useWater();

  const firstName = profile?.displayName?.split(' ')[0] ?? 'there';

  return (
    <SafeAreaView style={styles.container} testID="home-screen">
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Greeting — fades in on mount */}
        <FadeInView duration={400}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Hey, {firstName} 👋</Text>
            <Text style={styles.subtitle}>Let's keep the momentum going.</Text>
          </View>
        </FadeInView>

        {/* Streak card */}
        <View style={styles.streakCard}>
          {isLoadingStreak ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <>
              <View style={styles.streakRow}>
                <Ionicons name="flame" size={32} color={colors.secondary} />
                <Text style={styles.streakCount} testID="home-streak-count">{streak?.currentStreak ?? 0}</Text>
                <Text style={styles.streakLabel}>day streak</Text>
              </View>
              <Text style={styles.streakSub}>
                {hasLoggedToday
                  ? "You've already logged today — great work!"
                  : 'Complete a workout to keep your streak alive.'}
              </Text>
              {(streak?.longestStreak ?? 0) > 0 && (
                <Text style={styles.streakBest}>
                  Personal best: {streak!.longestStreak}{' '}
                  {streak!.longestStreak === 1 ? 'day' : 'days'}
                </Text>
              )}
            </>
          )}
        </View>

        {/* Error banner for home data */}
        {error ? (
          <ErrorState compact message={error} onRetry={refetch} />
        ) : null}

        {/* Today's Workout */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Workout</Text>
            <Pressable
              testID="see-all-workouts"
              onPress={() => navigation.navigate('WorkoutList')}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="See all workouts"
            >
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          {isLoadingData ? (
            <ActivityIndicator color={colors.primary} style={styles.sectionLoader} />
          ) : featuredWorkout ? (
            <FeaturedWorkoutCard
              workout={featuredWorkout}
              onPress={() => navigation.navigate('WorkoutDetail', { workout: featuredWorkout })}
            />
          ) : (
            <EmptyState
              icon="barbell-outline"
              title="No workouts yet"
              message="Check back soon or add workouts via the admin panel."
            />
          )}
        </View>

        {/* Suggested Meal */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Suggested Meal</Text>
            <Pressable
              onPress={() => navigation.navigate('MealList')}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="See all meals"
            >
              <Text style={styles.seeAll}>See All</Text>
            </Pressable>
          </View>
          {isLoadingData ? (
            <ActivityIndicator color={colors.primary} style={styles.sectionLoader} />
          ) : featuredMeal ? (
            <FeaturedMealCard
              meal={featuredMeal}
              onPress={() => navigation.navigate('MealDetail', { meal: featuredMeal })}
            />
          ) : (
            <EmptyState
              icon="restaurant-outline"
              title="No meals yet"
              message="Meals will appear here once they are added."
            />
          )}
        </View>

        {/* Water Tracker */}
        <View style={styles.section}>
          <WaterTracker
            glasses={glasses}
            maxGlasses={maxGlasses}
            onAdd={addGlass}
            onRemove={removeGlass}
          />
        </View>

        {/* Quick links */}
        <View style={styles.quickLinks}>
          <Pressable
            style={styles.quickLink}
            onPress={() => navigation.navigate('Weight')}
            accessibilityRole="button"
            accessibilityLabel="Go to Weight Tracker"
          >
            <Ionicons name="barbell-outline" size={20} color={colors.primary} />
            <Text style={styles.quickLinkText}>Weight</Text>
          </Pressable>
          <Pressable
            style={styles.quickLink}
            onPress={() => navigation.navigate('Profile')}
            accessibilityRole="button"
            accessibilityLabel="Go to Profile"
          >
            <Ionicons name="person-outline" size={20} color={colors.primary} />
            <Text style={styles.quickLinkText}>Profile</Text>
          </Pressable>
          <Pressable
            style={styles.quickLink}
            onPress={() => navigation.navigate('Settings')}
            accessibilityRole="button"
            accessibilityLabel="Go to Settings"
          >
            <Ionicons name="settings-outline" size={20} color={colors.primary} />
            <Text style={styles.quickLinkText}>Settings</Text>
          </Pressable>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  streakCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    minHeight: 96,
    justifyContent: 'center',
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  streakCount: {
    fontSize: typography.fontSize.heading,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  streakLabel: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  streakSub: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  streakBest: {
    fontSize: typography.fontSize.xs,
    color: colors.text.disabled,
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  sectionLoader: {
    paddingVertical: spacing.lg,
  },
  quickLinks: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  quickLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 44,
  },
  quickLinkText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
});
