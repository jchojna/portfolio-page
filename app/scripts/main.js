//| HANDLE VARIOUS FUNCTIONS ON WINDOW RESIZE                               |//
const handleWindowResize = () => {
  [...sectionContainers].forEach(container => {
    handleTopMargins(container, minTopMargin);
  });




}
//| ON USER'S ACTIVITY                                                      |//
const handleUserActivity = () => {
  if (shouldSectionsBeUpdated) updateSectionsOffsets();
  isScrollEnabled = true;
}
//| UPDATE MENU ITEMS OFFSETS                                               |//
const updateMenuItemsOffsets = () => {
  [...items].forEach(item => {
    item.offset = item.node.offsetTop + menu.offsetTop;
  });
}
//| UPDATE SECTIONS OFFSETS                                                 |//
const updateSectionsOffsets = () => {
  [...sections].forEach((section, index) => {
    section.offset = pageSections[index].offsetTop;
  });
  shouldSectionsBeUpdated = false;
}
//| GET CURRENT ITEM INDEX                                                  |//
const getCurrentItemIndex = (cursorYPosition) => {
  return items.length - 1 - [...items]
    .map(item => item.offset)
    .reverse()
    .findIndex(offset => cursorYPosition >= offset)
}
//| GET CURRENT SECTION INDEX                                               |//
const getCurrentSectionIndex = (scrollOffset) => {
  const currentOffset = window.innerWidth >= mediaDesktop
  ? pageContainer.scrollTop
  : window.pageYOffset;

  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset - scrollOffset);
}
//| GET CURRENT NAVIGATION INDEX                                            |//
const getCurrentNavigationIndex = () => {
  const navigationOffset = navigation.offsetTop + navigation.clientHeight / 2;
  return getCurrentSectionIndex(navigationOffset);
}
//| HANDLE ELEMENTS'S TOP MARGINS TO CENTER IT VERTICALLY                   |//
//: this functionality I found more reasonable to be handled in JS,         ://
//: because of expandable content inside section containers                 ://
//: distorting and complicating content layout                              ://
const handleTopMargins = (element, distance) => {
  if (window.innerWidth >= mediaDesktop) {
    const margin = (window.innerHeight - element.clientHeight) / 2;
    element.style.marginTop = `${margin > distance ? margin : distance}px`;
  }
}
//| CHANGE ACTIVE LINK ON HOVER                                             |//
const handleColorChange = (index, action) => {
  const introLinkId = sections[index].id;

  if (action === 'activate') {
    menuLinks[index].classList.add(`menu__link--intro-${introLinkId}`);
    introBox.classList.add(`visuals__introBox--${introLinkId}`);
  } else if (action === 'deactivate') {
    menuLinks[index].classList.remove(`menu__link--intro-${introLinkId}`);
    introBox.classList.remove(`visuals__introBox--${introLinkId}`);
  }
}
//| HANDLE INTROBOX                                                         |//
const handleIntroBox = (e) => {
  //: disable transition effect on resize                              ://
  if (e && (e.type === 'resize' || e.type === 'scroll')) {
    !introBox.classList.contains('visuals__introBox--onResize')
    ? introBox.classList.add('visuals__introBox--onResize')
    : false;
  } else {
    introBox.classList.contains('visuals__introBox--onResize')
    ? introBox.classList.remove('visuals__introBox--onResize')
    : false;
  }
  const currentYOffset = items[lastMenuItemIndex].offset;
  const viewOffset = pageHeader.scrollTop;
  //: assign size and position                                         ://
  introBox.style.top = `${currentYOffset - viewOffset}px`;
}
//| HANDLE MENU IN INTRO MODE                                               |//
const handleIntroMenu = (e) => {
  //: handle intro menu on mouse event                                      ://
  if (e && e.type === 'mousemove' && window.innerWidth >= mediaTablet) {

    if (!isMenuTransformMode) {
      const viewOffset = pageHeader.scrollTop;
      const currentItemIndex = getCurrentItemIndex(e.clientY - viewOffset);

      introBox.style.top = `${items[currentItemIndex].offset}px`;
      handleColorChange(lastMenuItemIndex, 'deactivate');
      lastMenuItemIndex = currentItemIndex;
      handleColorChange(lastMenuItemIndex, 'activate');
    }
  } else {
    //: handle intro menu on page load                                      ://
    handleIntroBox();
    handleColorChange(lastMenuItemIndex, 'activate');
  }
}
//| HANDLE MENU ITEMS SINGLE CHANGE                                         |//
const handleMenuItemChange = (index) => {
  handleColorChange(lastMenuItemIndex, 'deactivate');
  handleMenuOnClick(lastMenuItemIndex, 'deactivate');
  lastMenuItemIndex = index; // ! what if both are the same
  handleColorChange(lastMenuItemIndex, 'activate');
  handleMenuOnClick(lastMenuItemIndex, 'activate');
  handleMenuIndicator(lastMenuItemIndex);
}
//| HANDLE MENU ITEMS                                                       |//
const handleMenuItemClick = (e) => {
  const activeIndex = e.target.index;
  updateSectionsOffsets();
  isMenuTransformMode = true;
  //| HANDLE MENU ITEMS ON MOBILE DEVICES                                   |//
  if (window.innerWidth < mediaTablet) {
    //. variables                                                           .//
    const windowHeight = window.innerHeight;
    const clickedintroItemHeight = items[activeIndex].height;
    const clickedItemOffset = items[activeIndex].offset;
    const clickedElementId = sections[activeIndex].id;
    const viewOffset = pageHeader.scrollTop;
    const upperBackgroundHeight = clickedintroItemHeight + clickedItemOffset - viewOffset;
    const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
    //. change items colors and set introbox position                       .//
    handleColorChange(lastMenuItemIndex, 'deactivate');
    lastMenuItemIndex = activeIndex; // ! what if both are the same
    handleColorChange(lastMenuItemIndex, 'activate');
    handleIntroBox();
    //. remove introBox resize and scroll events                            .//
    pageHeader.removeEventListener('resize', handleIntroBox);
    pageHeader.removeEventListener('scroll', handleIntroBox);
    //. remove pointer events from pageHeader                               .//
    pageHeader.classList.remove('pageHeader--intro');
    //. change menu items to be in a fixed position                         .//
    [...menuItems].forEach((item, index) => {
      item.classList.add('menu__item--mobileHeader');
      item.style.top = `${items[index].offset - viewOffset}px`;
    });
    //. set initial link width as style property in order to be animated    .//
    const linkWidth = menuLinks[activeIndex].clientWidth;
    menuLinks[activeIndex].style.width = `${linkWidth}px`;
    items[activeIndex].width = linkWidth;
    //. set backgrounds startings heights                                   .//
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
    //:                                                                     ://
    //: add first timeout                                                   ://
    clearTimeout(menuSmFirstTimeoutId);
    clearTimeout(menuSmSecondTimeoutId);
    menuSmFirstTimeoutId = setTimeout(() => {
      //. variables                                                         .//
      const upwardsOffset = clickedItemOffset;
      const downwardsOffset = windowHeight - clickedItemOffset - clickedintroItemHeight;
      //. set translated position of menu items                             .//
      [...menuItems].forEach((item, index) => {
        const currentItemOffset = items[index].offset;
        item.style.top = index <= activeIndex // ! refactor
        ? `${currentItemOffset - upwardsOffset}px`
        : `${currentItemOffset + downwardsOffset}px`;
        item.classList.add('menu__item--animated');
      });
      //. set position of introBox                                          .//
      introBox.classList.add('visuals__introBox--content');
      introBox.style.top = 0;
      //. handle menu background                                            .//
      menuUpperBackground.style.height = `${clickedintroItemHeight}px`;
      menuBottomBackground.style.height = 0;
      menuUpperBackground.classList.add('visuals__background--animated');
      menuBottomBackground.classList.add('visuals__background--animated');
      //. remove pointer events from pageHeader                             .//
      pageHeader.classList.remove('pageHeader--intro');
      //. scroll pageContainer to desired position                          .//
      window.scrollTo({
        left: 0,
        top: sections[activeIndex].offset,
        behavior: 'auto'
      });
      //. add event handling mobile header appearance                       .//
      window.addEventListener('scroll', handleMobileHeader);
      //:                                                                   ://
      //: add second timeout                                                ://
      menuSmSecondTimeoutId = setTimeout(() => {
        //. handle menu items                                               .//
        [...menuItems].forEach((item, index) => {
          const sectionId = sections[index].id;
          if (index !== activeIndex) {
            item.classList.remove('menu__item--visible');
            item.classList.add('menu__item--minimized');
            item.style.top = 0;
            items[index].width = menuLinks[index].clientWidth;
            menuLinks[index].classList.add(`menu__link--intro-${sectionId}`);
          }
          item.classList.remove('menu__item--animated');
          menuLinks[index].style.width = '100%';
        });
        //. handle introBox and menu background                             .//
        introBox.classList.remove('visuals__introBox--visible');
        menuUpperBackground.classList.add(`visuals__background--${clickedElementId}`);
        //. show burger button                                              .//
        burgerButton.classList.add('burgerButton--visible');
        burgerButton.classList.add(`burgerButton--${clickedElementId}`);
        isMenuTransformMode = false;
      }, menuSmSecondTimeoutInterval);
    }, menuSmFirstTimeoutInterval);
    //: end of timeouts                                                     ://
  //| HANDLE MENU ITEMS ON LARGE SCREEN DEVICES                             |//
  } else if (window.innerWidth >= mediaDesktop && !isBackToIntroMode) {
    isScrollEnabled = false;
    //. handle introBox                                                     .//
    introBox.style.top = 0;
    introBox.classList.add('visuals__introBox--content');
    introBox.classList.add('visuals__introBox--halfWindow');
    //. handle menu indicator                                               .//
    menuIndicator.classList.add('pageHeader__indicator--animated');
    //. handle menu items change only when content is visible               .//
    if (!isIntroMode) handleMenuItemChange(activeIndex);
    //. handle color of menu items and introBox on click                    .//
    handleColorChange(lastMenuItemIndex, 'deactivate');
    handleColorChange(activeIndex, 'activate');
    //. handle navigation appearance                                        .//
    if (currentNavigationIndex !== null) {
      handleNavOnClick(currentNavigationIndex, 'deactivate');
    }
    currentNavigationIndex = activeIndex;
    handleNavOnClick(currentNavigationIndex, 'activate');

    //:                                                                     ://
    //: set first timeout                                                   ://
    clearTimeout(menuLgFirstTimeoutId);
    menuLgFirstTimeoutId = setTimeout(() => {
      //. handle menu items change only when intro mode is active           .//
      if (isIntroMode) handleMenuItemChange(activeIndex);
      //. translate menu and content to the left of the screen              .//
      menu.classList.remove('menu--intro');
      pageContainer.classList.add('pageContainer--visible');
      //. move introBox to the left and make indicator thiner               .//
      introBox.classList.remove('visuals__introBox--centered');
      introBox.classList.add('visuals__introBox--fullWidth');
      menuIndicator.classList.add('pageHeader__indicator--narrowed');
      //. handle navigation                                                 .//
      navigation.classList.add('navigation--visible');
      navigationPrevButton.addEventListener('click', navigateToSection);
      navigationNextButton.addEventListener('click', navigateToSection);
      navigationBackButton.addEventListener('click', handleBackButton);

      //:                                                                   ://
      //: set second timeout                                                ://
      menuLgSecondTimeoutId = setTimeout(() => {
        //. add smooth scrolling to page container                          .//
        pageContainer.classList.add('pageContainer--smooth');
        //. hide menu backgrounds                                           .//
        menuUpperBackground.classList.add('visuals__background--hidden');
        menuBottomBackground.classList.add('visuals__background--hidden');
        //. hide introBox                                                   .//
        introBox.classList.remove('visuals__introBox--visible');
        //. add transition effects to navigation buttons                    .//
        [...navigation.children].forEach(child =>
          child.classList.add('navigation__button--animated'));
        //. handle global flags                                             .//
        isIntroMode = false;
        isMenuTransformMode = true;
        
      }, menuLgSecondTimeoutInterval);
    }, menuLgFirstTimeoutInterval);   
    //: end of timeout                                                      ://
  }
}
//| BURGER BUTTON HANDLER                                                   |//
const handleBurgerButton = () => {
  //. variables                                                             .//
  const windowHeight = window.innerHeight;
  const activeintroItemHeight = items[lastMenuItemIndex].height;
  const activeItemOffset = items[lastMenuItemIndex].offset;
  const activeId = sections[lastMenuItemIndex].id;
  const upperBackgroundHeight = activeintroItemHeight + activeItemOffset;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const upwardsOffset = activeItemOffset;
  const downwardsOffset = windowHeight - activeItemOffset - activeintroItemHeight;

  isMenuTransformMode = true;
  //. hide burger button                                                    .//
  burgerButton.classList.remove('burgerButton--visible');
  //. set starting position of menu items                                   .//
  [...menuItems].forEach((item, index) => {
    const currentItemOffset = items[index].offset;
    const currentId = sections[index].id;

    item.classList.add('menu__item--visible');
    item.style.top = index <= lastMenuItemIndex // ! refactor
    ? `${currentItemOffset - upwardsOffset}px`
    : `${currentItemOffset + downwardsOffset}px`;

    menuLinks[index].style.width = `${items[index].width}px`;
    item.classList.remove('menu__item--minimized');

    index !== lastMenuItemIndex
    ? menuLinks[index].classList.remove(`menu__link--intro-${currentId}`)
    : false;
  });
  //. set appearance of introBox and background                             .//
  introBox.classList.add('visuals__introBox--visible');
  menuUpperBackground.classList.remove(`visuals__background--${activeId}`);

  //:                                                                       ://
  //: add first timeout                                                     ://
  clearTimeout(menuSmFirstTimeoutId);
  clearTimeout(menuSmSecondTimeoutId);
  menuSmFirstTimeoutId = setTimeout(() => {
    //. set menu items default position                                     .//
    [...menuItems].forEach((item, index) => {
      item.style.top = `${items[index].offset}px`;
      item.classList.add('menu__item--animated');
    });
    //. set introBox and menu backgrounds appearance                        .//
    introBox.style.top = `${activeItemOffset}px`;
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
    //. handle burger button's color                                        .//
    burgerButton.classList.remove(`burgerButton--${activeId}`);
    //. remove event handling mobile header appearance                      .//
    window.removeEventListener('scroll', handleMobileHeader);

    //:                                                                     ://
    //: add second timeout                                                  ://
    menuSmSecondTimeoutId = setTimeout(() => {
      window.scrollTo(0,0);
      //. add pointer events to pageHeader                                  .//
      pageHeader.classList.add('pageHeader--intro');
      //. handle menu items                                                 .//
      [...menuItems].forEach(item => {
        item.classList.remove('menu__item--mobileHeader');
        item.classList.remove('menu__item--animated');
      });
      //. handle introBox and backgrounds                                   .//
      introBox.classList.remove('visuals__introBox--content');
      menuUpperBackground.classList.remove('visuals__background--animated');
      menuBottomBackground.classList.remove('visuals__background--animated');
      menuUpperBackground.style.height = '100%';
      menuBottomBackground.style.height = '100%';
      //. remove events                                                     .//
      pageHeader.addEventListener('resize', handleIntroBox);
      pageHeader.addEventListener('scroll', handleIntroBox);
      
      isMenuTransformMode = true;
    }, menuSmSecondTimeoutInterval);
  }, menuSmFirstTimeoutInterval);
  //: end of timeout                                                        ://
}
//| HANDLE MOBILE HEADER CHANGE                                             |//
const handleMobileHeader = () => {

  const handleHeader = (index, action) => {
    const currentId = sections[index].id;

    if (action === 'activate') {
      menuItems[index].classList.remove('menu__item--visible');
      menuItems[index].classList.add('menu__item--minimized');

      introBox.classList.remove(`visuals__introBox--${currentId}`);
      burgerButton.classList.remove(`burgerButton--${currentId}`);
      menuUpperBackground.classList.remove(`visuals__background--${currentId}`);

    } else if (action === 'deactivate') {
      menuItems[index].classList.add('menu__item--visible');
      menuItems[index].classList.remove('menu__item--minimized');

      introBox.classList.add(`visuals__introBox--${currentId}`);
      burgerButton.classList.add(`burgerButton--${currentId}`);
      menuUpperBackground.classList.add(`visuals__background--${currentId}`);
    }
  }
  const newActiveSectionIndex = getCurrentSectionIndex(0);
  //: when index changes                                                    ://
  if (newActiveSectionIndex !== lastMenuItemIndex) {
    handleHeader(lastMenuItemIndex, 'activate');
    lastMenuItemIndex = newActiveSectionIndex;
    handleHeader(lastMenuItemIndex, 'deactivate');
  } 
}
//| HANDLE MENU ITEMS ON SCROLL EVENT                                       |//
const handleMenuOnScroll = (e) => {
  if (isScrollEnabled) {
    //: handle indicator and active menu item on section change               ://
    const newMenuItemIndex = getCurrentSectionIndex(0);
    if (newMenuItemIndex !== lastMenuItemIndex) {
      menuLinks[lastMenuItemIndex].classList.remove('menu__link--active');
      introBox.classList.remove(`visuals__introBox--${sections[lastMenuItemIndex].id}`);
      //. index change                                                        .//
      lastMenuItemIndex = newMenuItemIndex;
      menuLinks[lastMenuItemIndex].classList.add('menu__link--active');
      introBox.classList.add(`visuals__introBox--${sections[lastMenuItemIndex].id}`);
      handleMenuIndicator(lastMenuItemIndex);
      if (!isFastScroll) isFastScroll = true;
    }
    //: handle all menu items appearance on local id change                   ://
    [...menuLinks].forEach((link, index) => {
      const singleItemOffset = items[index].offset;
      const currentSingleItemIndex = items[index].currentSectionIndex;
      const newSingleItemIndex = getCurrentSectionIndex(singleItemOffset);
      
      if (newSingleItemIndex !== currentSingleItemIndex) {
        const currentId = sections[currentSingleItemIndex].id;
        const newId = sections[newSingleItemIndex].id;
        link.classList.remove(`menu__link--${currentId}`);
        items[index].currentSectionIndex = newSingleItemIndex;
        link.classList.add(`menu__link--${newId}`);
      }
    });
  }
}
//| HANDLE MENU ITEMS ON CLICK EVENT                                        |//
const handleMenuOnClick = (activeIndex, action) => {
  //: add new appearance                                                    ://
  if (action === 'activate') {
    const currentId = sections[activeIndex].id;
    [...menuLinks].forEach((link, linkIndex) => {
      link.classList.add(`menu__link--${currentId}`);
      items[linkIndex].currentSectionIndex = activeIndex;
      if (linkIndex === activeIndex) {
        link.classList.add('menu__link--active');
        link.classList.remove(`menu__link--intro-${currentId}`);
      }
    });
  //: remove current appearance                                                    ://
  } else if (action === 'deactivate') {
    [...menuLinks].forEach((link, linkIndex) => {
      const currentId = sections[items[linkIndex].currentSectionIndex].id;
      link.classList.remove(`menu__link--${currentId}`);
      if (linkIndex === activeIndex) {
        link.classList.remove('menu__link--active');
        link.classList.remove(`menu__link--intro-${currentId}`);
      }
    });
  }
}
//| HANDLE MENU INDICATOR                                                   |//
const handleMenuIndicator = (index) => {
  const offset = items[index].offset;
  menuIndicator.style.top = `${offset}px`;
}
//| HANDLE BACK TO INTRO BUTTON                                             |//
const handleBackButton = () => {
  const currentId = sections[lastMenuItemIndex].id;
  isBackToIntroMode = true;
  isMenuTransformMode = true;
  //. handle intro background                                               .//
  menuUpperBackground.classList.remove('visuals__background--hidden');
  menuBottomBackground.classList.remove('visuals__background--hidden');
  //. handle menu indicator                                                 .//
  menuIndicator.classList.remove('pageHeader__indicator--narrowed');
  menuIndicator.classList.add('pageHeader__indicator--centered');
  //. handle introBox                                                       .//
  introBox.classList.add('visuals__introBox--centered');
  introBox.classList.remove('visuals__introBox--fullWindow');
  introBox.classList.add('visuals__introBox--visible');
  introBox.classList.add(`visuals__introBox--${currentId}`);
  //. translate menu and content back to the right of the screen            .//
  menu.classList.add('menu--intro');
  pageContainer.classList.remove('pageContainer--visible');
  pageContainer.classList.remove('pageContainer--smooth');
  //. handle navigation                                                     .//
  navigation.classList.remove('navigation--visible');
  navigationPrevButton.removeEventListener('click', navigateToSection);
  navigationNextButton.removeEventListener('click', navigateToSection);
  navigationBackButton.removeEventListener('click', handleBackButton);
  //. remove transition effects from navigation buttons                     .//
  [...navigation.children].forEach(child =>
    child.classList.remove('navigation__button--animated'));
  //. change colors of menu items to default                                .//
  handleMenuOnClick(lastMenuItemIndex, 'deactivate');
  menuLinks[lastMenuItemIndex].classList.add(`menu__link--intro-${currentId}`);
  //:                                                                       ://
  //: add first timeout                                                     ://
  clearTimeout(menuLgFirstTimeoutId);
  clearTimeout(menuLgSecondTimeoutId);
  menuLgFirstTimeoutId = setTimeout(() => {
    //. handle introBox                                                     .//
    introBox.style.top = `${items[lastMenuItemIndex].offset}px`;
    introBox.classList.remove('visuals__introBox--halfWindow');
    //:                                                                     ://
    //: add second timeout                                                  ://
    menuLgSecondTimeoutId = setTimeout(() => {
      //. handle introBox                                                   .//
      introBox.classList.remove('visuals__introBox--content');
      //. handle menu indicator                                             .//
      menuIndicator.classList.remove('pageHeader__indicator--animated');
      menuIndicator.classList.remove('pageHeader__indicator--centered');
      menuIndicator.style.top = '';
      //. handle global flags                                               .//
      isIntroMode = true;
      isBackToIntroMode = false;
      isMenuTransformMode = false;
    }, menuLgSecondTimeoutInterval);
  }, menuLgFirstTimeoutInterval);
  //: end of timeout                                                        ://
}
//| HANDLE PREVIOUS AND NEXT BUTTON VISIBILITY                              |//
const handlePrevNextButtonsVisibility = (index, action) => {
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
}
//| HANDLE NAVIGATION ON SCROLL EVENT                                       |//
const handleNavOnScroll = () => {
  const updatedNavigationIndex = getCurrentNavigationIndex();
  //: change navigation elements class names when index changes             ://
  if (updatedNavigationIndex !== currentNavigationIndex) {
    const currentId = sections[currentNavigationIndex].id;
    const nextId = sections[updatedNavigationIndex].id;
    //: remove current appearance                                           ://
    for (let child of navigation.children) {
      child.classList.remove(`navigation__button--${currentId}`);
      handlePrevNextButtonsVisibility(currentNavigationIndex, 'show');
    }
    //: update navigation index                                             ://
    currentNavigationIndex = updatedNavigationIndex;
    //: add new appearance                                                  ://
    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${nextId}`);
      handlePrevNextButtonsVisibility(currentNavigationIndex, 'hide');
    }
  }
}
//| HANDLE NAVIGATION ON CLICK EVENT                                        |//
const handleNavOnClick = (index, action) => {
  const currentId = sections[index].id;
  //: remove current appearance                                             ://
  if (action === 'activate') {
    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${currentId}`);
      handlePrevNextButtonsVisibility(index, 'hide');
    }
  //: add new appearance                                                    ://
  } else if (action === 'deactivate') {
    for (let child of navigation.children) {
      child.classList.remove(`navigation__button--${currentId}`);
      handlePrevNextButtonsVisibility(index, 'show');
    }
  }
}
//| HANDLE JUMPING TO ANOTHER SECTION USING NAVIGATION                      |//
const navigateToSection = (e) => {
  handleUserActivity();
  //: get target index                                                      |//
  const targetIndex = e.target === navigationPrevButton
    //. previous button clicked                                             .//
  ? currentNavigationIndex > 0 ? --currentNavigationIndex : 0
    //. next     button clicked                                             .//
  : lastMenuItemIndex < pageSections.length - 1
    ? ++lastMenuItemIndex
    : pageSections.length - 1;
  //: scroll to target index                                                |//
  const sectionOffset = sections[targetIndex].offset;
  pageContainer.scrollTo(0, sectionOffset);
}
//| RETURN FIRST PARENT OR PASSED ELEMENT WITH GIVEN CLASS                  |//
const findFirstParentWithClass = (element, className) => {
  while (element.tagName !== 'HTML' && !element.classList.contains(className)) {
    element = element.parentNode;
  }
  return element;
}
//| RESUME'S ACCORDION HANDLER                                              |//
const handleAccordion = (tabs, clickedIndex, excludeIndex) => {
  tabs.forEach((tab, index) => {
    const container = tab.querySelector('[class*=container]');
    const content = container.firstElementChild;
    const button = tab.querySelector('[class*="button"]');
    const mark = tab.querySelector('[class*="mark"]');

    //: when specific tab is being clicked                                  ://
    if (clickedIndex !== undefined) {
      const subtab = /subtab/.test(button.className);
      //. handle clicked tab                                                .//
      if (clickedIndex === index) {
        const height = container.style.height;
        //. apply transition effect                                         .//
        if (!container.classList.contains('rollable')) container.classList.add('rollable');
        //. apply transformations                                           .//
        if (height === 0 || height === '0px') {
          container.style.height = `${content.clientHeight}px`;
          button.classList.add(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.add('mark--unrolled');
          isFastScroll = false;
        } else {
          container.style.height = 0;
          button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.remove('mark--unrolled');
          isFastScroll = true;
        }
        //. when subtab clicked                                             .//
        if (subtab) {
          const parentContainer = findFirstParentWithClass(container.parentNode, 'container');
          const subtabs = parentContainer.querySelectorAll('.subtab__header');
          const clickedSubtabsContainerHeight = container.firstElementChild.clientHeight;
          const isUnrolled = mark.classList.contains('mark--unrolled');
          let height = isUnrolled ? clickedSubtabsContainerHeight : 0;
          [...subtabs].forEach(subtab => height += subtab.clientHeight);
          parentContainer.style.height = `${height}px`;
        }
        shouldSectionsBeUpdated = true;
      //. handle not clicked elements                                       .//
      } else {
        container.style.height = 0;
        button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
        mark.classList.remove('mark--unrolled');

        //: update scroll position                                          ://
        if (index === (clickedIndex - 1)) {
          const { top } = button.getBoundingClientRect();
          const scrollOffset = window.pageYOffset + top - 100;
          const timeoutId = setTimeout(() => {
            window.scrollTo({
              top: scrollOffset,
              behavior: 'smooth'
            });
            clearTimeout(timeoutId);
          }, 500);
        }
      }
    //: handle elements on page load                                        ://
    } else {
      if (index !== excludeIndex) {
        container.style.height = 0;
        mark.classList.remove('mark--unrolled');
      } else {
        container.style.height = `${content.clientHeight}px`;
        mark.classList.add('mark--unrolled');
        button.classList.add('tab__button--unrolled');
        container.classList.add('rollable');
      }
    }
  });
}
//| FETCH GITHUB API                                                        |//
const handleRepo = (repos) => {
  const statsCreated = document.querySelectorAll('.stats__value--js-created');
  const statsUpdated = document.querySelectorAll('.stats__value--js-updated');
  const statsCommits = document.querySelectorAll('.stats__value--js-commits');
  const reposIds = [
    'task-timer',
    'portfolio-page',
    'hydrApp',
    'archviz-website',
    'homepage-gulp'];
  //: FORMAT FETCHED DATES                                             ://
  const getFormattedDate = (date) => date.slice(0,10).split('-').reverse().join('-');
  //: FILTER SPECIFIC REPOS                                            ://
  const reposFiltered = [...reposIds].map(id =>
    [...repos].filter(repo => repo.name === id)[0]);
  //: ASSIGN FETCHED DATA TO EACH REPOS                                ://
  for (let i = 0; i < reposFiltered.length; i++) {
    const createdTime = getFormattedDate(reposFiltered[i].created_at);
    const updatedTime = getFormattedDate(reposFiltered[i].updated_at);
    //. ASSIGN DATES                                              .//
    statsCreated[i].innerHTML = createdTime;
    statsUpdated[i].innerHTML = updatedTime;
    //. ASSIGN NUMBER OF TOTAL COMMITS                            .//
    fetch(reposFiltered[i].contributors_url)
    .then(resp => resp.json())
    .then(resp => statsCommits[i].innerHTML = resp[0].contributions);
  }    
}
//| REDUCE CONTENT - RECURSIVE FUNCTION                                     |//
  //: recursive function handling reduced content creation                  ://
  //: it can handle both plain text and nested elements like lists          ://
  //: data - content to be reduced                                          ://
  //: container - node which got empty in order to receive reduced content  ://
  //: available - available space to contain reduced content                ://
  //: parent - root container to obtain current content height at the time  ://
  const reduceContent = (data, container, available, parent) => {
    //. if cloned content does not contain any children nodes               .//
    if (data.children.length === 0) {
      //. create array of particular words                                  .//
      const wordsArray = data.html.slice().split(' ').filter(elem => elem !== '');
      console.log(data);
      const reducedArray = [...wordsArray];
      //. remove words starting from the end until content fits space       .//
      for (let i = 0; i < wordsArray.length; i++) {
        reducedArray.pop();
        container.innerHTML = reducedArray.length === 0
          ? ''
          : `${reducedArray.join(' ')} <span class='dots'>...</span>`;
        if (parent.clientHeight <= available) break;
      }
    //. if cloned content contains children nodes                           .//
    } else {
      //. empty textContent of each childNode                               .//
      [...container.children].forEach(child => child.textContent = '');
      //. create array of each node's html content                          .//
      const nodesArray = data.children.map(child => child.html);
      //. add consectuive nodes content until it extends available space    .//
      for (let i = 0; i < container.children.length; i++) {
        const dataNode = data.children[i];
        const containerNode = container.children[i];
        containerNode.innerHTML = nodesArray[i];
        if (parent.clientHeight > available) {






         /*  console.log(parent.clientHeight);
          console.log(available); */






          //. repeat the operations on particular nodes                     .//
          reduceContent(dataNode, containerNode, available, parent);
          //. remove unnecessary empty nodes outside available space        .//
          [...container.children].forEach(child => {
            if (child.innerHTML === '') child.parentNode.removeChild(child);
          });
          break;
        }
      }
    }
  }
//| HANDLE EXPANDABLE CONTENT WITH READ MORE BUTTON                         |//
const handleExpandableContent = (contents) => {
  //: aquire html and children of every children node and its own children  ://
  const getChildren = (content) => {
    let array = [];
    [...content.children].forEach(child => array = [...array, {
      html: child.innerHTML,
      children: getChildren(child)
    }]);
    return array;
  }
  //: empty content of every node, including the nested ones                ://
  const emptyContent = (content) => {
    if (content.children.length === 0) {
      content.textContent = '';
    } else {
      [...content.children].forEach(child => emptyContent(child));
    }
  }
  //: clone content data to an array of objects and empty node              ://
  [...contents].forEach(content => {
    //. copy original content node and hide it                              .//
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const contentCopy = content.cloneNode(true);
    contentCopy.classList.remove('js-expandable');
    contentCopy.classList.add('js-expanded');
    contentCopy.classList.add('expandedHidden');
    content.classList.add('expandableVisible');
    //. wrap content and content copy inside a wrapper                      .//
    content.parentNode.insertBefore(wrapper, content);
    wrapper.append(content, contentCopy);
    contentData = [...contentData, {
      fullHeight: content.clientHeight,
      html: content.innerHTML,
      children: getChildren(content)
    }];
    //. empty content of original content node                              .//
    emptyContent(content);
  });
  //: add data from content database to empty content                       ://
  [...contents].forEach((content, index) => {
    const currentContentData = contentData[index];
    const minMobileHeight = 300;
    //. get available space for reduced content                             .//
    content.style.height = '100%';
    contentData[index].availableHeight = window.innerWidth >= mediaDesktop
    ? content.clientHeight
    : minMobileHeight;
    const { availableHeight, fullHeight, html } = currentContentData;
    console.log(fullHeight);
    //. check if content fits available space                               .//
    if (availableHeight >= fullHeight) {
      content.innerHTML = html;
    } else {
      content.parentNode.classList.add('collapsed');
      //. show read more button and update available space                  .//
      readMoreButtons[index].classList.add('tab__readMore--visible');
      contentData[index].availableHeight = window.innerWidth >= mediaDesktop
      ? content.clientHeight
      : minMobileHeight;
      const { availableHeight } = currentContentData;
      //. reduce content using recursive function                           .//
      reduceContent(currentContentData, content, availableHeight, content);
      content.parentNode.style.height = `${availableHeight}px`;
    }
  });
}
//| HANDLE 'READ MORE' BUTTONS                                              |//
const handleReadMore = (e) => {
  const { index, parentNode } = e.target;
  const wrapper = parentNode.querySelector('.wrapper');
  const expandableNode = parentNode.querySelector('.js-expandable');
  const expandedNode = document.querySelectorAll('.js-expanded')[index];
  const currentContentData = contentData[index];
  const { availableHeight } = currentContentData;
  //: expand tab                                                            ://
  if (wrapper.classList.contains('collapsed')) {
    //: reduce content using recursive function                             ://
    wrapper.style.height = `${contentData[index].fullHeight}px`;
    expandableNode.classList.add('expandableHidden');
    expandableNode.classList.remove('expandableVisible');
    expandedNode.classList.remove('expandedHidden');
    expandedNode.classList.add('expandedVisible');
    //: change buttons label                                                ://
    e.target.innerHTML = 'Show Less';
    //: remove 'collapsed' class flag                                       ://
    wrapper.classList.remove('collapsed');
    //: stop fast scroll functionality                                      ://
    isFastScroll = false;
  //: collapse tab                                                          ://
  } else {    
    expandableNode.style.height = '';
    wrapper.style.height = `${contentData[index].availableHeight}px`;
    expandableNode.classList.remove('expandableHidden');
    expandableNode.classList.add('expandableVisible');
    expandedNode.classList.add('expandedHidden');
    expandedNode.classList.remove('expandedVisible');
    reduceContent(currentContentData, expandableNode, availableHeight, expandableNode);
    //: change buttons label                                                ://
    e.target.innerHTML = 'Read More';
    //: remove 'collapsed' class flag                                       ://
    wrapper.classList.add('collapsed');
    //: enable fast scroll functionality                                    ://
    isFastScroll = true;
  }
  shouldSectionsBeUpdated = true;
}
//| HANDLE JUMPING TO NEXT SECTION ON SCROLL                                |//
const handleFastScroll = (e) => {
  //: function resetting timeout and scroll accumulator                     |//
  /* const reset = () => {
    clearTimeout(scrollTimeoutId);
    scrollTimeoutId = null;
    scrollTotal = 0;
  } */
  handleUserActivity();
  const goToNextSection = () => {
    if (lastMenuItemIndex < pageSections.length - 1) {
      if (pageContainer.scrollTop >= sections[lastMenuItemIndex].offset) {
        const nextsectionOffset = sections[++lastMenuItemIndex].offset;
        pageContainer.scrollTo(0, nextsectionOffset);
      }
    }
  }
  //: when scrolling down                                                   |//
  /* if (e.deltaY > 0) {
    scrollTotal += 1;
    if (scrollTimeoutId === null) {
      scrollTimeoutId = setTimeout(() => {
        if (scrollTotal >= 8) {
          goToNextSection();
          reset();
        } else {
          reset();
        }
      }, 100);
    }
    //: when scrolling up                                                     |//
  } else {
    reset();
  } */
  if (e.deltaY > 0 && isFastScroll) {
    e.preventDefault();
    goToNextSection();
  }
}
//| LOAD INTRO GRID CONTENT                                                 |//
const loadIntroContent = () => {
  [...introText].forEach(char => {
    const gridItem = char !== ' '
    ? `<li
        class="grid__item grid__item--js"
        style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
      >
        <svg class="grid__char grid__char--svg grid__char--js" viewBox="0 0 50 100">
          <use href="assets/svg/letters.svg#${char}"></use>
        </svg>
      </li>`
    : `<li
        class="grid__item grid__item--js"
        style="width: ${introItemWidth}px; height: ${introItemHeight}px;"
      >
        <div class="grid__char grid__char--separator grid__char--js"></div>
      </li>`;
    introGrid.insertAdjacentHTML('beforeend', gridItem);
  });
}
//| HANDLE INTRO LOADER                                                     |//
//: assign size and position of one element to another                      ://
const setSizeAndPosition = (element, target, size) => {
  element.style.top = `${target.offsetTop}px`;
  element.style.left = `${target.offsetLeft}px`;
  element.style.width = size ? `${size}px` : `${target.clientWidth}px`;
  element.style.height = size ? `${size}px` : `${target.clientHeight}px`;
}
//: set initial position of intro loader to be animated later               ://
const setIntroLoaderPosition = () => {
  introLoader.style.top = `${introLoader.offsetTop}px`;
  introLoader.style.left = `${introLoader.offsetLeft}px`;
}
//: animate new size and position of intro loader                           ://
const handleIntroLoader = () => {
  introLoader.classList.add('intro__loader--transition');
  introLoader.style.transitionDuration = `${introFirstTimeoutInterval}ms`;
  setSizeAndPosition(introLoader, endingBefore, introItemHeight);
}
//| HANDLE INTRO ANIMATION                                                  |//
const handleIntroAnimation = () => {
  //: variables                                                             ://
  let charIndex = 0;
  const charTotal = introText.length;
  let maxColNum = charTotal;
  let minColNum = 6;
  const rowGap = 10;
  let gridTopMargin = null;
  //: intervals                                                             ://
  const loadCharInterval = 30;
  const translateCharInterval = 100;
  const introSecondTimeoutInterval = loadCharInterval * charTotal + 1000;
  const introGridViewInterval = 2000;
  const inBetweenTransition = 500;
  //: FUNCTIONS                                                             ://
  //. set position of ending elements                                       .//
  const setEndings = (index) => {
    if (index < charTotal) {
      const beforeChild = introGrid.children[0];
      const afterChild = introGrid.children[index];
      var endingBeforeTop  = beforeChild.offsetTop;
      var endingBeforeLeft = beforeChild.offsetLeft - introItemWidth;
      var endingAfterTop   = afterChild.offsetTop;
      var endingAfterLeft  = afterChild.offsetLeft;
    } else {
      const prevAfterChildOffset = introGrid.children[index - 1].offsetLeft;
      var endingAfterLeft = prevAfterChildOffset + introItemWidth;
    }
    endingBefore.style.top  = `${endingBeforeTop}px`;
    endingBefore.style.left = `${endingBeforeLeft}px`;
    endingAfter.style.top   = `${endingAfterTop}px`;
    endingAfter.style.left  = `${endingAfterLeft}px`;
  }
  //. show consecutive characters of intro text                             .//
  const loadChar = () => {
    if (charIndex < charTotal) {
      const currentItem = introGrid.children[charIndex];
      currentItem.style.width = `${introItemWidth}px`;
      currentItem.style.height = `${introItemHeight}px`;
      currentItem.classList.add('grid__item--visible');
      setEndings(charIndex);
      charIndex++;
    } else {
      setEndings(charIndex);
      clearInterval(introCharIntervalId);
    }
  }
  //. animate characters position on introGrid change                       .//
  const handleChars = (chars, isInitial) => {
    if (isInitial) {
      [...chars].forEach((char, index) => {
        const {offsetTop, offsetLeft} = introGrid.children[index];
        char.style.top = `${offsetTop}px`;
        char.style.left = `${offsetLeft}px`;
        char.style.width = `${introItemWidth}px`;
        char.style.height = `${introItemHeight}px`;
        char.classList.add('grid__char--transition');
      });
    } else {
      [...chars].forEach((char, index) => {
        const bias = maxColNum - minColNum < minColNum
        ? minColNum - (maxColNum - minColNum)
        : 0;
        if (index >= maxColNum - bias) {
          const { offsetTop, offsetLeft } = introGrid.children[index];
          char.style.top = `${offsetTop}px`;
          char.style.left = `${offsetLeft}px`;
          if (!char.classList.contains('grid__char--faded')) {
            char.classList.add('grid__char--faded');
          }
        }
      });
    }
  }
  //. calculate introGrid's gaps and items paddings                         .//
  const getColGap = () => {
    const rowNum = charTotal / minColNum;
    const gridHeight = (rowNum * introItemHeight) + ((rowNum - 1) * rowGap);
    return (gridHeight - (minColNum * introItemWidth)) / (minColNum - 1);
  }
  //. set introGrid's top margin                                            .//
  const updateTopMargin = () => {
    const topMargin = (window.innerHeight - introGrid.clientHeight) / 2;
    if (topMargin !== gridTopMargin || gridTopMargin === null) {
      gridTopMargin = topMargin;
      introGrid.style.marginTop = `${gridTopMargin}px`;
    }
  }
  //: configure introGrid on start                                          ://
  introGrid.classList.add('grid--visible');
  introGrid.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
  updateTopMargin();
  //: set sizes and position of ending elements                             ://
  endingBefore.style.width = `${introItemWidth}px`;
  endingBefore.style.height = `${introItemHeight}px`;
  endingAfter.style.width = `${introItemWidth}px`;
  endingAfter.style.height = `${introItemHeight}px`;
  setEndings(charIndex);

  //:                                                                       ://
  //: FIRST TIMEOUT                                                         ://
  clearTimeout(introFirstTimeoutId);
  clearTimeout(introSecondTimeoutId);
  clearTimeout(introThirdTimeoutId);
  clearTimeout(introForthTimeoutId);
  introFirstTimeoutId = setTimeout(() => {
    //. show ending elements                                                .//
    endingBefore.classList.add('intro__ending--visible');
    endingAfter.classList.add('intro__ending--visible');
    introLoader.classList.add('intro__loader--hidden');
    introLoader.classList.remove('intro__loader--transition');
    //. remove temporary child                                              .//
    introCharIntervalId = setInterval(() => {
      loadChar();
      updateTopMargin();
    }, loadCharInterval);
    //:                                                                     ://
    //: SECOND TIMEOUT                                                      ://
    introSecondTimeoutId = setTimeout(() => {
      //. assign fixed positioning to svg elements                          .//
      const gridChars = document.querySelectorAll('.grid__char--js');
      endingAfter.classList.remove('intro__ending--visible');
      endingBefore.classList.remove('intro__ending--visible');
      handleChars(gridChars, true);
      //. set introGrid's column and row gaps to make introGrid a square    .//
      const columnGap = getColGap();
      introGrid.style.columnGap = `${columnGap}px`;
      introGrid.style.rowGap = `${rowGap}px`;
      //. decrease number of grid columns                                   .//
      introCharIntervalId = setInterval(() => {
        if (maxColNum >= minColNum) {
          introGrid.style.gridTemplateColumns = `repeat(${maxColNum--}, 1fr)`;
          handleChars(gridChars, false);
          updateTopMargin();
        } else {
          //: when interval ends                                            ://
          clearInterval(introCharIntervalId);
          setSizeAndPosition(introLoader, introGrid);
          //. show intro loader                                             .//
          introLoader.classList.remove('intro__loader--hidden');
          const delay = introGridViewInterval - inBetweenTransition;
          introLoader.style.transition = `
            opacity ${inBetweenTransition}ms ${delay}ms,
            visibility 0s ${delay}ms
          `;
          //:                                                               ://
          //: THIRD TIMEOUT                                                 ://
          introThirdTimeoutId = setTimeout(() => {
            introLoader.classList.add('intro__loader--transition');
            introLoader.style.transition = '';
            introLoader.style.transitionDuration = `${inBetweenTransition}ms`;
            introGrid.classList.remove('grid--visible');
            setSizeAndPosition(introLoader, introBox);
            //:                                                             ://
            //: FORTH TIMEOUT                                               ://
            introForthTimeoutId = setTimeout(() => {
              //. activeate menu items                                      .//
              [...menuItems].forEach(item => {
                item.classList.add('menu__item--active');
              });
              //. show introBox                                             .//
              visuals.classList.add('visuals--visible');
              //. hide intro                                                .//
              intro.classList.add('intro--hidden');
              //. show page header                                            .//
              pageHeader.classList.add('pageHeader--visible');
            }, inBetweenTransition);
          }, introGridViewInterval);
        }
      }, translateCharInterval);    
    }, introSecondTimeoutInterval);
  }, introFirstTimeoutInterval);
}
//| VALIDATE CONTACT FORM                                                   |//
const validateForm = (e) => {
  e.preventDefault();
  //: backend validation => send form using ajax request                    ://
  const xhr = new XMLHttpRequest();
  const url = 'form.php';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      var jsonData = JSON.parse(xhr.response);
      if (xhr.status === 200) {
        handleAlerts(jsonData, false);
      } else {
        handleAlerts(jsonData, true);
      }
    }
  };
  const formSubmitVal  = formSubmitButton.value;
  const userNameVal    = userName.value;
  const userEmailVal   = userEmail.value;
  const userPhoneVal   = userPhone.value;
  const userTitleVal   = userTitle.value;
  const userMessageVal = userMessage.value;
  const data = JSON.stringify({
    'submit': formSubmitVal,
    'userName': userNameVal,
    'userEmail': userEmailVal,
    'userPhone': userPhoneVal,
    'userTitle': userTitleVal,
    'userMessage': userMessageVal
  });
  xhr.send(data);
}
// ! remove event later
//| HANDLE ALERTS                                                           |//
const handleAlerts = (data, isFailed, e) => {
  e.preventDefault();
  const margin = window.innerWidth >= mediaDesktop ? 20 : 5;
  let heightTotal = margin;
  let delay = 0;
  const delayInterval = 60;
  const alertTimeoutInterval = 5000;
  const transitionTime = 250;
  let visibleAlerts = [];
  //: close alert box                                                       ://
  const quitAlertBox = (e) => {
    const self = e.target ? e.target : e;
    const { parentNode, index } = self;
    //. hide clicked alert box                                              .//
    parentNode.style.top = `${parentNode.clientHeight * -1}px`;
    parentNode.classList.remove('alerts__box--visible');
    delay = index * delayInterval;
    parentNode.style.transition = `
      top ${transitionTime}ms ${delay + transitionTime}ms,
      visibility 0s ${delay + transitionTime * 2}ms,
      width ${transitionTime}ms ${delay}ms
    `;
    //. update alert boxes below                                            .//
    if (e.target) {
      visibleAlerts = visibleAlerts.filter(alert => alert.button.index !== index);
      visibleAlerts
      .filter(alert => alert.button.index >= index)
      .forEach(alert => {
        const { offsetTop, clientHeight } = alert.box;
        alert.box.style.top = `${offsetTop - clientHeight - margin}px`;
        alert.button.index--;
      });
    }
    //. clear timeout and event listener                                    .//
    clearTimeout(self.alertTimeoutId);
    self.alertTimeoutId = null;
    self.removeEventListener('click', quitAlertBox);
  }
  //: handle active alerts                                                  ://
  const alerts = isFailed ? ['failure'] : Object.keys(data).filter(key => data[key]);
  [...alerts].forEach((alert, index) => {
    //. select elements                                                     .//
    const alertBox = document.querySelector(`.alerts__box--js-${alert}`);
    const alertButton = document.querySelector(`.alerts__button--js-${alert}`);
    //. handle appearance of alert boxes                                    .//
    const alertBoxHeight = alertBox.clientHeight;
    alertBox.style.top = `${heightTotal}px`;
    alertBox.style.transition = `
      top ${transitionTime}ms ${delay}ms,
      visibility 0s,
      width ${transitionTime}ms ${delay + transitionTime}ms
    `;
    heightTotal += alertBoxHeight + margin;
    delay += delayInterval;
    alertBox.classList.add('alerts__box--visible');
    //. clear timeout and event                                             .//
    clearTimeout(alertButton.alertTimeoutId);
    alertButton.alertTimeoutId = null;
    alertButton.removeEventListener('click', quitAlertBox);
    //. set timeout and event                                               .//
    alertButton.alertTimeoutId = setTimeout(() => {
      quitAlertBox(alertButton);
    }, alertTimeoutInterval);
    alertButton.index = index;
    alertButton.addEventListener('click', quitAlertBox);
    //. create array of alert objects                                       .//
    visibleAlerts = [...visibleAlerts, {
      box: alertBox,
      button: alertButton
    }];
    //. handle inputs appearance                                            .//
    switch (alert) {
      case 'emptyEmailError':
      case 'invalidEmailError':
        handleInputStyle(userEmail, false);
        break;
      case 'phoneError':
        handleInputStyle(userPhone, false);
        break;
      case 'messageError':
        handleInputStyle(userMessage, false);
        break;
      case 'success':
        handleInputStyle(userEmail, true);
        handleInputStyle(userPhone, true);
        handleInputStyle(userMessage, true);
        break;
      default: break;
    }
  });
}
//| VALIDATE FORM INPUTS                                                    |//
//: handle input appearance on change                                       ://
const handleInputStyle = (input, isValid) => {
  if (isValid) {
    if (input.classList.contains('form__input--invalid'))
    input.classList.remove('form__input--invalid');
  } else {
    if (!input.classList.contains('form__input--invalid'))
    input.classList.add('form__input--invalid');
  }
}
//: validate e-mail input                                                   ://
const validateEmail = (e) => {
  const self = e.target;
  self.value.match(/^\S+@\S+\.\S+$/)
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}
//: validate phone number input                                             ://
const validatePhone = (e) => {
  const self = e.target;
  self.value.match(/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i)
  || self.value.length === 0
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}
//: validate message input                                                  ://
const validateMessage = (e) => {
  const self = e.target;
  self.value.length > 0
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}

//|                                                                         |//
//| GLOBAL VARIABLES                                                        |//
//: OVERALL                                                                 ://
let isIntroMode = true;
let isBackToIntroMode = false;
let isMenuTransformMode = false;
let isFastScroll = true;
let isScrollEnabled = true;
let shouldSectionsBeUpdated = false;
const mediaTablet = 768;
const mediaDesktop = 1200;
let lastMenuItemIndex = 0;
let scrollTimeoutId = null;
let scrollTotal = 0;
//: INTERVALS                                                               ://
//. intro                                                                   .//
let introFirstTimeoutId = null;
let introSecondTimeoutId = null;
let introThirdTimeoutId = null;
let introForthTimeoutId = null;
let introCharIntervalId = null;
const introFirstTimeoutInterval = 600;
//. menu                                                                    .//
let menuSmFirstTimeoutId = null;
let menuSmSecondTimeoutId = null;
let menuLgFirstTimeoutId = null;
let menuLgSecondTimeoutId = null;
const menuSmFirstTimeoutInterval = 300;
const menuSmSecondTimeoutInterval = 600;
const menuLgFirstTimeoutInterval = 500;
const menuLgSecondTimeoutInterval = 500;
//: INTRO                                                                   ://
let introText = 'jakub chojna frontend projects';
const introItemWidth = 40;
const introItemHeight = 2 * introItemWidth;
const intro = document.querySelector('.intro--js');
const introLoader = document.querySelector('.intro__loader--js');
let introGrid = document.querySelector('.grid--js');
const endingBefore = document.querySelector('.intro__ending--js-before');
const endingAfter = document.querySelector('.intro__ending--js-after');
//: MENU AND NAVIGATION                                                     ://
const pageHeader = document.querySelector('.pageHeader--js');
const visuals = document.querySelector('.visuals--js');
const introBox = document.querySelector('.visuals__introBox--js');
const menuIndicator = document.querySelector('.pageHeader__indicator--js');
const menuUpperBackground = document.querySelector('.visuals__background--js-upper');
const menuBottomBackground = document.querySelector('.visuals__background--js-bottom');
const burgerButton = document.querySelector('.burgerButton--js');
const menu = document.querySelector('.menu--js');
const menuItems = document.querySelectorAll('.menu__item--js');
const menuLinks = document.querySelectorAll('.menu__link--js');
const menuLabels = document.querySelectorAll('.label--js');
//const sectionScrollOffset = 200;

//: NAVIGATION                                                              ://
const navigation = document.querySelector('.navigation--js');
const navigationBackButton = document.querySelector('.navigation__button--js-back');
const navigationPrevButton = document.querySelector('.navigation__button--js-prev');
const navigationNextButton = document.querySelector('.navigation__button--js-next');
let currentNavigationIndex = null;

//: MAIN CONTENT                                                            ://
const pageContainer = document.querySelector('.pageContainer--js');
const pageSections = document.querySelectorAll('.section--js');
const sectionContainers = document.querySelectorAll('.section__container--js');
const minTopMargin = 30;
const resumeTabs = document.querySelectorAll('.tab--js-resume');
const resumeButtons = document.querySelectorAll('.tab__button--js-resume');
const resumeSubtabs = document.querySelectorAll('.subtab--js-resume');
const resumeSubButtons = document.querySelectorAll('.subtab__button--js-resume');
const tasktimerTabs = document.querySelectorAll('.tab--js-tasktimer');
const tasktimerButtons = document.querySelectorAll('.tab__button--js-tasktimer');
const portfolioTabs = document.querySelectorAll('.tab--js-portfolio');
const portfolioButtons = document.querySelectorAll('.tab__button--js-portfolio');
const hydrappTabs = document.querySelectorAll('.tab--js-hydrapp');
const hydrappButtons = document.querySelectorAll('.tab__button--js-hydrapp');
const quotesTabs = document.querySelectorAll('.tab--js-quotes');
const quotesButtons = document.querySelectorAll('.tab__button--js-quotes');

const otherProjectsTabs = document.querySelectorAll('.tab--js-other');
const otherProjectsButtons = document.querySelectorAll('.tab__button--js-other');
const readMoreButtons = document.querySelectorAll('.tab__readMore--js');

const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  node: section,
  offset: section.offsetTop
}));

const items = [...menuItems].map((item, index) => ({
  index,
  node: item,
  offset: item.offsetTop + menu.offsetTop,
  height: item.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(item.offsetTop + menu.offsetTop)
}));

//. CONTACT FORM                                                            .//
const formInputs = document.querySelectorAll('.form__input--js');
const userName = document.querySelector('.form__input--js-name');
const userEmail = document.querySelector('.form__input--js-email');
const userPhone = document.querySelector('.form__input--js-phone');
const userTitle = document.querySelector('.form__input--js-title');
const userMessage = document.querySelector('.form__input--js-message');
const formSubmitButton = document.querySelector('.form__submit--js');

let contentData = [];
const expandableContent = document.querySelectorAll('.js-expandable');

//| FUNCTION CALLS ON PAGE LOAD                                             |//

// ! temporary page load
intro.classList.add('intro--hidden');
[...menuItems].forEach(item => item.classList.add('menu__item--active'));
visuals.classList.add('visuals--visible');
pageHeader.classList.add('pageHeader--visible');
// ! temporary page load

//setIntroLoaderPosition();
//loadIntroContent();
handleIntroMenu();
//: handle page's accordions                                                ://
handleAccordion([...resumeSubtabs]);
handleAccordion([...resumeTabs], undefined, 0);
handleAccordion([...tasktimerTabs]);
handleAccordion([...portfolioTabs]);
handleAccordion([...hydrappTabs]);
handleAccordion([...quotesTabs]);
if (window.innerWidth < mediaDesktop) {
  handleAccordion([...otherProjectsTabs]);
}
//: collapse expandable content on page load                                ://
window.onload = () => {
  //handleIntroAnimation();
  //handleIntroLoader();
  handleExpandableContent(expandableContent);
  //: set each section's container top margin                               ://
  [...sectionContainers].forEach(container => {
    handleTopMargins(container, minTopMargin);
  });
};

//: fetch github api                                                        ://
/* fetch('https://api.github.com/users/jchojna/repos')
  .then(resp => resp.json())
  .then(resp => handleRepo(resp)); */
// ! project id must fit repo id






//|                                                                         |//
//| EVENT LISTENERS                                                         |//
//: MENU AND NAVIGATION                                                     ://
window.addEventListener('resize', updateSectionsOffsets);
window.addEventListener('resize', updateMenuItemsOffsets);
pageHeader.addEventListener('resize', handleIntroBox);
pageHeader.addEventListener('scroll', handleIntroBox);

pageContainer.addEventListener('mousedown', handleUserActivity);
pageContainer.addEventListener('touchstart', handleUserActivity);

pageContainer.addEventListener('scroll', handleMenuOnScroll);
pageContainer.addEventListener('scroll', handleNavOnScroll);
pageContainer.addEventListener('wheel', handleFastScroll);

[...menuLinks].forEach((link, index) => {
  link.index = index;
  link.addEventListener('click', handleMenuItemClick);
  link.addEventListener('mousemove', handleIntroMenu);
});
burgerButton.addEventListener('click', handleBurgerButton);
//: RESUME                                                                  ://
[...resumeButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...resumeTabs], index));
});
[...resumeSubButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...resumeSubtabs], index));
});
//: PROJECT SECTIONS                                                        ://
[...tasktimerButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...tasktimerTabs], index));
});
[...portfolioButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...portfolioTabs], index));
});
[...hydrappButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...hydrappTabs], index));
});
[...quotesButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...quotesTabs], index));
});
//: OTHER PROJECTS                                                          ://
if (window.innerWidth < mediaDesktop) {
  [...otherProjectsButtons].forEach((button, index) => {
    button.addEventListener('click', () =>
    handleAccordion([...otherProjectsTabs], index));
  });
}
//: 'READ MORE' BUTTONS                                                     ://
[...readMoreButtons].forEach((button, index) => {
  button.index = index;
  button.addEventListener('click', handleReadMore);
});
//: SAVE FORM INPUTS VALUES TO LOCAL STORAGE                                ://
[...formInputs].forEach(input => {
  input.addEventListener('keyup', (e) => localStorage.setItem(e.target.id, e.target.value));
  input.value = localStorage.getItem(input.id) ? localStorage.getItem(input.id) : '';
});
//: VALIDATE CONTACT FORM                                                   ://
//formSubmitButton.addEventListener('click', validateForm);
formSubmitButton.addEventListener('click', (e) => handleAlerts({
  'emptyEmailError': true,
  'invalidEmailError': true,
  'messageError': true,
  'phoneError': false,
  'failure': true,
  'success': true
}, false, event));

//: VALIDATE FORM INPUTS                                                    ://
userEmail.addEventListener('keyup', validateEmail);
userPhone.addEventListener('keyup', validatePhone);
userMessage.addEventListener('keyup', validateMessage);

window.addEventListener('resize', handleWindowResize);