import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Header from './components/Header';
import Projects from './components/Projects';
import About from './views/About';
import Contact from './views/Contact';
import Intro from './views/Intro';
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

  const sectionsRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const sectionsClass = clsx({
    [classes.sections]: true,
    [classes.visible]: !isMenuMode,
    [classes.smooth]: isSmoothScroll && !isMobile,
  });

  // set smooth scroll after some delay
  useEffect(() => {
    !isMenuMode && setTimeout(() => setSmoothScroll(true), 500);
  }, [isMenuMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classes.app}>
        <Intro />
        {isMobile ? (
          <MobileHeader
            isMenuMode={isMenuMode}
            setMenuMode={setMenuMode}
            sectionsRef={sectionsRef}
          />
        ) : (
          <Header
            isMenuMode={isMenuMode}
            setMenuMode={setMenuMode}
            sectionsRef={sectionsRef}
          />
        )}
        {/* <Animation /> */}
        <div ref={sectionsRef} className={sectionsClass}>
          <About />
          <Resume />
          <Projects />
          <Contact />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
