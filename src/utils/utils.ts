export const getCurrentSectionIndex = (
  totalOffset: number,
  sectionsOffsets: number[],
  isMobile: boolean = false
) => {
  const desktopMargin = isMobile ? 0 : window.innerHeight / 2;
  const currentSectionIndex = sectionsOffsets.findIndex(
    (offset) => totalOffset < offset - desktopMargin
  );
  return currentSectionIndex === -1
    ? sectionsOffsets.length - 1
    : currentSectionIndex - 1;
};

export const getOffsetedSectionIndex = (
  totalOffset: number,
  sectionsOffsets: number[]
) => {
  const currentSectionIndex = sectionsOffsets.findIndex(
    (offset) => totalOffset < offset
  );
  return currentSectionIndex === -1
    ? sectionsOffsets.length - 1
    : currentSectionIndex - 1;
};

export const getRelativeTopOffset = (
  totalOffset: number,
  sectionsOffsets: number[]
) => {
  const relativeTopOffset = sectionsOffsets
    .map((offset) => offset - totalOffset)
    .filter((offset) => offset > 0 && offset <= window.innerHeight);
  return relativeTopOffset.length >= 0 ? relativeTopOffset[0] : 0;
};

export const scrollToSection = (
  sectionsRef: React.RefObject<HTMLDivElement>,
  targetSectionIndex: number,
  isSmooth: boolean = true
) => {
  if (!sectionsRef.current) return;
  const targetSection = sectionsRef.current.children[targetSectionIndex];
  if (!(targetSection instanceof HTMLElement)) return;
  sectionsRef.current.scrollTo({
    top: targetSection.offsetTop,
    left: 0,
    behavior: isSmooth ? 'smooth' : 'instant',
  });
};

export const getViewLocation = (
  currentViewIndex: number,
  view: string,
  views: string[]
) => {
  const viewIndex = views.indexOf(view);
  return currentViewIndex === viewIndex
    ? 'current'
    : viewIndex > currentViewIndex
    ? 'next'
    : 'prev';
};

export const updateIndicatorStyle = (
  indicator: HTMLElement,
  isMenuMode: boolean,
  top: number,
  height: number
) => {
  if (isMenuMode) {
    indicator.style.top = `${top}px`;
    indicator.style.left = `${window.innerWidth / 2 + 20}px`;
    indicator.style.height = `${height}px`;
    indicator.style.width = `${height}px`;
  } else {
    indicator.style.top = `${top}px`;
    indicator.style.left = '0px';
    indicator.style.width = '20px';
  }
};

export const handleIndicator = () => {
  const indicator = document.querySelector('[data-id="indicator"]');
  const activeMenuItem = document.querySelector('[data-button-active="true"]');
  if (!indicator || !(indicator instanceof HTMLElement)) return;
  if (!activeMenuItem) return;
  const isMenuMode = activeMenuItem.getAttribute('data-menu-mode') === 'true';
  const { top, height } = activeMenuItem.getBoundingClientRect();

  indicator.style.transition = 'none';
  updateIndicatorStyle(indicator, isMenuMode, top, height);
  setTimeout(() => {
    indicator.style.transition = `
      background-color 0.6s,
      left 0.6s,
      top 0.6s 0.2s,
      width 0.6s 0.4s ease-out
    `;
  }, 0);
};
