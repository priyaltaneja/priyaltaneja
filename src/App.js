import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import About from './pages/About';
import Projects from './pages/Projects';
import Writing from './pages/Writing';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Get initial page from URL hash or default to home
    const hash = window.location.hash.replace('#', '');
    return hash || 'home';
  });
  const [animationKey, setAnimationKey] = useState(0);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setAnimationKey(Date.now()); // update key on every navigation
    window.location.hash = page;
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPage(hash || 'home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'writing':
        return <Writing onNavigate={handleNavigate} />;
      default:
        return <Portfolio onNavigate={handleNavigate} currentPage={currentPage} animationKey={animationKey} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
}

export default App;