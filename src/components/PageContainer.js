import React from 'react';

const DURATION = 90; // ms

const PageContainer = ({ children, visible }) => {
  return (
    <div className={`page-transition ${visible ? 'is-visible' : 'is-hidden'}`}>
      {children}
    </div>
  );
};

export { DURATION };
export default PageContainer;
