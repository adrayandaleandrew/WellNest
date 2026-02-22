import { useState, useRef, useCallback, useEffect } from 'react';

export function useTimer(initialSeconds: number, onComplete?: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  // Guards against re-firing when secondsLeft stays at 0 across re-renders
  const completedRef = useRef(false);

  onCompleteRef.current = onComplete;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    completedRef.current = false;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      // Pure updater — no side effects allowed inside (React concurrent mode contract)
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (prev === 1) completedRef.current = true; // mark first arrival at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const reset = useCallback(
    (newSeconds?: number) => {
      clearTimer();
      completedRef.current = false;
      setIsRunning(false);
      setSecondsLeft(newSeconds ?? initialSeconds);
    },
    [clearTimer, initialSeconds],
  );

  // Side effects fire after React commits secondsLeft = 0, never inside the updater
  useEffect(() => {
    if (secondsLeft === 0 && completedRef.current) {
      completedRef.current = false;
      clearTimer();
      setIsRunning(false);
      onCompleteRef.current?.();
    }
  }, [secondsLeft, clearTimer]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return { secondsLeft, isRunning, start, reset };
}
