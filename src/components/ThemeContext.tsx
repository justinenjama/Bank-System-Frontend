import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'system',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system');

    const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove('dark');

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (theme === 'dark' || (theme === 'system' && prefersDark)) {
        root.classList.add('dark');
    }
    };
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'system';
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);