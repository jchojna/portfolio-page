import {
  flags,
  media,
  introBox,
  menu,
  pageHeader,
  pageContainer,
  sections,
  menuItems,
  menuButtons,
  menuObj,
  menuIndicator,
  menuUpperBackground,
  menuBottomBackground,
  navigation,
  firstTimeoutLg,
  firstTimeoutXs,
  secondTimeoutLg,
  secondTimeoutXs,
  burgerButton,
} from './variables';
import { removeTransitionsOnEvent } from './utils';
import { items } from '../main';
import {
  handlePrevNextButtonsVisibility,
  navigateToSection,
  getCurrentSectionIndex,
} from './navigation';
import { updateSectionsOffsets } from './sections';

const menuShadows = document.querySelectorAll('.menuSvg__shadow--js');

const getCurrentItemIndex = (cursorYPosition) => {
  return (
    items.length -
    1 -
    [...items]
      .map((item) => item.offset)
      .reverse()
      .findIndex((offset) => cursorYPosition >= offset)
  );
};

export const handleIntroMenu = (e) => {
  if (flags.isMenuTransforming) return false;
  if (!flags.isIntroMode) return false;

  // handle intro menu on mouse event
  if (e && e.type === 'mousemove' && window.innerWidth >= media.lg) {
    const viewOffset = pageHeader.scrollTop;
    const currentItemIndex = getCurrentItemIndex(e.clientY + viewOffset);
    if (currentItemIndex >= items.length) return false;

    handleMenuItemColor(menuObj.lastMenuItemIndex, 'deactivate');
    menuObj.lastMenuItemIndex = currentItemIndex;
    handleMenuItemColor(menuObj.lastMenuItemIndex, 'activate');
    handleIntroBox();

    // handle intro menu on page load
  } else {
    handleIntroBox();
    handleMenuItemColor(menuObj.lastMenuItemIndex, 'activate');
  }
};

const handleMenuItemColor = (index, action) => {
  const id = sections[index].id;

  if (action === 'activate') {
    menuButtons[index].classList.add(`menu__button--intro-${id}`);
    introBox.classList.add(`visuals__introBox--${id}`);
  } else if (action === 'deactivate') {
    menuButtons[index].classList.remove(`menu__button--intro-${id}`);
    introBox.classList.remove(`visuals__introBox--${id}`);
  }
};

const handleNavOnClick = (index, action) => {
  const currentId = sections[index].id;
  // remove current appearance
  if (action === 'activate') {
    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${currentId}`);
    }
    handlePrevNextButtonsVisibility(index, 'hide');

    // add new appearance
  } else if (action === 'deactivate') {
    for (let child of navigation.children) {
      child.classList.remove(`navigation__button--${currentId}`);
    }
    handlePrevNextButtonsVisibility(index, 'show');
  }
};

export const handleIntroMenuItemClick = (e) => {
  if (!flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;

  const activeIndex = e.target.index;
  flags.isMenuTransforming = true;
  updateSectionsOffsets();

  //#region [ Horizon ] ON MOBILE DEVICES
  if (window.innerWidth < media.lg) {
    const windowHeight = window.innerHeight;
    const clickedintroItemHeight = items[activeIndex].height;
    const clickedItemOffset = items[activeIndex].offset;
    const clickedElementId = sections[activeIndex].id;
    const viewOffset = pageHeader.scrollTop;
    const upperBackgroundHeight =
      clickedintroItemHeight + clickedItemOffset - viewOffset;
    const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;

    // change items colors and set introbox position
    if (menuObj.lastMenuItemIndex !== activeIndex) {
      handleMenuItemColor(menuObj.lastMenuItemIndex, 'deactivate');
      menuObj.lastMenuItemIndex = activeIndex;
      handleMenuItemColor(menuObj.lastMenuItemIndex, 'activate');
    }
    handleIntroBox();
    // set flag to mobile header after handling introBox
    flags.isMobileHeader = true;
    flags.isIntroMode = false;

    // remove pointer events from pageHeader
    pageHeader.classList.remove('pageHeader--intro');
    pageContainer.classList.add('pageContainer--visible');

    // change menu items to be in a fixed position
    [...menuItems].forEach((item, index) => {
      item.classList.add('menu__item--mobileHeader');
      item.style.top = `${items[index].offset - viewOffset}px`;
    });

    // set initial link width as style property in order to be animated
    const buttonWidth = menuButtons[activeIndex].clientWidth;
    menuButtons[activeIndex].style.width = `${buttonWidth}px`;
    items[activeIndex].width = buttonWidth;

    // set backgrounds startings heights
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;

    //#region TIMEOUTS
    const firstTimeoutId = setTimeout(() => {
      const upwardsOffset = clickedItemOffset;
      const downwardsOffset =
        windowHeight - clickedItemOffset - clickedintroItemHeight;

      // set translated position of menu items
      [...menuItems].forEach((item, index) => {
        const currentItemOffset = items[index].offset;

        item.style.top =
          index <= activeIndex
            ? `${currentItemOffset - upwardsOffset}px`
            : `${currentItemOffset + downwardsOffset}px`;
        item.classList.add('menu__item--animated');
      });

      // set position of introBox
      introBox.classList.add('visuals__introBox--content');
      introBox.style.top = 0;

      // handle menu background
      menuUpperBackground.style.height = `${clickedintroItemHeight}px`;
      menuBottomBackground.style.height = 0;
      menuUpperBackground.classList.add('visuals__background--animated');
      menuBottomBackground.classList.add('visuals__background--animated');

      // remove pointer events from pageHeader
      pageHeader.classList.remove('pageHeader--intro');

      // hide all menu shadows
      handleMenuShadows('all', 'deactivate');

      navigateToSection(activeIndex);
      clearTimeout(firstTimeoutId);

      const secondTimeoutId = setTimeout(() => {
        // handle menu items
        [...menuItems].forEach((item, index) => {
          const sectionId = sections[index].id;

          if (index !== activeIndex) {
            item.classList.remove('menu__item--visible');
            item.classList.add('menu__item--minimized');
            item.style.top = 0;
            items[index].width = menuButtons[index].clientWidth;
            menuButtons[index].classList.add(
              `menu__button--intro-${sectionId}`
            );
          }
          item.classList.remove('menu__item--animated');
          menuButtons[index].style.width = '100%';
        });

        // handle introBox and menu background
        introBox.classList.remove('visuals__introBox--visible');
        menuUpperBackground.classList.add(
          `visuals__background--${clickedElementId}`
        );

        // show burger button
        burgerButton.classList.add('burgerButton--visible');
        burgerButton.classList.add(`burgerButton--${clickedElementId}`);

        // handle global flags
        flags.isMenuTransforming = false;

        clearTimeout(secondTimeoutId);
      }, secondTimeoutXs);
    }, firstTimeoutXs);
    //#endregion

    //#endregion

    //#region [ Horizon ] ON LARGE SCREEN DEVICES
  } else if (window.innerWidth >= media.lg) {
    flags.isScrollEnabled = false;
    flags.isIntroMode = false;
    menuObj.currentNavigationIndex = activeIndex;
    // handle introBox
    introBox.style.top = 0;
    introBox.classList.add('visuals__introBox--content');
    introBox.classList.add('visuals__introBox--halfWindow');
    // handle menu indicator
    menuIndicator.classList.add('pageHeader__indicator--animated');
    menuIndicator.classList.add('pageHeader__indicator--narrowed');
    // handle navigation appearance
    handleNavOnClick(activeIndex, 'activate');
    // navigate to selected section
    navigateToSection(activeIndex);

    //#region TIMEOUTS
    const firstTimeoutId = setTimeout(() => {
      // move introBox to the left and make indicator thiner
      introBox.classList.remove('visuals__introBox--centered');
      introBox.classList.add('visuals__introBox--fullWindow');
      menuIndicator.classList.add('pageHeader__indicator--visible');
      // translate menu and content to the left of the screen
      menu.classList.remove('menu--intro');
      pageContainer.classList.add('pageContainer--visible');
      pageHeader.classList.remove('pageHeader--intro');
      // set classnames and colors for every menu button
      handleMenuButtons(activeIndex, 'activate');
      handleMenuIndicator();
      // show navigation panel
      navigation.classList.add('navigation--visible');
      // hide shadow on active menu item
      menuShadows[activeIndex].classList.remove('menuSvg__shadow--visible');

      // SECOND TIMEOUT
      const secondTimeoutId = setTimeout(() => {
        // add smooth scrolling to page container
        pageContainer.classList.add('pageContainer--smooth');

        // hide menu backgrounds
        menuUpperBackground.classList.add('visuals__background--hidden');
        menuBottomBackground.classList.add('visuals__background--hidden');

        // hide introBox
        introBox.classList.remove('visuals__introBox--visible');

        // add transition effects to navigation buttons
        [...navigation.children].forEach((child) =>
          child.classList.add('navigation__button--animated')
        );

        // handle global flags
        flags.isMenuTransforming = false;
        flags.isIntroMode = false;

        clearTimeout(secondTimeoutId);
      }, secondTimeoutLg);
      clearTimeout(firstTimeoutId);
    }, firstTimeoutLg);
    //#endregion
  }
  //#endregion
};

export const handleMenuItemClick = (e) => {
  // works only in content view on desktop devices
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;
  if (window.innerWidth < media.lg) return false;

  const activeIndex = e.target.index;
  flags.isScrollEnabled = false;

  // navigate to selected section
  navigateToSection(activeIndex);
  // handle buttons appearance
  handleMenuButtonChange(activeIndex);

  // handle navigation and introBox appearance
  handleNavOnClick(menuObj.currentNavigationIndex, 'deactivate');
  handleMenuItemColor(menuObj.currentNavigationIndex, 'deactivate');
  handleMenuShadows(menuObj.currentNavigationIndex, 'activate');
  menuObj.currentNavigationIndex = activeIndex;
  handleNavOnClick(menuObj.currentNavigationIndex, 'activate');
  handleMenuItemColor(menuObj.currentNavigationIndex, 'activate');
  handleMenuShadows(menuObj.currentNavigationIndex, 'deactivate');
};

const handleMenuButtonChange = (index) => {
  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();

  if (menuObj.lastMenuItemIndex !== index) {
    handleMenuButtons(menuObj.lastMenuItemIndex, 'deactivate');
    menuObj.lastMenuItemIndex = index;
    handleMenuButtons(menuObj.lastMenuItemIndex, 'activate');
    handleMenuIndicator();
  }
};

export const handleMenuButtons = (activeIndex, action) => {
  // add new appearance
  if (action === 'activate') {
    const currentId = sections[activeIndex].id;

    [...menuButtons].forEach((button, buttonIndex) => {
      button.classList.add(`menu__button--${currentId}`);
      items[buttonIndex].currentSectionIndex = activeIndex;

      if (buttonIndex === activeIndex) {
        button.classList.add('menu__button--active');
        button.classList.remove(`menu__button--intro-${currentId}`);
      }
    });

    // remove current appearance
  } else if (action === 'deactivate') {
    [...menuButtons].forEach((button, buttonIndex) => {
      const currentId = sections[items[buttonIndex].currentSectionIndex].id;
      button.classList.remove(`menu__button--${currentId}`);

      if (buttonIndex === activeIndex) {
        button.classList.remove('menu__button--active');
        button.classList.remove(`menu__button--intro-${currentId}`);
      }
    });
  }
};

const getCurrentItemOffset = () => {
  if (flags.isMobileHeader) return false;
  [...items].forEach((item) => {
    item.offset = item.node.offsetTop + menu.offsetTop;
  });
  const currentYOffset = items[menuObj.lastMenuItemIndex].offset;
  const viewOffset = pageHeader.scrollTop;
  return currentYOffset - viewOffset;
};

export const handleIntroBox = (e) => {
  if (!flags.isIntroMode) return false;
  removeTransitionsOnEvent(e, introBox, 'visuals__introBox');
  introBox.style.top = `${getCurrentItemOffset()}px`;
};

export const handleMenuIndicator = (e) => {
  if (flags.isIntroMode) return false;
  if (flags.media === 'mediaXs') return false;
  removeTransitionsOnEvent(e, menuIndicator, 'pageHeader__indicator');
  menuIndicator.style.top = `${getCurrentItemOffset()}px`;
};

export const handleMenuShadows = (index, action) => {
  if (index === 'all') {
    [...menuShadows].forEach((shadow) =>
      action === 'activate'
        ? shadow.classList.add('menuSvg__shadow--visible')
        : shadow.classList.remove('menuSvg__shadow--visible')
    );
  } else {
    action === 'activate'
      ? menuShadows[index].classList.add('menuSvg__shadow--visible')
      : menuShadows[index].classList.remove('menuSvg__shadow--visible');
  }
};

export const handleMenuOnScroll = () => {
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
