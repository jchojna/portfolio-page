import clsx from 'clsx';
import { useEffect, useRef } from 'react';

import createIntro from '../utils/createIntro';

import classes from './Intro.module.scss';

type IntroProps = {
  indicator: HTMLDivElement | null;
  isIntroDone: boolean;
  setIntroDone: () => void;
};

const Intro = ({ indicator, isIntroDone, setIntroDone }: IntroProps) => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const endingBeforeRef = useRef<HTMLDivElement | null>(null);
  const endingAfterRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLUListElement | null>(null);
  const skipButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!indicator) return;
    const runIntro = async () => {
      await createIntro(
        classes,
        loaderRef.current,
        gridRef.current,
        endingBeforeRef.current,
        endingAfterRef.current,
        skipButtonRef.current,
        indicator
      );
      setIntroDone();
    };
    runIntro();
  }, [indicator, setIntroDone]);

  return (
    <div
      ref={introRef}
      className={clsx(classes.intro, !isIntroDone && classes.visible)}
    >
      <div
        ref={loaderRef}
        className={clsx(classes.loader, classes.hidden)}
      ></div>
      <div
        ref={endingBeforeRef}
        className={clsx(classes.ending, classes.before)}
      ></div>
      <div
        ref={endingAfterRef}
        className={clsx(classes.ending, classes.after)}
      ></div>
      <ul ref={gridRef} className={classes.grid}></ul>
      <button
        ref={skipButtonRef}
        className={classes.skipButton}
        onClick={setIntroDone}
      >
        Skip Intro
      </button>
    </div>
  );
};

export default Intro;
