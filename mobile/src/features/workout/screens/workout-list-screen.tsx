import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useWorkouts } from '../hooks/use-workouts';
import WorkoutCard from '../components/workout-card';
import LoadingState from '../../../shared/components/loading-state';
import ErrorState from '../../../shared/components/error-state';
import EmptyState from '../../../shared/components/empty-state';
import { colors, spacing } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'WorkoutList'>;

export default function WorkoutListScreen({ navigation }: Props) {
  const { workouts, isLoading, error, refetch } = useWorkouts();

  if (isLoading) {
    return <LoadingState label="Loading workouts..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, workouts.length === 0 && styles.listEmpty]}
        renderItem={({ item }) => (
          <WorkoutCard
            workout={item}
            onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="barbell-outline"
            title="No workouts yet"
            message="Workouts added via the admin panel will appear here."
          />
        }
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  listEmpty: {
    flex: 1,
  },
});
