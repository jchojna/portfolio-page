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
