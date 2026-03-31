import React from 'react';

const DURATION = 100; // ms

const PageContainer = ({ children, visible }) => {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${DURATION}ms ease`,
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  );
};

export { DURATION };
export default PageContainer;
