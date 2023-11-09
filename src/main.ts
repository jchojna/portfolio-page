import { addAccordionEvents, handleAccordion } from './scripts/accordion';
import { handleBurgerButton } from './scripts/burgerButton';
import { addFormEvents } from './scripts/contactForm';
import {
  addReadMoreEvent,
  handleExpandableContent,
} from './scripts/expandable';
import {
  handleIntroAnimation,
  handleIntroLoader,
  loadIntroContent,
  setIntroLoaderPosition,
} from './scripts/intro';
import {
  handleIntroBox,
  handleIntroMenu,
  handleIntroMenuItemClick,
  handleMenuIndicator,
  handleMenuItemClick,
  handleMenuOnScroll,
} from './scripts/menu';
import { handleMobileHeader } from './scripts/mobileHeader';
import {
  addNavigationEvents,
  getCurrentSectionIndex,
  handleNavOnScroll,
} from './scripts/navigation';
import {
  handleWindowResize,
  setContainersMargins,
  setMediaFlags,
} from './scripts/resize';
import { handleUserActivity, updateSectionsOffsets } from './scripts/sections';
import {
  burgerButton,
  flags,
  hydrappTabs,
  menu,
  menuButtons,
  menuItems,
  otherProjectsTabs,
  pageContainer,
  pageHeader,
  portfolioTabs,
  quotesTabs,
  resumeSubtabs,
  resumeTabs,
  tasktimerTabs,
} from './scripts/variables';

import './main.scss';

const resumeButtons: NodeListOf<Element> = document.querySelectorAll(
  '.tab__button--js-resume'
);
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

export const items: Item[] = [...menuItems].map((item, index) => ({
  index,
  node: item,
  offset: item.offsetTop + item.offsetTop,
  height: item.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(item.offsetTop + menu.offsetTop),
}));

const formInputs: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('.form__input--js');

////////////////////////////////////////////////////////////////////////////////
// page load with no animation intro
// intro.classList.add('intro--hidden');
// [...menuItems].forEach((item) => item.classList.add('menu__item--active'));
// visuals.classList.add('visuals--visible');
// pageHeader.classList.add('pageHeader--visible');
// page load with no animation intro
////////////////////////////////////////////////////////////////////////////////

setMediaFlags();
setIntroLoaderPosition();
loadIntroContent();
handleIntroMenu(event);
handleIntroAnimation();
handleIntroLoader();
handleExpandableContent();
setContainersMargins();

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
  input.addEventListener('keyup', (event) => {
    const target = event.target as HTMLInputElement;
    target && localStorage.setItem(target.id, target.value);
  });
  input.value = localStorage.getItem(input.id) || '';
});

addFormEvents();
