import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga4';
import { useMediaQuery } from 'react-responsive';

import Header from './components/Header';
import About from './views/About';
import Contact from './views/Contact';
import CurrentViewContext from './views/CurrentViewContext';
import Intro from './views/Intro';
import Projects from './views/Projects';
import Resume from './views/Resume';

import classes from './App.module.scss';
import MobileHeader from './components/MobileHeader';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const [isMenuMode, setMenuMode] = useState<boolean>(true);
  const [isSmoothScroll, setSmoothScroll] = useState<boolean>(false);
  const [indicatorRef, setIndicatorRef] = useState<HTMLDivElement | null>(null);
  const [isIntroDone, setIntroDone] = useState<boolean>(false);
  const currentViewHook = useState<number>(0);
  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const sectionsClass = clsx({
    [classes.sections]: true,
    [classes.visible]: !isMenuMode,
    [classes.smooth]: isSmoothScroll && !isMobile,
  });

  ReactGA.initialize('G-BV85T412FD');
  ReactGA.send({ hitType: 'pageview', page: '/' });

  // set smooth scroll after some delay
  useEffect(() => {
    !isMenuMode && setTimeout(() => setSmoothScroll(true), 500);
  }, [isMenuMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <CurrentViewContext.Provider value={currentViewHook}>
        <div className={classes.app}>
          <Intro
            indicator={indicatorRef}
            isIntroDone={isIntroDone}
            setIntroDone={() => setIntroDone(true)}
          />
          {isMobile ? (
            <MobileHeader
              isMenuMode={isMenuMode}
              setMenuMode={setMenuMode}
              sectionsRef={sectionsRef}
              setIndicatorRef={setIndicatorRef}
            />
          ) : (
            <Header
              isMenuMode={isMenuMode}
              setMenuMode={setMenuMode}
              sectionsRef={sectionsRef}
              setIndicatorRef={setIndicatorRef}
            />
          )}
          <div ref={sectionsRef} className={sectionsClass}>
            <About />
            <Resume />
            {isIntroDone && <Projects />}
            <Contact />
          </div>
        </div>
      </CurrentViewContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
