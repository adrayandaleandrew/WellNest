import { useRef, useEffect, ReactNode } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

type FadeInViewProps = {
  children: ReactNode;
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Fades children from opacity 0 → 1 on mount.
 * Uses useNativeDriver for GPU-accelerated animation (opacity only).
 */
export function FadeInView({ children, duration = 300, delay = 0, style }: FadeInViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}

type FadeSlideViewProps = {
  children: ReactNode;
  duration?: number;
  triggerKey?: string | number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Fades + slides up 12px on mount and replays when triggerKey changes.
 * Animates opacity + translateY — both GPU-accelerated with useNativeDriver.
 */
export function FadeSlideView({ children, duration = 250, triggerKey, style }: FadeSlideViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    // Reset before replaying
    opacity.setValue(0);
    translateY.setValue(12);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [triggerKey]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}
