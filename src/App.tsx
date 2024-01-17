import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';

import Header from './components/Header';
// import Animation from './views/Animation';
import About from './views/About';
import Resume from './views/Resume';
import Project from './views/Project';
import Contact from './views/Contact';

import projects from './content/projects.json';

import classes from './App.module.scss';
import MobileHeader from './components/MobileHeader';

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
    <div className={classes.app}>
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
        {projects.map(({ name, title, about, features, icons, url }) => (
          <Project
            key={name}
            name={name}
            title={title}
            about={about}
            features={features}
            icons={icons}
            url={url}
          />
        ))}
        <Contact />
      </div>
    </div>
  );
}

export default App;
