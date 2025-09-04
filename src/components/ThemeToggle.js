import React, { useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 1000); // 6 seconds delay
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowTooltip(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleTheme}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="p-3 rounded-full bg-white/80 dark:bg-[#000000] backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none"
        aria-label={`switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <Sun size={20} className="text-white" />
        ) : (
          <Moon size={20} className="text-black" />
        )}
      </button>
      
      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-[#000000] dark:bg-white text-white dark:text-black text-sm rounded-lg shadow-lg whitespace-nowrap">
          switch to {isDarkMode ? 'light' : 'dark'} mode
          <div className="absolute -top-1 right-4 w-2 h-2 bg-[#000000] dark:bg-white transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
