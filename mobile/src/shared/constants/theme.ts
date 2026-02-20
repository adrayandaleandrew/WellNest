export const colors = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: '#C8E6C9',
  secondary: '#FF9800',
  secondaryDark: '#F57C00',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  error: '#D32F2F',
  errorSurface: '#FFEBEE',
  success: '#388E3C',
  warning: '#FFA000',
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    inverse: '#FFFFFF',
  },
  border: '#E0E0E0',
} as const;

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    heading: 28,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
