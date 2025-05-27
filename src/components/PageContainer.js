import React, { useEffect, useRef, useState } from 'react';

export default function PageContainer({ children, pageKey }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const prevKey = useRef(pageKey);

  useEffect(() => {
    if (prevKey.current !== pageKey) {
      setIsLoaded(false);
      prevKey.current = pageKey;
      setTimeout(() => setIsLoaded(true), 10);
    } else {
      setIsLoaded(true);
    }
  }, [pageKey]);

  return (
    <div className={`safari-fade${isLoaded ? ' loaded' : ''}`}>
      {children}
    </div>
  );
} 