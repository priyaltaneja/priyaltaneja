import React from 'react';

const Footer = ({ isFPGAArticle = false, isArticlePage = false }) => {
  // Match footer background to article page background
  const footerBgColor = isFPGAArticle 
    ? 'bg-[#f5efeb]' 
    : isArticlePage 
      ? 'bg-white dark:bg-[#000000]' 
      : 'bg-white dark:bg-[#121212]';
  
  const footerBorderColor = isFPGAArticle
    ? 'border-gray-300'
    : 'border-gray-100 dark:border-gray-800';

  return (
    <footer className={`w-full py-8 ${footerBgColor} border-t ${footerBorderColor} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200" style={{ fontFamily: 'Georgia, serif' }}>
          Made with 🩷 by Priyal – fueled by coffee & creativity.
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-200" style={{ fontFamily: 'Georgia, serif' }}>
          Last Updated June 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer; 