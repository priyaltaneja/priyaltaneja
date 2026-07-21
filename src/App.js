import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Portfolio from './Portfolio';
import ArticleDetail from './pages/ArticleDetail';
import PageContainer, { DURATION } from './components/PageContainer';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

const ThemeToggle = ({ alignWithArticleHeader = false }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={`theme-toggle${alignWithArticleHeader ? ' theme-toggle--article' : ''}`}
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      aria-pressed={isDarkMode}
    >
      {isDarkMode ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
};

const PERSONAL_ARTICLE_SLUGS = [
  'the-quiet-skill-of-not-assuming',
  'unlearning-perfectionism',
  'ill-be-happy-when-insert-here-a-reflection-on-conditional-happiness-versus-true-happiness',
];

const TECHNICAL_ARTICLE_SLUGS = [
  'understanding-fpgas-from-first-principles',
  'rtl-design-of-a-rgb-led-mixer',
  'mechanics-of-lora',
  'multi-lora-at-scale',
];

const normalizePage = (page) => {
  const normalized = page.toLowerCase().replace(/^\/+|\/+$/g, '');
  const articleSlug = normalized.replace(/^article-/, '');

  if (!normalized || normalized === 'home' || normalized === 'projects' || normalized === 'writing') {
    return 'home';
  }

  if (PERSONAL_ARTICLE_SLUGS.includes(articleSlug)) return articleSlug;
  if (TECHNICAL_ARTICLE_SLUGS.includes(normalized)) return normalized;
  return 'home';
};

const getPageFromPath = () => normalizePage(window.location.pathname);

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
    const normalizedPage = normalizePage(page);
    const path = normalizedPage === 'home' ? '/' : `/${normalizedPage}`;
    window.history.pushState(null, '', path);
    transitionTo(normalizedPage);
  }, [transitionTo]);

  useEffect(() => {
    const canonicalPath = displayPage === 'home' ? '/' : `/${displayPage}`;
    if (window.location.pathname !== canonicalPath) {
      window.history.replaceState(null, '', canonicalPath);
    }
  }, [displayPage]);

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

  const isArticlePage = PERSONAL_ARTICLE_SLUGS.includes(displayPage) || TECHNICAL_ARTICLE_SLUGS.includes(displayPage);
  const isReflectiveArticlePage = PERSONAL_ARTICLE_SLUGS.includes(displayPage);

  const renderPage = () => {
    if (isArticlePage) {
      return <ArticleDetail onNavigate={handleNavigate} />;
    }

    return <Portfolio onNavigate={handleNavigate} animateIntro={!hasVisitedHomeRef.current} />;
  };

  return (
    <ThemeProvider>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ThemeToggle alignWithArticleHeader={isReflectiveArticlePage} />
      <div
        className="min-h-dvh flex flex-col relative z-10 transition-opacity duration-500"
        style={{ opacity: appReady ? 1 : 0 }}
      >
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
