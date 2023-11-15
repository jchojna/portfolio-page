import { useState } from 'react';

import Header from './components/Header';
import Visuals from './components/Visuals';
// import Animation from './views/Animation';
import About from './views/About';
// import Resume from './views/Resume';
// import Project from './views/Project';
// import Contact from './views/Contact';

import styles from './App.module.scss';

function App() {
  const [isIntro, setIntro] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <Header isIntro={isIntro} setIntro={setIntro} />
      <Visuals isIntro={isIntro} />
      {/* <Animation /> */}
      <About />
      {/* <Resume /> */}
      {/* <Project /> */}
      {/* <Contact /> */}
    </div>
  );
}

export default App;
