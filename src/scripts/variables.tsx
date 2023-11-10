export const flags: Flags = {
  isIntroMode: true,
  isMenuTransforming: false,
  shouldSectionsBeUpdated: false,
  isScrollEnabled: false,
  isFastScroll: false,
  isMobileHeader: false,
  media: null,
  menuLayout: null,
};
export const media: Media = {
  sm: 380,
  md: 768,
  lg: 1200,
};
export const menuObj: MenuObj = {
  lastMenuItemIndex: 0,
  currentNavigationIndex: 0,
};
// intro
export const introBox: HTMLElement = document.querySelector(
  '.visuals__introBox--js'
)!;
// menu
export const menu: HTMLElement = document.querySelector('.menu--js')!;
export const menuItems: NodeListOf<HTMLElement> =
  document.querySelectorAll('.menu__item--js');
export const menuButtons: NodeListOf<HTMLElement & { index: number }> =
  document.querySelectorAll('.menu__button--js');
export const menuIndicator: HTMLElement = document.querySelector(
  '.pageHeader__indicator--js'
)!;
export const menuUpperBackground: HTMLElement = document.querySelector(
  '.visuals__background--js-upper'
)!;
export const menuBottomBackground: HTMLElement = document.querySelector(
  '.visuals__background--js-bottom'
)!;
// navigation
export const burgerButton: HTMLElement =
  document.querySelector('.burgerButton--js')!;
export const navigation: HTMLElement =
  document.querySelector('.navigation--js')!;
// sections
export const pageHeader: HTMLElement =
  document.querySelector('.pageHeader--js')!;
export const pageContainer: HTMLElement =
  document.querySelector('.pageContainer--js')!;
export const pageSections: NodeListOf<HTMLElement> =
  document.querySelectorAll('.section--js');
export const sections: Section[] = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  node: section,
  offset: section.offsetTop,
}));
// timeouts
export const firstTimeoutXs: number = 300;
export const secondTimeoutXs: number = 600;
export const firstTimeoutLg: number = 500;
export const secondTimeoutLg: number = 500;
// tabs
export const resumeTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-resume');
export const resumeSubtabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.subtab--js-resume');
export const tasktimerTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-tasktimer');
export const portfolioTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-portfolio');
export const hydrappTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-hydrapp');
export const quotesTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-quotes');
export const otherProjectsTabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.tab--js-other');
