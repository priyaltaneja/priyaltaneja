import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Portfolio from './Portfolio';
import Projects from './pages/Projects';
import Writing from './pages/Writing';
import ArticleDetail from './pages/ArticleDetail';
import PageContainer, { DURATION } from './components/PageContainer';
import { ThemeProvider } from './contexts/ThemeContext';

// Helper function to get page from pathname
const getPageFromPath = () => {
  const path = window.location.pathname;
  if (path === '/' || path === '') {
    return 'home';
  }
  return path.substring(1);
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};

function App() {
  const [displayPage, setDisplayPage] = useState(() => getPageFromPath());
  const [visible, setVisible] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const pendingPage = useRef(null);
  const timerRef = useRef(null);
  const hasVisitedHomeRef = useRef(getPageFromPath() === 'home');

  useEffect(() => {
    requestAnimationFrame(() => setAppReady(true));
  }, []);

  // Transition to a new page: fade out -> swap -> fade in
  const transitionTo = useCallback((page) => {
    if (page === displayPage && !pendingPage.current) return;

    pendingPage.current = page;
    setVisible(false);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const next = pendingPage.current;
      pendingPage.current = null;
      setDisplayPage(next);
      requestAnimationFrame(() => setVisible(true));
    }, DURATION);
  }, [displayPage]);

  const handleNavigate = useCallback((page) => {
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', path);
    transitionTo(page);
  }, [transitionTo]);

  useEffect(() => {
    const handlePopState = () => transitionTo(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [transitionTo]);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return undefined;

    const previousValue = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousValue;
    };
  }, []);

  // Reset scroll before paint so route changes never flash at the previous scroll position.
  useLayoutEffect(() => {
    scrollToTop();
  }, [displayPage]);

  useEffect(() => {
    if (displayPage === 'home') {
      hasVisitedHomeRef.current = true;
    }
  }, [displayPage]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const fpgaArticleSlug = 'understanding-fpgas-from-first-principles';
  const rgbLedArticleSlug = 'rtl-design-of-a-rgb-led-mixer';
  const displayPageLower = displayPage.toLowerCase();
  const isFPGAPage = displayPageLower === fpgaArticleSlug;
  const isRGBLedPage = displayPageLower === rgbLedArticleSlug;
  const isArticlePage = /^article-/.test(displayPage) || isFPGAPage || isRGBLedPage;
  const isSubPage = displayPage === 'projects' || displayPage === 'writing';
  const showSharedNav = !isArticlePage;

  const renderPage = () => {
    if (isArticlePage) {
      return <ArticleDetail onNavigate={handleNavigate} />;
    }

    switch (displayPage) {
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'writing':
        return <Writing onNavigate={handleNavigate} />;
      default:
        return <Portfolio onNavigate={handleNavigate} animateIntro={!hasVisitedHomeRef.current} />;
    }
  };

  return (
    <ThemeProvider>
      <div
        className={`min-h-dvh flex flex-col relative z-10 transition-opacity duration-500 ${!isSubPage && !isArticlePage ? 'h-dvh overflow-hidden' : ''}`}
        style={{ opacity: appReady ? 1 : 0 }}
      >
        {showSharedNav && (
          <header className="absolute top-0 left-0 right-0 z-30 w-full px-8 sm:px-12 md:px-14 lg:px-20 pt-8 md:pt-10">
            <nav className="relative">
              <button
                onClick={() => handleNavigate('home')}
                className={`icon-sweep absolute left-0 top-1/2 flex -translate-y-1/2 items-center transition-all duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  isSubPage ? 'translate-x-0 opacity-100 pointer-events-auto' : '-translate-x-4 opacity-0 pointer-events-none'
                }`}
                aria-label="Back to home"
              >
                <ArrowLeft size={18} />
              </button>

              <ul
                className="flex items-center text-base sm:text-lg font-light text-white/60 transition-transform duration-250 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                style={{
                  transform: isSubPage ? 'translateX(44px)' : 'translateX(0px)',
                }}
              >
                <li className="mr-8">
                  <button
                    onClick={() => handleNavigate('projects')}
                    className={displayPage === 'projects' ? 'glass-text' : 'text-sweep'}
                  >
                    projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigate('writing')}
                    className={displayPage === 'writing' ? 'glass-text' : 'text-sweep'}
                  >
                    writing
                  </button>
                </li>
              </ul>
            </nav>
          </header>
        )}

        {/* Dark scrim – fades in on subpages to boost contrast against the texture */}
        <div
          className="fixed inset-0 bg-black pointer-events-none transition-opacity duration-300 z-0"
          style={{ opacity: isSubPage || isArticlePage ? 0.35 : 0 }}
        />

        <div className="flex-grow relative z-10">
          <PageContainer visible={visible}>
            {renderPage()}
          </PageContainer>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
