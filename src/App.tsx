import { useState } from 'react';

import Menu from './components/Menu';
// import Intro from './views/Intro';
// import About from './views/About';
// import Resume from './views/Resume';
// import Project from './views/Project';
// import Contact from './views/Contact';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Menu />
      {/* <Intro /> */}
      {/* <About /> */}
      {/* <Resume /> */}
      {/* <Project /> */}
      {/* <Contact /> */}
    </div>
  );
}

export default App;
