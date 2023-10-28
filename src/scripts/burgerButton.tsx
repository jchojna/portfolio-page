import {
  flags,
  menuObj,
  sections,
  burgerButton,
  menuItems,
  menuButtons,
  introBox,
  menuUpperBackground,
  menuBottomBackground,
  firstTimeoutXs,
  secondTimeoutXs,
  pageHeader,
  pageContainer,
} from './variables';
import { items } from '../main';
import { handleMenuShadows } from './menu';
import { navigateToSection } from './navigation';

export const handleBurgerButton = () => {
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;

  const windowHeight = window.innerHeight;
  const activeintroItemHeight = items[menuObj.lastMenuItemIndex].height;
  const activeItemOffset = items[menuObj.lastMenuItemIndex].offset;
  const activeId = sections[menuObj.lastMenuItemIndex].id;
  const upperBackgroundHeight = activeintroItemHeight + activeItemOffset;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const upwardsOffset = activeItemOffset;
  const downwardsOffset =
    windowHeight - activeItemOffset - activeintroItemHeight;

  flags.isMenuTransforming = true;
  flags.isIntroMode = true;

  // hide burger button
  burgerButton.classList.remove('burgerButton--visible');

  // set starting position of menu items
  [...menuItems].forEach((item, index) => {
    const currentItemOffset = items[index].offset;
    const currentId = sections[index].id;

    item.classList.add('menu__item--visible');
    item.style.top =
      index <= menuObj.lastMenuItemIndex
        ? `${currentItemOffset - upwardsOffset}px`
        : `${currentItemOffset + downwardsOffset}px`;

    menuButtons[index].style.width = `${items[index].width}px`;
    item.classList.remove('menu__item--minimized');

    index !== menuObj.lastMenuItemIndex
      ? menuButtons[index].classList.remove(`menu__button--intro-${currentId}`)
      : false;
  });

  // set appearance of introBox and background
  introBox.classList.add('visuals__introBox--visible');
  menuUpperBackground.classList.remove(`visuals__background--${activeId}`);

  flags.isMobileHeader = false;

  //#region TIMEOUTS
  const firstTimeoutId = setTimeout(() => {
    // set menu items default position
    [...menuItems].forEach((item, index) => {
      item.style.top = `${items[index].offset}px`;
      item.classList.add('menu__item--animated');
    });

    // set introBox and menu backgrounds appearance
    introBox.style.top = `${activeItemOffset}px`;
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;

    // handle burger button's color
    burgerButton.classList.remove(`burgerButton--${activeId}`);

    // show all menu shadows
    handleMenuShadows('all', 'activate');

    clearTimeout(firstTimeoutId);

    // SECOND TIMEOUT
    const secondTimeoutId = setTimeout(() => {
      // navigate to top
      navigateToSection(0);

      // add pointer events to pageHeader
      pageHeader.classList.add('pageHeader--intro');
      pageContainer.classList.remove('pageContainer--visible');

      // handle menu items
      [...menuItems].forEach((item) => {
        item.classList.remove('menu__item--mobileHeader');
        item.classList.remove('menu__item--animated');
      });

      // handle introBox and backgrounds
      introBox.classList.remove('visuals__introBox--content');
      menuUpperBackground.classList.remove('visuals__background--animated');
      menuBottomBackground.classList.remove('visuals__background--animated');
      menuUpperBackground.style.height = '100%';
      menuBottomBackground.style.height = '100%';

      flags.isMenuTransforming = false;
      clearTimeout(secondTimeoutId);
    }, secondTimeoutXs);
  }, firstTimeoutXs);
};
