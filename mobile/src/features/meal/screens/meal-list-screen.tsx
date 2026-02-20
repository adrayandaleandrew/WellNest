import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../../app/navigation/root-navigator';
import { useMeals } from '../hooks/use-meals';
import MealCard from '../components/meal-card';
import FilterChips from '../components/filter-chips';
import LoadingState from '../../../shared/components/loading-state';
import ErrorState from '../../../shared/components/error-state';
import EmptyState from '../../../shared/components/empty-state';
import { colors, spacing } from '../../../shared/constants/theme';

type Props = NativeStackScreenProps<MainStackParamList, 'MealList'>;

export default function MealListScreen({ navigation }: Props) {
  const { filteredMeals, isLoading, error, selectedCategory, setSelectedCategory, refetch } = useMeals();

  if (isLoading) {
    return <LoadingState label="Loading meals..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, filteredMeals.length === 0 && styles.listEmpty]}
        ListHeaderComponent={
          <FilterChips selected={selectedCategory} onSelect={setSelectedCategory} />
        }
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetail', { meal: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="restaurant-outline"
            title="No meals found"
            message="Try a different category or check back later."
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  listEmpty: {
    flex: 1,
  },
});
