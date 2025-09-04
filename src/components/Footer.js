import React from 'react';

const Footer = () => {

  return (
    <footer className="w-full py-8 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
          Made with 🩷 by Priyal – fueled by coffee & creativity.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
          Last Updated June 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer; 