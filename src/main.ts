// @ts-nocheck

import {
  flags,
  media,
  introLoader,
  introBox,
  menu,
  menuItems,
  pageHeader,
  pageContainer,
  pageSections,
  sections,
  menuButtons,
  menuObj,
  menuIndicator,
  menuUpperBackground,
  menuBottomBackground,
  navigation,
  navigationPrevButton,
  navigationNextButton,
  navigationBackButton,
  burgerButton,
  firstTimeoutLg,
  firstTimeoutXs,
  secondTimeoutLg,
  secondTimeoutXs,
  sectionContainers,
  otherProjectsTabs,
  resumeTabs,
  resumeSubtabs,
  tasktimerTabs,
  portfolioTabs,
  hydrappTabs,
  quotesTabs,
} from './scripts/variables';
import {
  setIntroLoaderPosition,
  loadIntroContent,
  handleIntroLoader,
  handleIntroAnimation,
} from './scripts/intro';
import {
  handleMenuButtons,
  handleMenuShadows,
  handleIntroMenu,
  handleIntroBox,
  handleMenuIndicator,
  handleIntroMenuItemClick,
  handleMenuItemClick,
} from './scripts/menu';
import { handleRepo } from './scripts/repoStats';
import { handleAccordion } from './scripts/accordion';
import {
  validateForm,
  validateEmail,
  validatePhone,
  validateMessage,
} from './scripts/contactForm';
import {
  handleExpandableContent,
  addReadMoreEvent,
} from './scripts/expandable';
import { handleBurgerButton } from './scripts/burgerButton';
import {
  handleWindowResize,
  handleTopMargins,
  setMediaFlags,
  setContainersMargins,
} from './scripts/resize';

import './main.scss';

const handleUserActivity = () => {
  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();
  if (!flags.isScrollEnabled) flags.isScrollEnabled = true;
};

export const updateSectionsOffsets = () => {
  [...sections].forEach((section, index) => {
    section.offset = pageSections[index].offsetTop;
  });
  flags.shouldSectionsBeUpdated = false;
};

const getCurrentSectionIndex = (scrollOffset) => {
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

const addAccordionEvents = (buttons, tabs) => {
  [...buttons].forEach((button, index) => {
    button.addEventListener('click', () => handleAccordion([...tabs], index));
  });
};

const handleBackButton = () => {
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

const handleMenuOnScroll = () => {
  if (flags.isScrollEnabled) {
    // handle indicator and active menu item on section change
    const newMenuItemIndex = getCurrentSectionIndex(0);

    if (newMenuItemIndex !== menuObj.lastMenuItemIndex) {
      const prevId = sections[menuObj.lastMenuItemIndex].id;
      menuButtons[menuObj.lastMenuItemIndex].classList.remove(
        `menu__button--intro-${prevId}`
      );
      menuButtons[menuObj.lastMenuItemIndex].classList.remove(
        'menu__button--active'
      );
      introBox.classList.remove(
        `visuals__introBox--${sections[menuObj.lastMenuItemIndex].id}`
      );
      handleMenuShadows(menuObj.lastMenuItemIndex, 'activate');

      // index change
      menuObj.lastMenuItemIndex = newMenuItemIndex;

      menuButtons[menuObj.lastMenuItemIndex].classList.add(
        'menu__button--active'
      );
      menuButtons[menuObj.lastMenuItemIndex].focus();
      introBox.classList.add(
        `visuals__introBox--${sections[menuObj.lastMenuItemIndex].id}`
      );
      handleMenuIndicator();
      handleMenuShadows(menuObj.lastMenuItemIndex, 'deactivate');
    }

    // handle all menu items appearance on local id change
    [...menuButtons].forEach((button, index) => {
      const singleItemOffset = items[index].offset;
      const currentSingleItemIndex = items[index].currentSectionIndex;
      const newSingleItemIndex = getCurrentSectionIndex(singleItemOffset);

      if (newSingleItemIndex !== currentSingleItemIndex) {
        const currentId = sections[currentSingleItemIndex].id;
        const newId = sections[newSingleItemIndex].id;
        button.classList.remove(`menu__button--${currentId}`);
        items[index].currentSectionIndex = newSingleItemIndex;
        button.classList.add(`menu__button--${newId}`);
      }
    });
  }
};

const handleMobileHeader = () => {
  if (window.innerWidth >= media.lg) return false;
  if (flags.isIntroMode) return false;
  if (window.pageYOffset <= 0) return false;

  const handleHeader = (index, action) => {
    const currentId = sections[index].id;

    if (action === 'activate') {
      menuItems[index].classList.remove('menu__item--visible');

      introBox.classList.remove(`visuals__introBox--${currentId}`);
      burgerButton.classList.remove(`burgerButton--${currentId}`);
      menuUpperBackground.classList.remove(`visuals__background--${currentId}`);
    } else if (action === 'deactivate') {
      menuItems[index].classList.add('menu__item--visible');

      introBox.classList.add(`visuals__introBox--${currentId}`);
      burgerButton.classList.add(`burgerButton--${currentId}`);
      menuUpperBackground.classList.add(`visuals__background--${currentId}`);
    }
  };
  const newActiveSectionIndex = getCurrentSectionIndex(0);

  // when index changes
  if (newActiveSectionIndex !== menuObj.lastMenuItemIndex) {
    handleHeader(menuObj.lastMenuItemIndex, 'activate');
    menuObj.lastMenuItemIndex = newActiveSectionIndex;
    handleHeader(menuObj.lastMenuItemIndex, 'deactivate');
  }
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

const handleNavOnScroll = () => {
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let scrollTimeoutId = null;
let scrollTotal = 0;

//#region [ Horizon ] VARIABLES - MAIN CONTENT
const resumeButtons = document.querySelectorAll('.tab__button--js-resume');
const resumeSubButtons = document.querySelectorAll(
  '.subtab__button--js-resume'
);
const tasktimerButtons = document.querySelectorAll(
  '.tab__button--js-tasktimer'
);
const portfolioButtons = document.querySelectorAll(
  '.tab__button--js-portfolio'
);
const hydrappButtons = document.querySelectorAll('.tab__button--js-hydrapp');
const quotesButtons = document.querySelectorAll('.tab__button--js-quotes');

const otherProjectsButtons = document.querySelectorAll(
  '.tab__button--js-other'
);

export const items = [...menuItems].map((item, index) => ({
  index,
  node: item,
  offset: item.offsetTop + menu.offsetTop,
  height: item.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(item.offsetTop + menu.offsetTop),
}));

//#region [ Horizon ] VARIABLES - CONTACT FORM
const formInputs = document.querySelectorAll('.form__input--js');
const userName = document.querySelector('.form__input--js-name');
const userEmail = document.querySelector('.form__input--js-email');
const userPhone = document.querySelector('.form__input--js-phone');
const userTitle = document.querySelector('.form__input--js-title');
const userMessage = document.querySelector('.form__input--js-message');
const formSubmitButton = document.querySelector('.form__submit--js');

const expandableContent = document.querySelectorAll('.js-expandable');

////////////////////////////////////////////////////////////////////////////////
// page load with no animation intro
// intro.classList.add('intro--hidden');
// [...menuItems].forEach((item) => item.classList.add('menu__item--active'));
// visuals.classList.add('visuals--visible');
// pageHeader.classList.add('pageHeader--visible');
// page load with no animation intro
////////////////////////////////////////////////////////////////////////////////

setMediaFlags();

setIntroLoaderPosition(introLoader);
loadIntroContent();
handleIntroMenu();

// handle page's accordions
handleAccordion([...resumeSubtabs]);
handleAccordion([...resumeTabs]);
handleAccordion([...tasktimerTabs]);
handleAccordion([...portfolioTabs]);
handleAccordion([...hydrappTabs]);
handleAccordion([...quotesTabs]);

if (flags.media === 'mediaXs') {
  handleAccordion([...otherProjectsTabs]);
} else {
  handleAccordion([...otherProjectsTabs], undefined, 'all');
}

// collapse expandable content on page load
window.onload = () => {
  handleIntroAnimation();
  handleIntroLoader();
  handleExpandableContent(expandableContent);

  setContainersMargins();
};

// fetch github api
// fetch('https://api.github.com/users/jchojna/repos')
//   .then((resp) => resp.json())
//   .then((resp) => handleRepo(resp));

window.addEventListener('resize', updateSectionsOffsets);
pageHeader.addEventListener('scroll', handleIntroBox);
window.addEventListener('resize', handleIntroBox);

window.addEventListener('resize', handleMenuIndicator);
pageHeader.addEventListener('scroll', handleMenuIndicator);

navigationPrevButton.addEventListener('click', navigateToSection);
navigationNextButton.addEventListener('click', navigateToSection);
navigationBackButton.addEventListener('click', handleBackButton);

[...menuButtons].forEach((link, index) => {
  link.index = index;
  link.addEventListener('click', handleIntroMenuItemClick);
  link.addEventListener('click', handleMenuItemClick);
  link.addEventListener('mousemove', handleIntroMenu);
});
burgerButton.addEventListener('click', handleBurgerButton);

// add event handling mobile header appearance
window.addEventListener('scroll', handleMobileHeader);

// MAIN CONTENT
pageContainer.addEventListener('mousedown', handleUserActivity);
pageContainer.addEventListener('touchstart', handleUserActivity);
pageContainer.addEventListener('wheel', handleUserActivity);
pageContainer.addEventListener('scroll', handleMenuOnScroll);
pageContainer.addEventListener('scroll', handleNavOnScroll);

window.addEventListener('resize', handleWindowResize);

addAccordionEvents(resumeButtons, resumeTabs);
addAccordionEvents(resumeSubButtons, resumeSubtabs);
addAccordionEvents(tasktimerButtons, tasktimerTabs);
addAccordionEvents(portfolioButtons, portfolioTabs);
addAccordionEvents(hydrappButtons, hydrappTabs);
addAccordionEvents(quotesButtons, quotesTabs);
addAccordionEvents(otherProjectsButtons, otherProjectsTabs);

addReadMoreEvent();

// SAVE FORM INPUTS VALUES TO LOCAL STORAGE
[...formInputs].forEach((input) => {
  input.addEventListener('keyup', (e) =>
    localStorage.setItem(e.target.id, e.target.value)
  );
  input.value = localStorage.getItem(input.id)
    ? localStorage.getItem(input.id)
    : '';
});

formSubmitButton.addEventListener('click', validateForm);
userEmail.addEventListener('keyup', validateEmail);
userPhone.addEventListener('keyup', validatePhone);
userMessage.addEventListener('keyup', validateMessage);
