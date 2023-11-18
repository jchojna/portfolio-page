import { useState } from 'react';
import clsx from 'clsx';

import Header from './components/Header';
import Visuals from './components/Visuals';
// import Animation from './views/Animation';
import About from './views/About';
import Resume from './views/Resume';
// import Project from './views/Project';
// import Contact from './views/Contact';

import classes from './App.module.scss';

function App() {
  const [isIntro, setIntro] = useState<boolean>(false);

  const sectionsClass = clsx({
    [classes.sections]: true,
    [classes.visible]: !isIntro,
  });

  return (
    <div className={classes.app}>
      {/* <Header isIntro={isIntro} setIntro={setIntro} /> */}
      {/* <Visuals isIntro={isIntro} /> */}
      {/* <Animation /> */}
      <div className={sectionsClass}>
        {/* <About /> */}
        <Resume />
        {/* <Project /> */}
        {/* <Contact /> */}
      </div>
    </div>
  );
}

export default App;
