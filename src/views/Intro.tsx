import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import createIntro from '../utils/createIntro';

import classes from './Intro.module.scss';

const Intro = () => {
  const [isIntroVisible, setIntroVisible] = useState<boolean>(true);

  const introRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const endingBeforeRef = useRef<HTMLDivElement | null>(null);
  const endingAfterRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    createIntro(
      classes,
      introRef.current,
      loaderRef.current,
      gridRef.current,
      endingBeforeRef.current,
      endingAfterRef.current,
      skipButtonRef.current
    );
    // setIntroVisible(false);
  }, []);

  return (
    <div
      ref={introRef}
      className={clsx(classes.intro, isIntroVisible && classes.visible)}
    >
      <div ref={loaderRef} className={classes.loader}></div>
      <div
        ref={endingBeforeRef}
        className={clsx(classes.ending, classes.before)}
      ></div>
      <div
        ref={endingAfterRef}
        className={clsx(classes.ending, classes.after)}
      ></div>
      <ul ref={gridRef} className={classes.grid}></ul>
      <button ref={skipButtonRef} className={classes.skipButton}>
        Skip Intro
      </button>
    </div>
  );
};

export default Intro;