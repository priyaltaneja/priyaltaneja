import React from 'react';

const DURATION = 140; // ms
const RETURN_DURATION = 300; // ms

const PageContainer = ({ children, visible, isReturningHome = false }) => {
  return (
    <div className={`page-transition ${visible ? 'is-visible' : 'is-hidden'}${isReturningHome ? ' is-returning-home' : ''}`}>
      {children}
    </div>
  );
};

export { DURATION, RETURN_DURATION };
export default PageContainer;
