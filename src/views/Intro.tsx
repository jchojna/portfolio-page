import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import createIntro from '../utils/createIntro';

import classes from './Intro.module.scss';

const media = {
  sm: 380,
  md: 768,
  lg: 1200,
};
const introText = 'jakub chojna frontend projects';
const introItemWidth =
  window.innerWidth >= media.lg ? 35 : window.innerWidth >= media.md ? 35 : 20;
const introItemHeight = 2 * introItemWidth;

const Intro = () => {
  const [isIntroVisible, setIntroVisible] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement>(null);
  const endingBeforeRef = useRef<HTMLDivElement>(null);
  const endingAfterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    createIntro(
      introText,
      media,
      loaderRef,
      endingBeforeRef,
      endingAfterRef,
      gridRef,
      skipButtonRef,
      introItemWidth,
      introItemHeight
    );
  }, []);

  return (
    <div className={clsx(classes.intro, isIntroVisible && classes.visible)}>
      <div ref={loaderRef} className={classes.loader}></div>
      <div
        ref={endingBeforeRef}
        className={clsx(classes.ending, classes.before)}
      ></div>
      <div
        ref={endingAfterRef}
        className={clsx(classes.ending, classes.after)}
      ></div>
      <ul ref={gridRef} className={classes.grid}>
        {[...introText].map((char, index) => {
          return char !== ' ' ? (
            <li
              key={index}
              className={classes.gridItem}
              style={{
                width: `${introItemWidth}px`,
                height: `${introItemHeight}px`,
              }}
            >
              <div className={classes.char}>
                <svg className={classes.svg} viewBox="0 0 50 100">
                  <use href={`assets/svg/letters.svg#${char}`}></use>
                </svg>
                <svg
                  className={clsx(classes.svg, classes.shadow)}
                  viewBox="0 0 50 100"
                >
                  <use href={`assets/svg/letters.svg#${char}-shadow`}></use>
                </svg>
              </div>
            </li>
          ) : (
            <li
              key={index}
              className={classes.gridItem}
              style={{
                width: `${introItemWidth}px`,
                height: `${introItemHeight}px`,
              }}
            >
              <div className={clsx(classes.char, classes.separator)}></div>
            </li>
          );
        })}
      </ul>
      <button ref={skipButtonRef} className={classes.skipButton}>
        Skip Intro
      </button>
    </div>
  );
};

export default Intro;
