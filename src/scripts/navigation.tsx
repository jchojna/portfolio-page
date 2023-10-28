import {
  flags,
  media,
  menuObj,
  sections,
  pageContainer,
  introBox,
  pageHeader,
  pageSections,
  navigation,
  menu,
  menuButtons,
  menuIndicator,
  menuUpperBackground,
  menuBottomBackground,
  firstTimeoutLg,
  secondTimeoutLg,
} from './variables';
import { handleMenuButtons, handleMenuShadows, handleIntroBox } from './menu';

const navigationBackButton = document.querySelector(
  '.navigation__button--js-back'
);
const navigationPrevButton = document.querySelector(
  '.navigation__button--js-prev'
);
const navigationNextButton = document.querySelector(
  '.navigation__button--js-next'
);

export const handleBackButton = () => {
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;

  const currentId = sections[menuObj.lastMenuItemIndex].id;
  flags.isMenuTransforming = true;
  flags.isIntroMode = true;
  flags.isScrollEnabled = false;

  // handle intro background
  menuUpperBackground.classList.remove('visuals__background--hidden');
  menuBottomBackground.classList.remove('visuals__background--hidden');

  // handle menu indicator
  menuIndicator.classList.remove('pageHeader__indicator--narrowed');
  menuIndicator.classList.add('pageHeader__indicator--centered');

  // handle introBox
  introBox.classList.add('visuals__introBox--centered');
  introBox.classList.remove('visuals__introBox--fullWindow');
  introBox.classList.add('visuals__introBox--visible');
  introBox.classList.add(`visuals__introBox--${currentId}`);

  // translate menu and content back to the right of the screen
  menu.classList.add('menu--intro');
  pageHeader.classList.add('pageHeader--intro');
  pageContainer.classList.remove('pageContainer--visible');
  pageContainer.classList.remove('pageContainer--smooth');

  // handle navigation
  navigation.classList.remove('navigation--visible');

  // remove transition effects from navigation buttons
  [...navigation.children].forEach((child) => {
    child.classList.remove('navigation__button--animated');
    child.classList.remove(`navigation__button--${currentId}`);
  });

  // change colors of menu items to default
  handleMenuButtons(menuObj.lastMenuItemIndex, 'deactivate');
  menuButtons[menuObj.lastMenuItemIndex].classList.add(
    `menu__button--intro-${currentId}`
  );
  handleMenuShadows(menuObj.lastMenuItemIndex, 'activate');

  // FIRST TIMEOUT
  const firstTimeoutId = setTimeout(() => {
    // handle introBox
    handleIntroBox();
    introBox.classList.remove('visuals__introBox--halfWindow');
    clearTimeout(firstTimeoutId);

    // SECOND TIMEOUT
    const secondTimeoutId = setTimeout(() => {
      // handle introBox
      introBox.classList.remove('visuals__introBox--content');

      // handle menu indicator
      menuIndicator.classList.remove('pageHeader__indicator--visible');
      menuIndicator.classList.remove('pageHeader__indicator--animated');
      menuIndicator.classList.remove('pageHeader__indicator--centered');
      menuIndicator.style.top = '';

      // handle global flags
      flags.isMenuTransforming = false;
      clearTimeout(secondTimeoutId);
    }, secondTimeoutLg);
  }, firstTimeoutLg);
};

export const handlePrevNextButtonsVisibility = (index, action) => {
  const lastElementIndex = sections.length - 1;
  if (index === 0 || index === lastElementIndex) {
    if (action === 'hide') {
      index === 0
        ? navigationPrevButton.classList.add('navigation__button--hidden')
        : navigationNextButton.classList.add('navigation__button--hidden');
    } else if (action === 'show') {
      index === 0
        ? navigationPrevButton.classList.remove('navigation__button--hidden')
        : navigationNextButton.classList.remove('navigation__button--hidden');
    }
  }
};

export const navigateToSection = (e) => {
  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();
  let targetIndex = e;

  // get target index
  if (e.target === navigationPrevButton) {
    if ((targetIndex = menuObj.currentNavigationIndex > 0)) {
      targetIndex = --menuObj.currentNavigationIndex;
      flags.isScrollEnabled = true;
    } else return false;
  } else if (e.target === navigationNextButton) {
    if (
      (targetIndex = menuObj.currentNavigationIndex < pageSections.length - 1)
    ) {
      targetIndex = ++menuObj.currentNavigationIndex;
      flags.isScrollEnabled = true;
    } else return false;
  }

  // scroll to target index
  if (window.innerWidth >= media.lg) {
    const sectionOffset = sections[targetIndex].offset;
    pageContainer.scrollTo(0, sectionOffset);
  } else {
    const sectionOffset = sections[targetIndex].offset;
    window.scrollTo(0, sectionOffset);
  }
};

export const addNavigationEvents = () => {
  navigationPrevButton.addEventListener('click', navigateToSection);
  navigationNextButton.addEventListener('click', navigateToSection);
  navigationBackButton.addEventListener('click', handleBackButton);
};

export const getCurrentSectionIndex = (scrollOffset) => {
  const currentOffset =
    window.innerWidth >= media.lg
      ? pageContainer.scrollTop
      : window.pageYOffset;

  return (
    sections.length -
    1 -
    [...sections]
      .map((section) => section.offset)
      .reverse()
      .findIndex((offset) => currentOffset >= offset - scrollOffset)
  );
};

const getCurrentNavigationIndex = () => {
  const navigationOffset = navigation.offsetTop + navigation.clientHeight / 2;
  return getCurrentSectionIndex(navigationOffset);
};

export const handleNavOnScroll = () => {
  if (flags.isIntroMode) return false;

  const updatedNavigationIndex = getCurrentNavigationIndex();

  // change navigation elements class names when index changes
  if (updatedNavigationIndex !== menuObj.currentNavigationIndex) {
    const currentId = sections[menuObj.currentNavigationIndex].id;
    const nextId = sections[updatedNavigationIndex].id;

    // remove current appearance
    for (let child of navigation.children) {
      child.classList.remove(`navigation__button--${currentId}`);
      handlePrevNextButtonsVisibility(menuObj.currentNavigationIndex, 'show');
    }
    // update navigation index
    menuObj.currentNavigationIndex = updatedNavigationIndex;

    // add new appearance
    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${nextId}`);
      handlePrevNextButtonsVisibility(menuObj.currentNavigationIndex, 'hide');
    }
  }
};
