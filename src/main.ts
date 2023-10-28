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
  handleMenuShadows,
  handleIntroMenu,
  handleIntroBox,
  handleMenuIndicator,
  handleIntroMenuItemClick,
  handleMenuItemClick,
  handleMenuOnScroll,
} from './scripts/menu';
import { handleRepo } from './scripts/repoStats';
import { handleAccordion, addAccordionEvents } from './scripts/accordion';
import {
  validateForm,
  validateEmail,
  validatePhone,
  validateMessage,
  addFormEvents,
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
import {
  handleBackButton,
  navigateToSection,
  addNavigationEvents,
  handleNavOnScroll,
  getCurrentSectionIndex,
} from './scripts/navigation';
import { handleUserActivity, updateSectionsOffsets } from './scripts/sections';
import { handleMobileHeader } from './scripts/mobileHeader';

import './main.scss';

let scrollTimeoutId = null;
let scrollTotal = 0;

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

const formInputs = document.querySelectorAll('.form__input--js');

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
handleIntroAnimation();
handleIntroLoader();
handleExpandableContent(expandableContent);

setContainersMargins();

// fetch github api
// fetch('https://api.github.com/users/jchojna/repos')
//   .then((resp) => resp.json())
//   .then((resp) => handleRepo(resp));

window.addEventListener('resize', updateSectionsOffsets);
pageHeader.addEventListener('scroll', handleIntroBox);
window.addEventListener('resize', handleIntroBox);

window.addEventListener('resize', handleMenuIndicator);
pageHeader.addEventListener('scroll', handleMenuIndicator);

addNavigationEvents();

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

addFormEvents();
