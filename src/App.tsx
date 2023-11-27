import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { getCurrentSectionIndex, getRelativeTopOffset } from './utils/utils';

import Header from './components/Header';
import Visuals from './components/Visuals';
// import Animation from './views/Animation';
import About from './views/About';
import Resume from './views/Resume';
import Project from './views/Project';
// import Contact from './views/Contact';

import projects from './content/projects.json';

import classes from './App.module.scss';

function App() {
  const [isIntro, setIntro] = useState<boolean>(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [relativeTopOffset, setRelativeTopOffset] = useState<number>(0);

  const sectionsRef = useRef<HTMLDivElement | null>(null);

  const sectionsClass = clsx({
    [classes.sections]: true,
    [classes.visible]: !isIntro,
  });

  const handleScroll = () => {
    if (!sectionsRef.current) return;
    const sectionsNodes = sectionsRef.current
      .children as HTMLCollectionOf<HTMLElement>;
    const sectionsScrolls = [...sectionsNodes].map((node) => node.offsetTop);
    const index = getCurrentSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    const offset =
      getRelativeTopOffset(
        Math.ceil(sectionsRef.current.scrollTop),
        sectionsScrolls
      ) || window.innerHeight;
    setCurrentSectionIndex((prevState) => {
      return prevState === index ? prevState : index;
    });
    setRelativeTopOffset(offset);
  };

  useEffect(() => {
    const sectionsRefCopy = sectionsRef.current;
    if (sectionsRefCopy) {
      sectionsRefCopy.addEventListener('scroll', handleScroll);
      return () => sectionsRefCopy.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className={classes.app}>
      <Header
        isIntro={isIntro}
        setIntro={setIntro}
        currentSectionIndex={currentSectionIndex}
        relativeTopOffset={relativeTopOffset}
      />
      <Visuals isIntro={isIntro} />
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
        {/* <Contact /> */}
      </div>
    </div>
  );
}

export default App;
