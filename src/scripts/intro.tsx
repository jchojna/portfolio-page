import {
  media,
  intro,
  introLoader,
  introGrid,
  introBox,
  menuItems,
  pageHeader,
} from './variables';

let introText = 'jakub chojna frontend projects';
const introItemWidth =
  window.innerWidth >= media.lg ? 35 : window.innerWidth >= media.md ? 35 : 20;
const introItemHeight = 2 * introItemWidth;

const introSkip = document.querySelector('.intro__skip--js');
const visuals = document.querySelector('.visuals--js');

// intro
let introFirstTimeoutId = null;
let introSecondTimeoutId = null;
let introThirdTimeoutId = null;
let introForthTimeoutId = null;
let introCharIntervalId = null;
const introFirstTimeoutInterval = 600;

const endingBefore = document.querySelector('.intro__ending--js-before');
const endingAfter = document.querySelector('.intro__ending--js-after');

export const setIntroLoaderPosition = () => {
  introLoader.style.top = `${introLoader.offsetTop}px`;
  introLoader.style.left = `${introLoader.offsetLeft}px`;
};

export const loadIntroContent = () => {
  [...introText].forEach((char) => {
    const gridItem =
      char !== ' '
        ? `<li
        class="grid__item grid__item--js"
        style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
      >



        <div class="grid__char grid__char--js">
          <svg
            class="grid__svg grid__svg--js-char"
            viewBox="0 0 50 100"
          >
            <use href="assets/svg/letters.svg#${char}"></use>
          </svg>
          <svg
            class="grid__svg grid__svg--shadow"
            viewBox="0 0 50 100"
          >
            <use href="assets/svg/letters.svg#${char}-shadow"></use>
          </svg>
        </div>



      </li>`
        : `<li
        class="grid__item grid__item--js"
        style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
      >
        <div class="grid__char grid__char--separator grid__char--js"></div>
      </li>`;
    introGrid.insertAdjacentHTML('beforeend', gridItem);
  });
};

// assign size and position of one element to another
const setSizeAndPosition = (element, target, size) => {
  element.style.top = `${target.offsetTop}px`;
  element.style.left = `${target.offsetLeft}px`;
  element.style.width = size ? `${size}px` : `${target.clientWidth}px`;
  element.style.height = size ? `${size}px` : `${target.clientHeight}px`;
};

export const handleIntroLoader = () => {
  introLoader.classList.add('intro__loader--transition');
  introLoader.style.transitionDuration = `${introFirstTimeoutInterval}ms`;
  setSizeAndPosition(introLoader, endingBefore, introItemHeight);
};

export const handleIntroAnimation = () => {
  let charIndex = 0;
  const charTotal = introText.length;
  let maxColNum =
    window.innerWidth >= media.lg
      ? charTotal
      : window.innerWidth >= media.md
      ? charTotal / 2
      : charTotal / 3;
  let minColNum = 6;
  const rowGap = 2;
  let gridTopMargin = null;

  // intervals
  const loadCharInterval = 25; //30
  const translateCharInterval = 0; //100
  const introSecondTimeoutInterval = loadCharInterval * charTotal + 1000;
  const introGridViewInterval = 2000;
  const inBetweenTransition = 500;

  // set position of ending elements
  const setEndings = (index) => {
    if (index < charTotal) {
      const beforeChild = introGrid.children[0];
      const afterChild = introGrid.children[index];
      var endingBeforeTop = beforeChild.offsetTop;
      var endingBeforeLeft = beforeChild.offsetLeft - introItemWidth;
      var endingAfterTop = afterChild.offsetTop;
      var endingAfterLeft = afterChild.offsetLeft;
    } else {
      const prevAfterChildOffset = introGrid.children[index - 1].offsetLeft;
      var endingAfterLeft = prevAfterChildOffset + introItemWidth;
    }

    endingBefore.style.top = `${endingBeforeTop}px`;
    endingBefore.style.left = `${endingBeforeLeft}px`;
    endingAfter.style.top = `${endingAfterTop}px`;
    endingAfter.style.left = `${endingAfterLeft}px`;
  };

  // show consecutive characters of intro text
  const loadChar = () => {
    if (charIndex < charTotal) {
      const currentItem = introGrid.children[charIndex];
      currentItem.style.width = `${introItemWidth}px`;
      currentItem.style.height = `${introItemHeight}px`;
      currentItem.classList.add('grid__item--visible');
      setEndings(charIndex);
      charIndex++;
    } else {
      setEndings(charIndex);
      clearInterval(introCharIntervalId);
    }
  };

  // animate characters position on introGrid change
  const handleChars = (chars, isInitial) => {
    if (isInitial) {
      [...chars].forEach((char, index) => {
        const { offsetTop, offsetLeft } = introGrid.children[index];
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
          const { offsetTop, offsetLeft } = introGrid.children[index];
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
    const topMargin = (window.innerHeight - introGrid.clientHeight) / 2;

    if (topMargin !== gridTopMargin || gridTopMargin === null) {
      gridTopMargin = topMargin;
      introGrid.style.marginTop = `${gridTopMargin}px`;
    }
  };

  // configure introGrid on start
  introGrid.classList.add('grid--visible');
  introGrid.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
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
      const gridChars = document.querySelectorAll('.grid__char--js');
      endingAfter.classList.remove('intro__ending--visible');
      endingBefore.classList.remove('intro__ending--visible');
      handleChars(gridChars, true);

      // set introGrid's column and row gaps to make introGrid a square
      const columnGap = getColGap();
      introGrid.style.columnGap = `${columnGap}px`;
      introGrid.style.rowGap = `${rowGap}px`;

      // decrease number of grid columns
      introCharIntervalId = setInterval(() => {
        if (maxColNum >= minColNum) {
          introGrid.style.gridTemplateColumns = `repeat(${maxColNum--}, 1fr)`;
          handleChars(gridChars, false);
          updateTopMargin();
        } else {
          // when interval ends
          clearInterval(introCharIntervalId);
          setSizeAndPosition(introLoader, introGrid);

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
            introGrid.classList.remove('grid--visible');
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

export const skipIntro = () => {
  // mainly as a fallback against unpredicted animation fail and crash
  // clear timeouts and intervals
  clearTimeout(introFirstTimeoutId);
  clearTimeout(introSecondTimeoutId);
  clearTimeout(introThirdTimeoutId);
  clearTimeout(introForthTimeoutId);
  clearInterval(introCharIntervalId);
  introFirstTimeoutId = null;
  introSecondTimeoutId = null;
  introThirdTimeoutId = null;
  introForthTimeoutId = null;
  introCharIntervalId = null;

  [...menuItems].forEach((item) => {
    item.classList.add('menu__item--active');
  });

  intro.classList.add('intro--hidden');
  introSkip.classList.remove('intro__skip--visible');
  pageHeader.classList.add('pageHeader--visible');
  visuals.classList.add('visuals--visible');
};

introSkip.addEventListener('click', skipIntro);
