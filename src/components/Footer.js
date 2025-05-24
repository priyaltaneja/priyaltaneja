import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Georgia, serif' }}>
          Made with ❤️ by Priyal Taneja – fueled by coffee & creativity.
        </p>
        <p className="text-xs text-gray-400" style={{ fontFamily: 'Georgia, serif' }}>
          Last Updated May 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer; 