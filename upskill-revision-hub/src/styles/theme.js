const lightTheme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1e40af',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#64748b',
    border: '#e2e8f0',
    cardBg: '#ffffff',
    cardHover: '#f1f5f9',
  },
  fonts: {
    family: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    large: '2.5rem',
    xlarge: '2rem',
    lg: '1.5rem',
    md: '1.125rem',
    base: '1rem',
    sm: '0.875rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.5rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
  },
};

const darkTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#60a5fa',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#cbd5e1',
    border: '#334155',
    cardBg: '#1e293b',
    cardHover: '#334155',
  },
  fonts: lightTheme.fonts,
  spacing: lightTheme.spacing,
  breakpoints: lightTheme.breakpoints,
};

export { lightTheme, darkTheme };
