import clsx from 'clsx';

import { useEffect, useRef } from 'react';
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
  const loaderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const setIntroLoaderPosition = () => {
    if (!loaderRef.current) return;
    loaderRef.current.style.top = `${loaderRef.current.offsetTop}px`;
    loaderRef.current.style.left = `${loaderRef.current.offsetLeft}px`;
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

      endingBefore.style.top = `${endingBeforeTop}px`;
      endingBefore.style.left = `${endingBeforeLeft}px`;
      endingAfter.style.top = `${endingAfterTop}px`;
      endingAfter.style.left = `${endingAfterLeft}px`;
    };

    // show consecutive characters of intro text
    const loadChar = () => {
      if (charIndex < charTotal) {
        const currentItem = gridRef.current.children[charIndex];
        if (currentItem instanceof HTMLElement) {
          currentItem.style.width = `${introItemWidth}px`;
          currentItem.style.height = `${introItemHeight}px`;
        }
        currentItem.classList.add('grid__item--visible');
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
          char.classList.add('grid__char--transition');
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

            if (!char.classList.contains('grid__char--color')) {
              char.classList.add('grid__char--color');
            }
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
    gridRef.current.classList.add('grid--visible');
    gridRef.current.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
    updateTopMargin();

    // set sizes and position of ending elements
    endingBefore.style.width = `${introItemWidth}px`;
    endingBefore.style.height = `${introItemHeight}px`;
    endingAfter.style.width = `${introItemWidth}px`;
    endingAfter.style.height = `${introItemHeight}px`;
    setEndings(charIndex);

    // FIRST TIMEOUT
    clearTimeout(introFirstTimeoutId);
    clearTimeout(introSecondTimeoutId);
    clearTimeout(introThirdTimeoutId);
    clearTimeout(introForthTimeoutId);
    introFirstTimeoutId = setTimeout(() => {
      introSkip.classList.add('intro__skip--visible');

      // show ending elements
      endingBefore.classList.add('intro__ending--visible');
      endingAfter.classList.add('intro__ending--visible');
      introLoader.classList.add('intro__loader--hidden');
      introLoader.classList.remove('intro__loader--transition');

      // remove temporary child
      introCharIntervalId = setInterval(() => {
        loadChar();
        updateTopMargin();
      }, loadCharInterval);

      // SECOND TIMEOUT
      introSecondTimeoutId = setTimeout(() => {
        // assign fixed positioning to svg elements
        const gridChars = document.querySelectorAll(
          '.grid__char--js'
        ) as NodeListOf<HTMLElement>;
        endingAfter.classList.remove('intro__ending--visible');
        endingBefore.classList.remove('intro__ending--visible');
        handleChars(gridChars, true);

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
          } else {
            // when interval ends
            clearInterval(introCharIntervalId);
            setSizeAndPosition(introLoader, gridRef.current);

            // show intro loader
            introLoader.classList.remove('intro__loader--hidden');
            const delay = introGridViewInterval - inBetweenTransition;
            introLoader.style.transition = `
              opacity ${inBetweenTransition}ms ${delay}ms,
              visibility 0s ${delay}ms
            `;

            // THIRD TIMEOUT
            introThirdTimeoutId = setTimeout(() => {
              introSkip.classList.remove('intro__skip--visible');
              introLoader.classList.add('intro__loader--transition');
              introLoader.style.transition = '';
              introLoader.style.transitionDuration = `${inBetweenTransition}ms`;
              gridRef.current.classList.remove('grid--visible');
              setSizeAndPosition(introLoader, introBox);

              // FORTH TIMEOUT
              introForthTimeoutId = setTimeout(() => {
                // activeate menu items
                [...menuItems].forEach((item) => {
                  item.classList.add('menu__item--active');
                });

                // show introBox
                visuals.classList.add('visuals--visible');

                // hide intro
                intro.classList.add('intro--hidden');

                // show page header
                pageHeader.classList.add('pageHeader--visible');
              }, inBetweenTransition);
            }, introGridViewInterval);
          }
        }, translateCharInterval);
      }, introSecondTimeoutInterval);
    }, introFirstTimeoutInterval);
  };

  useEffect(() => {
    setIntroLoaderPosition();
    handleIntroAnimation();
    // handleIntroLoader();
  }, []);

  return (
    <div className={classes.intro}>
      <div ref={loaderRef} className={classes.loader}></div>
      <div className={clsx(classes.ending, classes.before)}></div>
      <div className={clsx(classes.ending, classes.after)}></div>
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
      <button className={classes.skipIntro}>Skip Intro</button>
    </div>
  );
};

export default Intro;
