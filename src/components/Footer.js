import React from 'react';

const Footer = ({ isFPGAArticle = false, isArticlePage = false }) => {
  // Match footer background to article page background
  const footerBgColor = isFPGAArticle
    ? 'bg-[#f5efeb]'
    : 'bg-white dark:bg-[#000000]';
  
  const footerBorderColor = isFPGAArticle
    ? 'border-gray-300'
    : 'border-gray-100 dark:border-gray-800';

  return (
    <footer className={`w-full py-8 ${footerBgColor} border-t ${footerBorderColor} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-zinc-400 text-sm leading-relaxed font-light transition-colors duration-200">
          Made with 🩷 by Priyal – fueled by coffee & creativity.
        </p>
        <p className="text-zinc-400 text-xs leading-relaxed font-light transition-colors duration-200">
          Last Updated March 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer; 