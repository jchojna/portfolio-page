import { useState } from 'react';

import Header from './components/Header';
import Visuals from './components/Visuals';
// import Intro from './views/Intro';
// import About from './views/About';
// import Resume from './views/Resume';
// import Project from './views/Project';
// import Contact from './views/Contact';

import styles from './App.module.scss';

function App() {
  const [isIntroVisible, setIsIntroVisible] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <Header isIntroVisible={isIntroVisible} />
      {/* <Intro /> */}
      {/* <About /> */}
      {/* <Resume /> */}
      {/* <Project /> */}
      {/* <Contact /> */}
      <Visuals />
    </div>
  );
}

export default App;
