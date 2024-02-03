import clsx from 'clsx';

import { useEffect, useRef, useState } from 'react';
import classes from './Intro.module.scss';

const introText = 'jakub chojna frontend projects';
const media = {
  sm: 380,
  md: 768,
  lg: 1200,
};
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

  type TimeoutId = NodeJS.Timeout | undefined;
  let introFirstTimeoutId: TimeoutId = undefined;
  let introSecondTimeoutId: TimeoutId = undefined;
  let introThirdTimeoutId: TimeoutId = undefined;
  let introForthTimeoutId: TimeoutId = undefined;
  let introCharIntervalId: TimeoutId = undefined;
  const introFirstTimeoutInterval = 600;

  const setIntroLoaderPosition = () => {
    if (!loaderRef.current) return;
    loaderRef.current.style.top = `${loaderRef.current.offsetTop}px`;
    loaderRef.current.style.left = `${loaderRef.current.offsetLeft}px`;
  };

  // assign size and position of one element to another
  const setSizeAndPosition = (
    element: HTMLElement,
    target: HTMLElement,
    size?: number
  ) => {
    element.style.top = `${target.offsetTop}px`;
    element.style.left = `${target.offsetLeft}px`;
    element.style.width = size ? `${size}px` : `${target.clientWidth}px`;
    element.style.height = size ? `${size}px` : `${target.clientHeight}px`;
  };

  const handleIntroLoader = () => {
    // introLoader.classList.add('intro__loader--transition');
    loaderRef.current.style.transitionDuration = `${introFirstTimeoutInterval}ms`;
    setSizeAndPosition(
      loaderRef.current,
      endingBeforeRef.current,
      introItemHeight
    );
  };

  const handleIntroAnimation = () => {
    let charIndex = 0;
    const charTotal = introText.length;
    let maxColNum =
      window.innerWidth >= media.lg
        ? charTotal
        : window.innerWidth >= media.md
        ? charTotal / 2
        : charTotal / 3;
    const minColNum = 6;
    const rowGap = 2;
    let gridTopMargin: number | null = null;

    // intervals
    const loadCharInterval = 25; //30
    const translateCharInterval = 0; //100
    const introSecondTimeoutInterval = loadCharInterval * charTotal + 1000;
    const introGridViewInterval = 2000;
    const inBetweenTransition = 500;

    // set position of ending elements
    const setEndings = (index: number) => {
      let endingBeforeTop: number | undefined = undefined;
      let endingBeforeLeft: number | undefined = undefined;
      let endingAfterTop: number | undefined = undefined;
      let endingAfterLeft: number | undefined = undefined;

      if (index < charTotal) {
        const beforeChild = gridRef.current.children[0];
        const afterChild = gridRef.current.children[index];
        if (beforeChild instanceof HTMLElement) {
          endingBeforeTop = beforeChild.offsetTop;
          endingBeforeLeft = beforeChild.offsetLeft - introItemWidth;
        }
        if (afterChild instanceof HTMLElement) {
          endingAfterTop = afterChild.offsetTop;
          endingAfterLeft = afterChild.offsetLeft;
        }
      } else {
        const prevAfterChild = gridRef.current.children[index - 1];
        let prevAfterChildOffset: number = 0;
        if (prevAfterChild instanceof HTMLElement) {
          prevAfterChildOffset = prevAfterChild.offsetLeft;
        }
        endingAfterLeft = prevAfterChildOffset + introItemWidth;
      }

      endingBeforeRef.current.style.top = `${endingBeforeTop}px`;
      endingBeforeRef.current.style.left = `${endingBeforeLeft}px`;
      endingAfterRef.current.style.top = `${endingAfterTop}px`;
      endingAfterRef.current.style.left = `${endingAfterLeft}px`;
    };

    // show consecutive characters of intro text
    const loadChar = () => {
      if (charIndex < charTotal) {
        const currentItem = gridRef.current.children[charIndex];
        currentItem.style.visibility = 'inherit';
        if (currentItem instanceof HTMLElement) {
          currentItem.style.width = `${introItemWidth}px`;
          currentItem.style.height = `${introItemHeight}px`;
        }
        setEndings(charIndex);
        charIndex++;
      } else {
        setEndings(charIndex);
        clearInterval(introCharIntervalId);
      }
    };

    // animate characters position on introGrid change
    const handleChars = (
      chars: NodeListOf<HTMLElement>,
      isInitial: boolean
    ) => {
      if (isInitial) {
        [...chars].forEach((char, index) => {
          const { offsetTop, offsetLeft } = gridRef.current.children[
            index
          ] as HTMLElement;
          char.style.top = `${offsetTop}px`;
          char.style.left = `${offsetLeft}px`;
          char.style.width = `${introItemWidth}px`;
          char.style.height = `${introItemHeight}px`;
          char.style.position = 'fixed';

          // char.classList.add('grid__char--transition');
        });
      } else {
        [...chars].forEach((char, index) => {
          const bias =
            maxColNum - minColNum < minColNum
              ? minColNum - (maxColNum - minColNum)
              : 0;

          if (index >= maxColNum - bias) {
            const { offsetTop, offsetLeft } = gridRef.current.children[
              index
            ] as HTMLElement;
            char.style.top = `${offsetTop}px`;
            char.style.left = `${offsetLeft}px`;
            // char.style.top = 0;
            // char.style.left = 0;

            // if (!char.classList.contains('grid__char--color')) {
            //   char.classList.add('grid__char--color');
            // }
          }
        });
      }
    };

    // calculate introGrid's gaps and items paddings
    const getColGap = () => {
      const rowNum = charTotal / minColNum;
      const gridHeight = rowNum * introItemHeight + (rowNum - 1) * rowGap;
      return (gridHeight - minColNum * introItemWidth) / (minColNum - 1);
    };

    // set introGrid's top margin
    const updateTopMargin = () => {
      const topMargin = (window.innerHeight - gridRef.current.clientHeight) / 2;

      if (topMargin !== gridTopMargin || gridTopMargin === null) {
        gridTopMargin = topMargin;
        gridRef.current.style.marginTop = `${gridTopMargin}px`;
      }
    };

    // configure introGrid on start
    gridRef.current.style.display = 'grid';
    gridRef.current.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
    updateTopMargin();

    // set sizes and position of ending elements
    endingBeforeRef.current.style.width = `${introItemWidth}px`;
    endingBeforeRef.current.style.height = `${introItemHeight}px`;
    endingAfterRef.current.style.width = `${introItemWidth}px`;
    endingAfterRef.current.style.height = `${introItemHeight}px`;
    setEndings(charIndex);

    // FIRST TIMEOUT
    clearTimeout(introFirstTimeoutId);
    clearTimeout(introSecondTimeoutId);
    clearTimeout(introThirdTimeoutId);
    clearTimeout(introForthTimeoutId);

    introFirstTimeoutId = setTimeout(() => {
      skipButtonRef.current.style.opacity = '1';
      skipButtonRef.current.style.visibility = 'visible';
      skipButtonRef.current.style.transition =
        'color 0.2s, opacity 0.3s, visibility 0s';

      // show ending elements
      endingBeforeRef.current.style.opacity = 1;
      endingBeforeRef.current.style.visibility = 'inherit';
      endingBeforeRef.current.style.transition = 'opacity 0s, visibility 0s';
      endingAfterRef.current.style.opacity = 1;
      endingAfterRef.current.style.visibility = 'inherit';
      endingAfterRef.current.style.transition = 'opacity 0s, visibility 0s';

      loaderRef.current.style.opacity = 0;
      loaderRef.current.style.visibility = 'hidden';
      loaderRef.current.style.transition = 'opacity 0.5s, visibility 0s';

      // remove temporary child
      introCharIntervalId = setInterval(() => {
        loadChar();
        updateTopMargin();
      }, loadCharInterval);

      // SECOND TIMEOUT
      introSecondTimeoutId = setTimeout(() => {
        // assign fixed positioning to svg elements
        const gridChars = [...gridRef.current.children].map(
          (child) => child.firstElementChild
        );

        endingBeforeRef.current.style.opacity = null;
        endingBeforeRef.current.style.visibility = null;
        endingBeforeRef.current.style.transition = null;
        endingAfterRef.current.style.opacity = null;
        endingAfterRef.current.style.visibility = null;
        endingAfterRef.current.style.transition = null;
        handleChars(gridChars, true);
        // return;

        // set introGrid's column and row gaps to make introGrid a square
        const columnGap = getColGap();
        gridRef.current.style.columnGap = `${columnGap}px`;
        gridRef.current.style.rowGap = `${rowGap}px`;

        // decrease number of grid columns
        introCharIntervalId = setInterval(() => {
          if (maxColNum >= minColNum) {
            gridRef.current.style.gridTemplateColumns = `repeat(${maxColNum--}, 1fr)`;
            handleChars(gridChars, false);
            updateTopMargin();
            // debugger;
          } else {
            // when interval ends
            clearInterval(introCharIntervalId);
            setSizeAndPosition(loaderRef.current, gridRef.current);

            // show intro loader
            loaderRef.current.style.opacity = 1;
            loaderRef.current.style.visibility = 'inherit';
            const delay = introGridViewInterval - inBetweenTransition;
            loaderRef.current.style.transition = `
              opacity ${inBetweenTransition}ms ${delay}ms,
              visibility 0s ${delay}ms
            `;

            // THIRD TIMEOUT
            introThirdTimeoutId = setTimeout(() => {
              skipButtonRef.current.style = null;

              loaderRef.current.style.transition = null;
              loaderRef.current.style.transitionDuration = `${inBetweenTransition}ms`;
              gridRef.current.classList.remove('visible');
              // setSizeAndPosition(loaderRef.current, introBox);

              // FORTH TIMEOUT
              introForthTimeoutId = setTimeout(() => {
                // activeate menu items
                // [...menuItems].forEach((item) => {
                //   item.classList.add('menu__item--active');
                // });
                // show introBox
                // visuals.classList.add('visuals--visible');
                // hide intro
                // setIntroVisible(false);
                // show page header
                // pageHeader.classList.add('pageHeader--visible');
              }, inBetweenTransition);
            }, introGridViewInterval);
          }
        }, translateCharInterval);
      }, introSecondTimeoutInterval);
    }, introFirstTimeoutInterval);
  };

  useEffect(() => {
    setIntroLoaderPosition();
    handleIntroLoader();
    handleIntroAnimation();
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
