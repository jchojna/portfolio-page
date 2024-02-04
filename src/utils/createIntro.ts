type TimeoutId = NodeJS.Timeout | undefined;

const introText = 'jakub chojna frontend projects';
export const media = {
  sm: 380,
  md: 768,
  lg: 1200,
};
const introItemWidth =
  window.innerWidth >= media.lg ? 35 : window.innerWidth >= media.md ? 35 : 20;
const introItemHeight = 2 * introItemWidth;
// const visuals = document.querySelector('.visuals--js')!;
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

// intro
let introFirstTimeoutId: TimeoutId = undefined;
let introSecondTimeoutId: TimeoutId = undefined;
let introThirdTimeoutId: TimeoutId = undefined;
let introForthTimeoutId: TimeoutId = undefined;
let introCharIntervalId: TimeoutId = undefined;
const introFirstTimeoutInterval = 600;

// intervals
const loadCharInterval = 25;
const translateCharInterval = 0;
const introSecondTimeoutInterval = loadCharInterval * charTotal + 1000;
const introGridViewInterval = 2000;
const inBetweenTransition = 500;

const setIntroLoaderPosition = (loader: HTMLElement | null) => {
  if (!loader) return;
  loader.style.top = `${loader.offsetTop}px`;
  loader.style.left = `${loader.offsetLeft}px`;
};

const createGridItems = (
  classes,
  container: HTMLElement | null,
  introText: string,
  introItemWidth: number,
  introItemHeight: number
) => {
  if (!container) return;
  const intro = [...introText]
    .map((char) => {
      return char !== ' '
        ? `<li
              class="${classes.gridItem}"
              style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
            >
              <div class="${classes.gridCharacter} gridCharacter">
                <svg
                  class="${classes.svgCharacter}"
                  viewBox="0 0 50 100"
                >
                  <use href="assets/svg/letters.svg#${char}"></use>
                </svg>
                <svg
                  class="${classes.svgShadow}"
                  viewBox="0 0 50 100"
                >
                  <use href="assets/svg/letters.svg#${char}-shadow"></use>
                </svg>
              </div>
            </li>`
        : `<li
              class="${classes.gridItem}"
              style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
            >
              <div class="${classes.gridSeparator} gridCharacter"></div>
            </li>`;
    })
    .join('');
  container.innerHTML = intro;
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

const handleIntroLoader = (
  loader: HTMLElement | null,
  endingBefore: HTMLElement | null,
  transitionClass: string
) => {
  if (!loader || !endingBefore) return;
  loader.classList.add(transitionClass);
  loader.style.transitionDuration = `${introFirstTimeoutInterval}ms`;
  setSizeAndPosition(loader, endingBefore, introItemHeight);
};

// set position of ending elements
const setEndings = (
  index: number,
  grid: HTMLElement | null,
  endingBefore: HTMLElement | null,
  endingAfter: HTMLElement | null
) => {
  if (!grid || !endingBefore || !endingAfter) return;

  let endingBeforeTop: number | undefined = undefined;
  let endingBeforeLeft: number | undefined = undefined;
  let endingAfterTop: number | undefined = undefined;
  let endingAfterLeft: number | undefined = undefined;

  if (index < charTotal) {
    const beforeChild = grid.children[0];
    const afterChild = grid.children[index];
    if (beforeChild instanceof HTMLElement) {
      endingBeforeTop = beforeChild.offsetTop;
      endingBeforeLeft = beforeChild.offsetLeft - introItemWidth;
    }
    if (afterChild instanceof HTMLElement) {
      endingAfterTop = afterChild.offsetTop;
      endingAfterLeft = afterChild.offsetLeft;
    }
  } else {
    const prevAfterChild = grid.children[index - 1];
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
const loadChar = (
  grid: HTMLElement | null,
  endingBefore: HTMLElement | null,
  endingAfter: HTMLElement | null,
  visibleClass: string
) => {
  if (!grid || !endingBefore || !endingAfter) return;
  if (charIndex < charTotal) {
    const currentItem = grid.children[charIndex];
    if (currentItem instanceof HTMLElement) {
      currentItem.style.width = `${introItemWidth}px`;
      currentItem.style.height = `${introItemHeight}px`;
    }
    currentItem.classList.add(visibleClass);
    setEndings(charIndex, grid, endingBefore, endingAfter);
    charIndex++;
  } else {
    setEndings(charIndex, grid, endingBefore, endingAfter);
    clearInterval(introCharIntervalId);
  }
};

// animate characters position on grid change
const handleChars = (
  grid: HTMLElement | null,
  chars: NodeListOf<HTMLElement>,
  isInitial: boolean,
  classes
) => {
  if (!grid) return;
  if (isInitial) {
    [...chars].forEach((char, index) => {
      const gridItem = grid.children[index];
      if (!(gridItem instanceof HTMLElement)) return;
      const { offsetTop, offsetLeft } = gridItem;
      char.style.top = `${offsetTop}px`;
      char.style.left = `${offsetLeft}px`;
      char.style.width = `${introItemWidth}px`;
      char.style.height = `${introItemHeight}px`;
      char.classList.add(classes.transition);
    });
  } else {
    [...chars].forEach((char, index) => {
      const bias =
        maxColNum - minColNum < minColNum
          ? minColNum - (maxColNum - minColNum)
          : 0;

      if (index >= maxColNum - bias) {
        const gridItem = grid.children[index];
        if (!(gridItem instanceof HTMLElement)) return;
        const { offsetTop, offsetLeft } = gridItem;
        char.style.top = `${offsetTop}px`;
        char.style.left = `${offsetLeft}px`;
        char.classList.add(classes.color);
      }
    });
  }
};

// calculate grid's gaps and items paddings
const getColGap = () => {
  const rowNum = charTotal / minColNum;
  const gridHeight = rowNum * introItemHeight + (rowNum - 1) * rowGap;
  return (gridHeight - minColNum * introItemWidth) / (minColNum - 1);
};

// set grid's top margin
const updateTopMargin = (grid: HTMLElement | null) => {
  if (!grid) return;

  const topMargin = (window.innerHeight - grid.clientHeight) / 2;
  if (topMargin !== gridTopMargin || gridTopMargin === null) {
    gridTopMargin = topMargin;
    grid.style.marginTop = `${gridTopMargin}px`;
  }
};

const handleIntroAnimation = (
  classes,
  loader: HTMLElement | null,
  grid: HTMLElement | null,
  endingBefore: HTMLElement | null,
  endingAfter: HTMLElement | null,
  skipButton: HTMLElement | null
) => {
  if (!loader || !grid || !endingBefore || !endingAfter || !skipButton) return;

  // configure grid on start
  grid.classList.add(classes.visible);
  grid.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
  updateTopMargin(grid);

  // set sizes and position of ending elements
  endingBefore.style.width = `${introItemWidth}px`;
  endingBefore.style.height = `${introItemHeight}px`;
  endingAfter.style.width = `${introItemWidth}px`;
  endingAfter.style.height = `${introItemHeight}px`;
  setEndings(charIndex, grid, endingBefore, endingAfter);

  clearTimeout(introFirstTimeoutId);
  clearTimeout(introSecondTimeoutId);
  clearTimeout(introThirdTimeoutId);
  clearTimeout(introForthTimeoutId);

  // FIRST TIMEOUT
  introFirstTimeoutId = setTimeout(() => {
    skipButton.classList.add(classes.visible);

    // show ending elements
    endingBefore.classList.add(classes.visible);
    endingAfter.classList.add(classes.visible);
    loader.classList.add(classes.hidden);
    loader.classList.remove(classes.transition);

    // remove temporary child
    introCharIntervalId = setInterval(() => {
      loadChar(grid, endingBefore, endingAfter, classes.visible);
      updateTopMargin(grid);
    }, loadCharInterval);

    // SECOND TIMEOUT
    introSecondTimeoutId = setTimeout(() => {
      // assign fixed positioning to svg elements
      const gridChars = grid.querySelectorAll(
        '.gridCharacter'
      ) as NodeListOf<HTMLElement>;
      endingAfter.classList.remove(classes.visible);
      endingBefore.classList.remove(classes.visible);
      handleChars(grid, gridChars, true, classes);

      // set grid's column and row gaps to make grid a square
      const columnGap = getColGap();
      grid.style.columnGap = `${columnGap}px`;
      grid.style.rowGap = `${rowGap}px`;

      // decrease number of grid columns
      introCharIntervalId = setInterval(() => {
        if (maxColNum >= minColNum) {
          grid.style.gridTemplateColumns = `repeat(${maxColNum--}, 1fr)`;
          handleChars(grid, gridChars, false, classes);
          updateTopMargin(grid);
        } else {
          // when interval ends
          clearInterval(introCharIntervalId);
          setSizeAndPosition(loader, grid);

          // show intro loader
          loader.classList.remove(classes.hidden);
          const delay = introGridViewInterval - inBetweenTransition;
          loader.style.transition = `
            opacity ${inBetweenTransition}ms ${delay}ms,
            visibility 0s ${delay}ms
          `;

          // THIRD TIMEOUT
          introThirdTimeoutId = setTimeout(() => {
            skipButton.classList.remove(classes.visible);
            loader.classList.add(classes.transition);
            loader.style.transition = '';
            loader.style.transitionDuration = `${inBetweenTransition}ms`;
            grid.classList.remove(classes.visible);
            // setSizeAndPosition(loader, introBox);

            // FORTH TIMEOUT
            introForthTimeoutId = setTimeout(() => {
              // activeate menu items
              // [...menuItems].forEach((item) => {
              //   item.classList.add('menu__item--active');
              // });
              // show introBox
              // visuals.classList.add('visuals--visible');
              // hide intro
              // intro.classList.add('intro--hidden');
              // show page header
              // pageHeader.classList.add('pageHeader--visible');
            }, inBetweenTransition);
          }, introGridViewInterval);
        }
      }, translateCharInterval);
    }, introSecondTimeoutInterval);
  }, introFirstTimeoutInterval);
};

export const createIntro = (
  classes,
  intro: HTMLElement | null,
  loader: HTMLElement | null,
  grid: HTMLElement | null,
  endingBefore: HTMLElement | null,
  endingAfter: HTMLElement | null,
  skipButton: HTMLElement | null
) => {
  createGridItems(classes, grid, introText, introItemWidth, introItemHeight);
  setIntroLoaderPosition(loader);
  handleIntroLoader(loader, endingBefore, classes.transition);
  handleIntroAnimation(
    classes,
    loader,
    grid,
    endingBefore,
    endingAfter,
    skipButton
  );
};

export default createIntro;
