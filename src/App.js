import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import About from './pages/About';
import Projects from './pages/Projects';
import Writing from './pages/Writing';
import ArticleDetail from './pages/ArticleDetail';
import Footer from './components/Footer';
import PageContainer from './components/PageContainer';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { slugify } from './utils/slugify';

// Helper function to get page from pathname
const getPageFromPath = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '') {
    return 'home';
  }
  // Remove leading slash
  return path.substring(1);
};

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Get initial page from URL pathname or default to home
    return getPageFromPath();
  });

  const handleNavigate = (page) => {
    // Add a small delay specifically for Safari page transitions
    setTimeout(() => {
      setCurrentPage(page);
      // Use pushState for browser history routing
      const path = page === 'home' ? '/' : `/${page}`;
      window.history.pushState(null, '', path);
    }, 10);
  };

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if current page is the FPGA article (with or without "article-" prefix)
  const fpgaArticleSlug = 'understanding-fpgas-from-first-principles';
  const currentPageLower = currentPage.toLowerCase();
  const isFPGAPage = currentPageLower === fpgaArticleSlug;
  const isFPGAArticle = isFPGAPage || 
    (currentPageLower.startsWith('article-') && currentPageLower.replace(/^article-/, '') === fpgaArticleSlug);

  const renderPage = () => {
    // Check if it's an article page (either with "article-" prefix or the FPGA article without prefix)
    if (/^article-/.test(currentPage) || isFPGAPage) {
      return <ArticleDetail onNavigate={handleNavigate} />;
    }
    switch (currentPage) {
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'writing':
        return <Writing onNavigate={handleNavigate} />;
      default:
        return <Portfolio onNavigate={handleNavigate} currentPage={currentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {!isFPGAArticle && <ThemeToggle />}
        <div className="flex-grow">
          <PageContainer key={currentPage} pageKey={currentPage}>
            {renderPage()}
          </PageContainer>
        </div>
        <Footer isFPGAArticle={isFPGAArticle} isArticlePage={/^article-/.test(currentPage) || isFPGAPage} />
      </div>
    </ThemeProvider>
  );
}

export default App;