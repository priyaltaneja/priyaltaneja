import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextMode = !isDarkMode;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyTheme = (freezeTransitions = false) => {
      if (freezeTransitions) root.classList.add('theme-changing');
      flushSync(() => {
        root.classList.toggle('dark', nextMode);
        root.style.colorScheme = nextMode ? 'dark' : 'light';
        setIsDarkMode(nextMode);
      });
    };

    if (reduceMotion) {
      applyTheme(true);
      window.requestAnimationFrame(() => root.classList.remove('theme-changing'));
      return;
    }

    if (!document.startViewTransition) {
      applyTheme();
      return;
    }

    const transition = document.startViewTransition(() => applyTheme(true));
    transition.finished.finally(() => root.classList.remove('theme-changing'));
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
