import { useState, useCallback, useRef } from 'react';
import type { Workout, WorkoutSessionSummary } from '../../../shared/types/workout';

type SessionPhase = 'exercise' | 'rest' | 'complete';

export function useWorkoutSession(workout: Workout) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<SessionPhase>('exercise');
  const [exercisesCompleted, setExercisesCompleted] = useState(0);
  const startTimeRef = useRef(Date.now());

  const currentExercise = workout.exercises[currentExerciseIndex];
  const isLastSet = currentSet >= currentExercise.sets;
  const isLastExercise = currentExerciseIndex >= workout.exercises.length - 1;

  const completeSet = useCallback(() => {
    if (isLastSet) {
      setExercisesCompleted((prev) => prev + 1);
      if (isLastExercise) {
        setPhase('complete');
      } else {
        setPhase('rest');
      }
    } else {
      setPhase('rest');
    }
  }, [isLastSet, isLastExercise]);

  const onRestComplete = useCallback(() => {
    if (isLastSet) {
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSet(1);
    } else {
      setCurrentSet((prev) => prev + 1);
    }
    setPhase('exercise');
  }, [isLastSet]);

  const getSummary = useCallback((): WorkoutSessionSummary => {
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    return {
      workoutName: workout.name,
      exercisesCompleted,
      exercisesTotal: workout.exercises.length,
      durationSeconds,
    };
  }, [workout.name, workout.exercises.length, exercisesCompleted]);

  return {
    currentExercise,
    currentExerciseIndex,
    currentSet,
    phase,
    exercisesCompleted,
    totalExercises: workout.exercises.length,
    completeSet,
    onRestComplete,
    getSummary,
  };
}
