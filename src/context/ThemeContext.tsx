import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';
export type ThemeColorId = 'cyan' | 'purple' | 'emerald' | 'orange' | 'rose';

export interface ThemeColorConfig {
  id: ThemeColorId;
  name: string;
  dotHex: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  glowSubtle: string;
  threeHex: number;
}

export const THEME_COLORS: Record<ThemeColorId, ThemeColorConfig> = {
  cyan: {
    id: 'cyan',
    name: 'Azure Tech',
    dotHex: '#00D2FF',
    primary: '#00D2FF',
    secondary: '#0284C7',
    accent: '#38BDF8',
    glow: 'rgba(0, 210, 255, 0.5)',
    glowSubtle: 'rgba(0, 210, 255, 0.18)',
    threeHex: 0x00d2ff,
  },
  purple: {
    id: 'purple',
    name: 'Royal Indigo',
    dotHex: '#6366F1',
    primary: '#6366F1',
    secondary: '#4F46E5',
    accent: '#818CF8',
    glow: 'rgba(99, 102, 241, 0.5)',
    glowSubtle: 'rgba(99, 102, 241, 0.18)',
    threeHex: 0x6366f1,
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Growth',
    dotHex: '#10B981',
    primary: '#10B981',
    secondary: '#059669',
    accent: '#34D399',
    glow: 'rgba(16, 185, 129, 0.5)',
    glowSubtle: 'rgba(16, 185, 129, 0.18)',
    threeHex: 0x10b981,
  },
  orange: {
    id: 'orange',
    name: 'Solar Amber',
    dotHex: '#F59E0B',
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FBBF24',
    glow: 'rgba(245, 158, 11, 0.5)',
    glowSubtle: 'rgba(245, 158, 11, 0.18)',
    threeHex: 0xf59e0b,
  },
  rose: {
    id: 'rose',
    name: 'Ruby Crimson',
    dotHex: '#F43F5E',
    primary: '#F43F5E',
    secondary: '#E11D48',
    accent: '#FB7185',
    glow: 'rgba(244, 63, 94, 0.5)',
    glowSubtle: 'rgba(244, 63, 94, 0.18)',
    threeHex: 0xf43f5e,
  },
};

interface ThemeContextType {
  themeMode: ThemeMode;
  themeColor: ThemeColorId;
  activeTheme: ThemeColorConfig;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeColor: (color: ThemeColorId) => void;
  toggleThemeMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY_MODE = 'akteruzzaman_theme_mode';
const STORAGE_KEY_COLOR = 'akteruzzaman_theme_color';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Read initial values from localStorage or default
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODE);
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [themeColor, setThemeColorState] = useState<ThemeColorId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COLOR) as ThemeColorId;
      if (saved && THEME_COLORS[saved]) return saved;
      // Default to 'cyan' to match the user's provided screenshot
      return 'cyan';
    } catch {
      return 'cyan';
    }
  });

  // Apply theme attributes to document.documentElement
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme-mode', themeMode);
    root.setAttribute('data-theme-color', themeColor);

    if (themeMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }

    const config = THEME_COLORS[themeColor] || THEME_COLORS.cyan;
    root.style.setProperty('--color-primary', config.primary);
    root.style.setProperty('--color-secondary', config.secondary);
    root.style.setProperty('--color-accent', config.accent);
    root.style.setProperty('--color-glow', config.glow);
    root.style.setProperty('--color-glow-subtle', config.glowSubtle);

    try {
      localStorage.setItem(STORAGE_KEY_MODE, themeMode);
      localStorage.setItem(STORAGE_KEY_COLOR, themeColor);
    } catch {
      // Storage unavailable or disabled
    }
  }, [themeMode, themeColor]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const setThemeColor = (color: ThemeColorId) => {
    if (THEME_COLORS[color]) {
      setThemeColorState(color);
    }
  };

  const toggleThemeMode = () => {
    setThemeModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        themeColor,
        activeTheme: THEME_COLORS[themeColor] || THEME_COLORS.cyan,
        setThemeMode,
        setThemeColor,
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
