import React, { useEffect, useRef, useState } from 'react';

const PageContainer = ({ children, pageKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const prevKey = useRef(pageKey);

  useEffect(() => {
    // Reset when page changes
    if (prevKey.current !== pageKey) {
      setIsLoaded(false);
      prevKey.current = pageKey;
      
      // Force Safari to acknowledge DOM changes
      if (containerRef.current) {
        // eslint-disable-next-line no-unused-expressions
        containerRef.current.offsetHeight; // Force reflow
      }
      
      // Use requestAnimationFrame for Safari compatibility
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsLoaded(true);
        });
      });
    } else {
      // Initial load
      setTimeout(() => setIsLoaded(true), 10);
    }
  }, [pageKey]);

  return (
    <div 
      ref={containerRef}
      className={`safari-fade${isLoaded ? ' loaded' : ''}`}
    >
      {children}
    </div>
  );
};

export default PageContainer;