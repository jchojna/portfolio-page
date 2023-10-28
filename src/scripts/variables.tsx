export const flags = {
  isIntroMode: true,
  isMenuTransforming: false,
  shouldSectionsBeUpdated: false,
  isScrollEnabled: false,
  isMobileHeader: false,
  media: null,
  menuLayout: null,
};

export const media = {
  sm: 380,
  md: 768,
  lg: 1200,
};

export const menuObj = {
  lastMenuItemIndex: 0,
  currentNavigationIndex: null,
};

// intro
export const intro = document.querySelector('.intro--js');
export const introLoader = document.getElementById('intro_loader');
export let introGrid = document.querySelector('.grid--js');
export const introBox = document.querySelector('.visuals__introBox--js');

// menu
export const menu = document.querySelector('.menu--js');
export const menuItems = document.querySelectorAll('.menu__item--js');
export const pageHeader = document.querySelector('.pageHeader--js');

export const pageContainer = document.querySelector('.pageContainer--js');
export const pageSections = document.querySelectorAll('.section--js');
export const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  node: section,
  offset: section.offsetTop,
}));
export const menuButtons = document.querySelectorAll('.menu__button--js');
export const menuIndicator = document.querySelector(
  '.pageHeader__indicator--js'
);

export const menuUpperBackground = document.querySelector(
  '.visuals__background--js-upper'
);
export const menuBottomBackground = document.querySelector(
  '.visuals__background--js-bottom'
);
export const burgerButton = document.querySelector('.burgerButton--js');
export const menuShadows = document.querySelectorAll('.menuSvg__shadow--js');
export const menuLabels = document.querySelectorAll('.label--js');
//#endregion
//#region [ Horizon ] VARIABLES - NAVIGATION
export const navigation = document.querySelector('.navigation--js');
export const navigationBackButton = document.querySelector(
  '.navigation__button--js-back'
);
export const navigationPrevButton = document.querySelector(
  '.navigation__button--js-prev'
);
export const navigationNextButton = document.querySelector(
  '.navigation__button--js-next'
);

export const firstTimeoutXs = 300;
export const secondTimeoutXs = 600;
export const firstTimeoutLg = 500;
export const secondTimeoutLg = 500;

export const otherProjectsTabs = document.querySelectorAll('.tab--js-other');

export const resumeTabs = document.querySelectorAll('.tab--js-resume');
export const resumeSubtabs = document.querySelectorAll('.subtab--js-resume');
export const tasktimerTabs = document.querySelectorAll('.tab--js-tasktimer');
export const portfolioTabs = document.querySelectorAll('.tab--js-portfolio');
export const hydrappTabs = document.querySelectorAll('.tab--js-hydrapp');
export const quotesTabs = document.querySelectorAll('.tab--js-quotes');
