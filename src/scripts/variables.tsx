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

// intro
export const intro = document.querySelector('.intro--js');
export const introLoader = document.getElementById('intro_loader');
export let introGrid = document.querySelector('.grid--js');
export const introBox = document.querySelector('.visuals__introBox--js');

// menu
export const menuItems = document.querySelectorAll('.menu__item--js');
export const pageHeader = document.querySelector('.pageHeader--js');
