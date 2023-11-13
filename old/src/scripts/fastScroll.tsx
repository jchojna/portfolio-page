import {
  flags,
  media,
  menuObj,
  pageSections,
  pageContainer,
  sections,
} from './variables';
import { navigateToSection } from './navigation';

// @ts-ignore
const handleFastScroll = (e: WheelEvent) => {
  // function resetting timeout and scroll accumulator
  /* const reset = () => {
    clearTimeout(scrollTimeoutId);
    scrollTimeoutId = null;
    scrollTotal = 0;
  } */
  if (window.innerWidth < media.lg) return false;
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;
  if (!flags.isFastScroll) return false;

  // @ts-ignore
  const goToNextSection = () => {
    if (menuObj.lastMenuItemIndex < pageSections.length - 1) {
      if (
        pageContainer.scrollTop >= sections[menuObj.lastMenuItemIndex].offset
      ) {
        const nextsectionOffset = sections[++menuObj.lastMenuItemIndex].offset;
        pageContainer.scrollTo(0, nextsectionOffset);
      }
    }
  };
  // when scrolling down
  /* if (e.deltaY > 0) {
    scrollTotal += 1;
    if (scrollTimeoutId === null) {
      scrollTimeoutId = setTimeout(() => {
        if (scrollTotal >= 8) {
          goToNextSection();
          reset();
        } else {
          reset();
        }
      }, 100);
    }
    // when scrolling up
  } else {
    reset();
  } */
  if (e.deltaY > 0) {
    //e.preventDefault();
    flags.isScrollEnabled = false;

    if (!flags.isFastScroll) navigateToSection(++menuObj.lastMenuItemIndex);

    //goToNextSection();
  }
};
