import {
  flags,
  media,
  menu,
  menuObj,
  menuItems,
  menuButtons,
  menuIndicator,
  menuUpperBackground,
  menuBottomBackground,
  burgerButton,
  pageHeader,
  pageContainer,
  otherProjectsTabs,
  navigation,
  introBox,
  sections,
  resumeTabs,
  resumeSubtabs,
  tasktimerTabs,
  portfolioTabs,
  hydrappTabs,
  quotesTabs,
} from './variables';
import { items } from '../main';
import { handleMenuShadows, handleIntroBox } from './menu';
import { handleAccordion } from './accordion';

const sectionContainers: NodeListOf<HTMLElement> = document.querySelectorAll(
  '.section__container--js'
);
const minTopMargin = 30;

const getCurrentMedia = () => {
  return window.innerWidth >= media.lg
    ? 'mediaLg'
    : window.innerWidth >= media.md
    ? 'mediaMd'
    : window.innerWidth >= media.sm
    ? 'mediaSm'
    : 'mediaXs';
};

export const handleTopMargins = (element: HTMLElement, distance: number) => {
  // this functionality I found more reasonable to be handled in JS,
  // because of expandable content inside section containers
  // distorting and complicating content layout
  const margin = (window.innerHeight - element.clientHeight) / 2;
  element.style.marginTop = `${margin > distance ? margin : distance}px`;
};

export const setContainersMargins = () => {
  // set each section's container top margin
  if (flags.media === 'mediaLg') {
    [...sectionContainers].forEach((container) => {
      handleTopMargins(container, minTopMargin);
    });
  }
};

const getMenuLayout = (): string => {
  return window.innerWidth >= media.lg ? 'side' : 'burger';
};

export const handleWindowResize = () => {
  const menuLayout = getMenuLayout();
  const media = getCurrentMedia();

  // update top margin only on large screen devices
  if (media === 'mediaLg') {
    [...sectionContainers].forEach((container) => {
      handleTopMargins(container, minTopMargin);
    });
  }

  // handle changes on breakpoint
  if (menuLayout !== flags.menuLayout) {
    flags.menuLayout = menuLayout;
    flags.isMobileHeader = false;
    flags.isIntroMode = true;

    // handle main containers
    pageContainer.classList.remove('pageContainer--visible');
    pageContainer.classList.remove('pageContainer--smooth');
    pageHeader.classList.add('pageHeader--intro');
    menu.classList.add('menu--intro');
    navigation.classList.remove('navigation--visible');

    // update menu items heights
    [...menuItems].forEach(
      (item, index) => (items[index].height = item.clientHeight)
    );
    [...navigation.children].forEach((child) => {
      child.classList.remove('navigation__button--hidden');
    });

    // show all menu shadows
    handleMenuShadows(-2, 'activate');

    // handle introBox and menu indicator
    introBox.classList.add('visuals__introBox--visible');
    introBox.classList.add('visuals__introBox--centered');
    introBox.classList.remove('visuals__introBox--fullWindow');
    introBox.classList.remove('visuals__introBox--halfWindow');
    introBox.classList.remove('visuals__introBox--content');
    menuIndicator.classList.remove('pageHeader__indicator--visible');
    menuIndicator.style.top = '0px';

    // collapse accordion sections
    handleAccordion([...resumeSubtabs]);
    handleAccordion([...resumeTabs]);
    handleAccordion([...tasktimerTabs]);
    handleAccordion([...portfolioTabs]);
    handleAccordion([...hydrappTabs]);
    handleAccordion([...quotesTabs]);

    handleIntroBox();

    switch (menuLayout) {
      // load configuration for large screens
      case 'side':
        const currentId = sections[menuObj.lastMenuItemIndex].id;

        // change menu items to be in a static position
        [...menuItems].forEach((item) => {
          item.classList.remove('menu__item--mobileHeader');
          item.classList.add('menu__item--visible');
          item.classList.remove('menu__item--minimized');
          item.style.top = '';
        });

        // handle menu buttons colors
        [...menuButtons].forEach((button, index) => {
          const currentId = sections[index].id;

          button.style.width = '';
          index !== menuObj.lastMenuItemIndex
            ? menuButtons[index].classList.remove(
                `menu__button--intro-${currentId}`
              )
            : false;
        });

        // handle backgrounds
        menuUpperBackground.style.height = '';
        menuBottomBackground.style.height = '';
        menuUpperBackground.classList.remove('visuals__background--animated');
        menuBottomBackground.classList.remove('visuals__background--animated');
        menuUpperBackground.classList.remove(
          `visuals__background--${currentId}`
        );

        // handle burger button appearance
        burgerButton.classList.remove('burgerButton--visible');
        burgerButton.classList.remove(`burgerButton--${currentId}`);

        break;

      // load configuration for small and medium screens
      case 'burger':
        [...sectionContainers].forEach(
          (container) => (container.style.marginTop = '')
        );
        // handle menu buttons colors
        [...menuButtons].forEach((button, index) => {
          const currentId = sections[menuObj.lastMenuItemIndex].id;
          button.classList.remove(`menu__button--${currentId}`);

          if (index === menuObj.lastMenuItemIndex) {
            button.classList.remove('menu__button--active');
            button.classList.add(`menu__button--intro-${currentId}`);
          }
        });
        introBox.classList.add('visuals__introBox--content');

        // handle bacground appearance
        menuUpperBackground.classList.remove('visuals__background--hidden');
        menuBottomBackground.classList.remove('visuals__background--hidden');

        break;
      default:
        break;
    }
  }

  if (media !== flags.media) {
    flags.media = media;

    switch (media) {
      case 'mediaMd':
      case 'mediaSm':
        // expand other projects accordion section
        handleAccordion([...otherProjectsTabs], undefined, 'all');
        break;

      case 'mediaXs':
        // collapse other projects accordion section
        handleAccordion([...otherProjectsTabs]);
        break;

      default:
        break;
    }
  }
};

export const setMediaFlags = () => {
  flags.media = getCurrentMedia();
  flags.menuLayout = getMenuLayout();
};
