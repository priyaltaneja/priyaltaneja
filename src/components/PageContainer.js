import React, { useEffect, useRef, useState } from 'react';

const PageContainer = ({ children, pageKey }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef(null);
  const prevKey = useRef(pageKey);

  useEffect(() => {
    // Reset when page changes
    if (prevKey.current !== pageKey) {
      console.log('Page changing from', prevKey.current, 'to', pageKey); // Debug log
      
      // Force complete re-render for Safari
      setShouldRender(false);
      setIsLoaded(false);
      prevKey.current = pageKey;
      
      // Wait for DOM to clear, then re-render
      setTimeout(() => {
        setShouldRender(true);
        
        // Force multiple reflows for Safari
        if (containerRef.current) {
          const _ = containerRef.current.offsetHeight;
          void _;
          containerRef.current.style.opacity = '0';
          containerRef.current.style.transform = 'translateY(20px)';
        }
        
        // Trigger animation with multiple timing attempts
        const triggerAnimation = () => {
          console.log('Triggering animation for Safari'); // Debug log
          setIsLoaded(true);
        };
        
        // Try multiple timing strategies for Safari
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTimeout(triggerAnimation, 10);
          });
        });
        
      }, 20);
    } else {
      // Initial load
      console.log('Initial load for page:', pageKey); // Debug log
      setTimeout(() => setIsLoaded(true), 50);
    }
  }, [pageKey]);

  if (!shouldRender) {
    return <div style={{ opacity: 0, height: '100vh' }}></div>;
  }

  return (
    <>
      <style>
        {`
          .safari-fade-container {
            opacity: 0;
            -webkit-transform: translateY(20px) translateZ(0);
            transform: translateY(20px) translateZ(0);
            -webkit-transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            -moz-transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            will-change: transform, opacity;
            /* Force hardware acceleration */
            -webkit-perspective: 1000px;
            perspective: 1000px;
          }

          .safari-fade-container.loaded {
            opacity: 1 !important;
            -webkit-transform: translateY(0) translateZ(0) !important;
            transform: translateY(0) translateZ(0) !important;
          }
        `}
      </style>
      <div 
        ref={containerRef}
        className={`safari-fade-container${isLoaded ? ' loaded' : ''}`}
        style={{
          // Force inline styles for Safari as backup
          opacity: isLoaded ? 1 : 0,
          WebkitTransform: `translateY(${isLoaded ? 0 : 20}px) translateZ(0)`,
          transform: `translateY(${isLoaded ? 0 : 20}px) translateZ(0)`,
          WebkitTransition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), -webkit-transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default PageContainer;