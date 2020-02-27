//#region [ Horizon ] HELPER FUNCTIONS

const findFirstParentWithClass = (element, className) => {
  while (element.tagName !== 'HTML' && !element.classList.contains(className)) {
    element = element.parentNode;
  }
  return element;
}

const getCurrentMedia = () => {
  return window.innerWidth >= mediaLg
  ? 'mediaLg' : window.innerWidth >= mediaMd
  ? 'mediaMd' : window.innerWidth >= mediaSm
  ? 'mediaSm' : 'mediaXs';
}

const getMenuLayout = () => {
  return window.innerWidth >= mediaLg ? 'side' : 'burger';
}

const handleWindowResize = () => {

  const menuLayout = getMenuLayout();
  const media = getCurrentMedia();

  // update top margin only on large screen devices
  if (media === 'mediaLg') {
    [...sectionContainers].forEach(container => {
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
    [...menuItems].forEach((item, index) => items[index].height = item.clientHeight);
    [...navigation.children].forEach(child => {
      child.classList.remove('navigation__button--hidden');
    });

    // show all menu shadows
    handleMenuShadows('all', 'activate');

    // handle introBox and menu indicator
    introBox.classList.add('visuals__introBox--visible');
    introBox.classList.add('visuals__introBox--centered');
    introBox.classList.remove('visuals__introBox--fullWindow');
    introBox.classList.remove('visuals__introBox--halfWindow');
    introBox.classList.remove('visuals__introBox--content');
    menuIndicator.classList.remove('pageHeader__indicator--visible');
    menuIndicator.style.top = 0;
    
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
        const currentId = sections[lastMenuItemIndex].id;

        // change menu items to be in a static position
        [...menuItems].forEach(item => {
          item.classList.remove('menu__item--mobileHeader');
          item.classList.add('menu__item--visible');
          item.classList.remove('menu__item--minimized');
          item.style.top = '';
        });

        // handle menu buttons colors
        [...menuButtons].forEach((button, index) => {
          const currentId = sections[index].id;

          button.style.width = '';
          index !== lastMenuItemIndex
          ? menuButtons[index].classList.remove(`menu__button--intro-${currentId}`)
          : false;
        });

        // handle backgrounds
        menuUpperBackground.style.height = '';
        menuBottomBackground.style.height = '';
        menuUpperBackground.classList.remove('visuals__background--animated');
        menuBottomBackground.classList.remove('visuals__background--animated');
        menuUpperBackground.classList.remove(`visuals__background--${currentId}`);

        // handle burger button appearance
        burgerButton.classList.remove('burgerButton--visible');
        burgerButton.classList.remove(`burgerButton--${currentId}`);

      break;

      // load configuration for small and medium screens
      case 'burger':

        [...sectionContainers].forEach(container => container.style.marginTop = '');
        // handle menu buttons colors
        [...menuButtons].forEach((button, index) => {
          const currentId = sections[lastMenuItemIndex].id;
          button.classList.remove(`menu__button--${currentId}`);

          if (index === lastMenuItemIndex) {
            button.classList.remove('menu__button--active');
            button.classList.add(`menu__button--intro-${currentId}`);
          }
        });
        introBox.classList.add('visuals__introBox--content');

        // handle bacground appearance
        menuUpperBackground.classList.remove('visuals__background--hidden');
        menuBottomBackground.classList.remove('visuals__background--hidden');

      break;
      default: break;
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

      default: break;   
    }
  }
}

const handleUserActivity = () => {
  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();
  if (!flags.isScrollEnabled) flags.isScrollEnabled = true;
}

const removeTransitionsOnEvent = (e, element, classname) => {
  if (e) {
    !element.classList.contains(`${classname}--noTransition`)
    ? element.classList.add(`${classname}--noTransition`)
    : false;
  } else {
    element.classList.contains(`${classname}--noTransition`)
    ? element.classList.remove(`${classname}--noTransition`)
    : false;
  }
}

const updateMenuItemsOffsets = () => {
  if (flags.isMobileHeader) return false;
  [...items].forEach(item => {
    item.offset = item.node.offsetTop + menu.offsetTop;
  });
}

const updateSectionsOffsets = () => {
  [...sections].forEach((section, index) => {
    section.offset = pageSections[index].offsetTop;
  });
  flags.shouldSectionsBeUpdated = false;
}

const getCurrentItemIndex = (cursorYPosition) => {
  return items.length - 1 - [...items]
  .map(item => item.offset)
  .reverse()
  .findIndex(offset => cursorYPosition >= offset);
}

const getCurrentSectionIndex = (scrollOffset) => {
  const currentOffset = window.innerWidth >= mediaLg
  ? pageContainer.scrollTop
  : window.pageYOffset;

  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset - scrollOffset);
}

const getCurrentNavigationIndex = () => {
  const navigationOffset = navigation.offsetTop + navigation.clientHeight / 2;
  return getCurrentSectionIndex(navigationOffset);
}

const getCurrentItemOffset = () => {
  
  updateMenuItemsOffsets();
  const currentYOffset = items[lastMenuItemIndex].offset;
  const viewOffset = pageHeader.scrollTop;
  return currentYOffset - viewOffset;
}

const handleTopMargins = (element, distance) => {
  
  // this functionality I found more reasonable to be handled in JS,
  // because of expandable content inside section containers
  // distorting and complicating content layout
  const margin = (window.innerHeight - element.clientHeight) / 2;
  element.style.marginTop = `${margin > distance ? margin : distance}px`;
}

const addAccordionEvents = (buttons, tabs) => {
  [...buttons].forEach((button, index) => {
    button.addEventListener('click', () =>
    handleAccordion([...tabs], index));
  });
}

// assign size and position of one element to another
const setSizeAndPosition = (element, target, size) => {
  element.style.top = `${target.offsetTop}px`;
  element.style.left = `${target.offsetLeft}px`;
  element.style.width = size ? `${size}px` : `${target.clientWidth}px`;
  element.style.height = size ? `${size}px` : `${target.clientHeight}px`;
}

//#endregion

//#region [ Horizon ] INTRO

const setIntroLoaderPosition = () => {
  introLoader.style.top = `${introLoader.offsetTop}px`;
  introLoader.style.left = `${introLoader.offsetLeft}px`;
}

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

const handleIntroLoader = () => {
  introLoader.classList.add('intro__loader--transition');
  introLoader.style.transitionDuration = `${introFirstTimeoutInterval}ms`;
  setSizeAndPosition(introLoader, endingBefore, introItemHeight);
}

const handleIntroAnimation = () => {
  
  let charIndex = 0;
  const charTotal = introText.length;
  let maxColNum = window.innerWidth >= mediaLg
  ? charTotal : window.innerWidth >= mediaMd
  ? charTotal / 2
  : charTotal / 3;
  let minColNum = 6;
  const rowGap = 2;
  let gridTopMargin = null;

  // intervals
  const loadCharInterval = 25; //30
  const translateCharInterval = 0; //100
  const introSecondTimeoutInterval = loadCharInterval * charTotal + 1000;
  const introGridViewInterval = 2000;
  const inBetweenTransition = 500;
  
  // set position of ending elements
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

  // show consecutive characters of intro text
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

  // animate characters position on introGrid change
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

  // calculate introGrid's gaps and items paddings
  const getColGap = () => {
    const rowNum = charTotal / minColNum;
    const gridHeight = (rowNum * introItemHeight) + ((rowNum - 1) * rowGap);
    return (gridHeight - (minColNum * introItemWidth)) / (minColNum - 1);
  }

  // set introGrid's top margin
  const updateTopMargin = () => {
    const topMargin = (window.innerHeight - introGrid.clientHeight) / 2;

    if (topMargin !== gridTopMargin || gridTopMargin === null) {
      gridTopMargin = topMargin;
      introGrid.style.marginTop = `${gridTopMargin}px`;
    }
  }

  // configure introGrid on start
  introGrid.classList.add('grid--visible');
  introGrid.style.gridTemplateColumns = `repeat(${maxColNum}, 1fr)`;
  updateTopMargin();

  // set sizes and position of ending elements
  endingBefore.style.width = `${introItemWidth}px`;
  endingBefore.style.height = `${introItemHeight}px`;
  endingAfter.style.width = `${introItemWidth}px`;
  endingAfter.style.height = `${introItemHeight}px`;
  setEndings(charIndex);

  // FIRST TIMEOUT
  clearTimeout(introFirstTimeoutId);
  clearTimeout(introSecondTimeoutId);
  clearTimeout(introThirdTimeoutId);
  clearTimeout(introForthTimeoutId);
  introFirstTimeoutId = setTimeout(() => {

    introSkip.classList.add('intro__skip--visible');

    // show ending elements
    endingBefore.classList.add('intro__ending--visible');
    endingAfter.classList.add('intro__ending--visible');
    introLoader.classList.add('intro__loader--hidden');
    introLoader.classList.remove('intro__loader--transition');

    // remove temporary child
    introCharIntervalId = setInterval(() => {
      loadChar();
      updateTopMargin();
    }, loadCharInterval);
    
    // SECOND TIMEOUT
    introSecondTimeoutId = setTimeout(() => {

      // assign fixed positioning to svg elements
      const gridChars = document.querySelectorAll('.grid__char--js');
      endingAfter.classList.remove('intro__ending--visible');
      endingBefore.classList.remove('intro__ending--visible');
      handleChars(gridChars, true);

      // set introGrid's column and row gaps to make introGrid a square
      const columnGap = getColGap();
      introGrid.style.columnGap = `${columnGap}px`;
      introGrid.style.rowGap = `${rowGap}px`;

      // decrease number of grid columns
      introCharIntervalId = setInterval(() => {
        if (maxColNum >= minColNum) {
          introGrid.style.gridTemplateColumns = `repeat(${maxColNum--}, 1fr)`;
          handleChars(gridChars, false);
          updateTopMargin();

        } else {
          // when interval ends
          clearInterval(introCharIntervalId);
          setSizeAndPosition(introLoader, introGrid);

          // show intro loader
          introLoader.classList.remove('intro__loader--hidden');
          const delay = introGridViewInterval - inBetweenTransition;
          introLoader.style.transition = `
            opacity ${inBetweenTransition}ms ${delay}ms,
            visibility 0s ${delay}ms
          `;
          
          // THIRD TIMEOUT
          introThirdTimeoutId = setTimeout(() => {
            introSkip.classList.remove('intro__skip--visible');
            introLoader.classList.add('intro__loader--transition');
            introLoader.style.transition = '';
            introLoader.style.transitionDuration = `${inBetweenTransition}ms`;
            introGrid.classList.remove('grid--visible');
            setSizeAndPosition(introLoader, introBox);
            
            // FORTH TIMEOUT
            introForthTimeoutId = setTimeout(() => {

              // activeate menu items
              [...menuItems].forEach(item => {
                item.classList.add('menu__item--active');
              });

              // show introBox
              visuals.classList.add('visuals--visible');

              // hide intro
              intro.classList.add('intro--hidden');

              // show page header
              pageHeader.classList.add('pageHeader--visible');
            }, inBetweenTransition);
          }, introGridViewInterval);
        }
      }, translateCharInterval);
    }, introSecondTimeoutInterval);
  }, introFirstTimeoutInterval);
}

const skipIntro = () => {
  // mainly as a fallback against unpredicted animation fail and crash
  // clear timeouts and intervals
  clearTimeout(introFirstTimeoutId);
  clearTimeout(introSecondTimeoutId);
  clearTimeout(introThirdTimeoutId);
  clearTimeout(introForthTimeoutId);
  clearInterval(introCharIntervalId);
  introFirstTimeoutId = null;
  introSecondTimeoutId = null;
  introThirdTimeoutId = null;
  introForthTimeoutId = null;
  introCharIntervalId = null;

  [...menuItems].forEach(item => {
    item.classList.add('menu__item--active');
  });

  intro.classList.add('intro--hidden');
  introSkip.classList.remove('intro__skip--visible');
  pageHeader.classList.add('pageHeader--visible');
  visuals.classList.add('visuals--visible');
}

//#endregion

//#region [ Horizon ] MENU

const handleIntroMenu = (e) => {

  if (flags.isMenuTransforming) return false;
  if (!flags.isIntroMode) return false;

  // handle intro menu on mouse event
  if (e && e.type === 'mousemove' && window.innerWidth >= mediaLg) {

    const viewOffset = pageHeader.scrollTop;
    const currentItemIndex = getCurrentItemIndex(e.clientY + viewOffset);
    if (currentItemIndex >= items.length) return false;

    handleMenuItemColor(lastMenuItemIndex, 'deactivate');
    lastMenuItemIndex = currentItemIndex;
    handleMenuItemColor(lastMenuItemIndex, 'activate');
    handleIntroBox();

  // handle intro menu on page load
  } else {
    handleIntroBox();
    handleMenuItemColor(lastMenuItemIndex, 'activate');
  }
}

const handleMenuItemColor = (index, action) => {
  const id = sections[index].id;

  if (action === 'activate') {
    menuButtons[index].classList.add(`menu__button--intro-${id}`);
    introBox.classList.add(`visuals__introBox--${id}`);

  } else if (action === 'deactivate') {
    menuButtons[index].classList.remove(`menu__button--intro-${id}`);
    introBox.classList.remove(`visuals__introBox--${id}`);
  }
}

const handleIntroMenuItemClick = (e) => {

  if (!flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;

  const activeIndex = e.target.index;
  flags.isMenuTransforming = true;
  updateSectionsOffsets();

  //#region [ Horizon ] ON MOBILE DEVICES
  if (window.innerWidth < mediaLg) {

    const windowHeight = window.innerHeight;
    const clickedintroItemHeight = items[activeIndex].height;
    const clickedItemOffset = items[activeIndex].offset;
    const clickedElementId = sections[activeIndex].id;
    const viewOffset = pageHeader.scrollTop;
    const upperBackgroundHeight = clickedintroItemHeight + clickedItemOffset - viewOffset;
    const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;

    // change items colors and set introbox position
    if (lastMenuItemIndex !== activeIndex) {
      handleMenuItemColor(lastMenuItemIndex, 'deactivate');
      lastMenuItemIndex = activeIndex;
      handleMenuItemColor(lastMenuItemIndex, 'activate');
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
      const downwardsOffset = windowHeight - clickedItemOffset - clickedintroItemHeight;

      // set translated position of menu items
      [...menuItems].forEach((item, index) => {
        const currentItemOffset = items[index].offset;

        item.style.top = index <= activeIndex
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
            menuButtons[index].classList.add(`menu__button--intro-${sectionId}`);
          }
          item.classList.remove('menu__item--animated');
          menuButtons[index].style.width = '100%';
        });

        // handle introBox and menu background
        introBox.classList.remove('visuals__introBox--visible');
        menuUpperBackground.classList.add(`visuals__background--${clickedElementId}`);

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

  } else if (window.innerWidth >= mediaLg) {

    flags.isScrollEnabled = false;
    flags.isIntroMode = false;
    currentNavigationIndex = activeIndex;
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
        [...navigation.children].forEach(child =>
          child.classList.add('navigation__button--animated'));

        // handle global flags
        flags.isMenuTransforming = false;
        flags.isIntroMode = false;

        clearTimeout(secondTimeoutId)
      }, secondTimeoutLg);
      clearTimeout(firstTimeoutId)
    }, firstTimeoutLg);
    //#endregion
  }
  //#endregion
}

const handleMenuItemClick = (e) => {

  // works only in content view on desktop devices
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;
  if (window.innerWidth < mediaLg) return false;

  const activeIndex = e.target.index;
  flags.isScrollEnabled = false;

  // navigate to selected section
  navigateToSection(activeIndex);
  // handle buttons appearance
  handleMenuButtonChange(activeIndex);

  // handle navigation and introBox appearance
  handleNavOnClick(currentNavigationIndex, 'deactivate');
  handleMenuItemColor(currentNavigationIndex, 'deactivate');
  handleMenuShadows(currentNavigationIndex, 'activate');
  currentNavigationIndex = activeIndex;
  handleNavOnClick(currentNavigationIndex, 'activate');
  handleMenuItemColor(currentNavigationIndex, 'activate');
  handleMenuShadows(currentNavigationIndex, 'deactivate');
}

const handleBurgerButton = () => {

  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;
  
  const windowHeight = window.innerHeight;
  const activeintroItemHeight = items[lastMenuItemIndex].height;
  const activeItemOffset = items[lastMenuItemIndex].offset;
  const activeId = sections[lastMenuItemIndex].id;
  const upperBackgroundHeight = activeintroItemHeight + activeItemOffset;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const upwardsOffset = activeItemOffset;
  const downwardsOffset = windowHeight - activeItemOffset - activeintroItemHeight;

  flags.isMenuTransforming = true;
  flags.isIntroMode = true;

  // hide burger button
  burgerButton.classList.remove('burgerButton--visible');

  // set starting position of menu items
  [...menuItems].forEach((item, index) => {
    const currentItemOffset = items[index].offset;
    const currentId = sections[index].id;

    item.classList.add('menu__item--visible');
    item.style.top = index <= lastMenuItemIndex
    ? `${currentItemOffset - upwardsOffset}px`
    : `${currentItemOffset + downwardsOffset}px`;

    menuButtons[index].style.width = `${items[index].width}px`;
    item.classList.remove('menu__item--minimized');

    index !== lastMenuItemIndex
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
      [...menuItems].forEach(item => {
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
  //#endregion
}

const handleMenuOnScroll = () => {

  if (flags.isScrollEnabled) {

    // handle indicator and active menu item on section change
    const newMenuItemIndex = getCurrentSectionIndex(0);

    if (newMenuItemIndex !== lastMenuItemIndex) {

      const prevId = sections[lastMenuItemIndex].id;
      menuButtons[lastMenuItemIndex].classList.remove(`menu__button--intro-${prevId}`);
      menuButtons[lastMenuItemIndex].classList.remove('menu__button--active');
      introBox.classList.remove(`visuals__introBox--${sections[lastMenuItemIndex].id}`);
      handleMenuShadows(lastMenuItemIndex, 'activate');

      // index change
      lastMenuItemIndex = newMenuItemIndex;

      menuButtons[lastMenuItemIndex].classList.add('menu__button--active');
      menuButtons[lastMenuItemIndex].focus();
      introBox.classList.add(`visuals__introBox--${sections[lastMenuItemIndex].id}`);
      handleMenuIndicator();
      handleMenuShadows(lastMenuItemIndex, 'deactivate');
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
}

const handleMenuButtonChange = (index) => {
  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();

  if (lastMenuItemIndex !== index) {
    handleMenuButtons(lastMenuItemIndex, 'deactivate');
    lastMenuItemIndex = index;
    handleMenuButtons(lastMenuItemIndex, 'activate');
    handleMenuIndicator();
  }
}

const handleMenuButtons = (activeIndex, action) => {

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
}

const handleMobileHeader = () => {

  if (window.innerWidth >= mediaLg) return false;
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
  }
  const newActiveSectionIndex = getCurrentSectionIndex(0);

  // when index changes
  if (newActiveSectionIndex !== lastMenuItemIndex) {
    handleHeader(lastMenuItemIndex, 'activate');
    lastMenuItemIndex = newActiveSectionIndex;
    handleHeader(lastMenuItemIndex, 'deactivate');
  } 
}

const handleIntroBox = (e) => {
  
  if(!flags.isIntroMode) return false;
  removeTransitionsOnEvent(e, introBox, 'visuals__introBox');
  introBox.style.top = `${getCurrentItemOffset()}px`;
}

const handleMenuIndicator = (e) => {
  
  if(flags.isIntroMode) return false;
  if (flags.media === 'mediaXs') return false;
  removeTransitionsOnEvent(e, menuIndicator, 'pageHeader__indicator');
  menuIndicator.style.top = `${getCurrentItemOffset()}px`;
}

const handleMenuShadows = (index, action) => {

  if (index === 'all') {
    [...menuShadows].forEach(shadow => action === 'activate'
    ? shadow.classList.add('menuSvg__shadow--visible')
    : shadow.classList.remove('menuSvg__shadow--visible'));

  } else {
    action === 'activate'
    ? menuShadows[index].classList.add('menuSvg__shadow--visible')
    : menuShadows[index].classList.remove('menuSvg__shadow--visible');
  }
}

//#endregion

//#region [ Horizon ] NAVIGATION

const handleBackButton = () => {

  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;

  const currentId = sections[lastMenuItemIndex].id;
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
  [...navigation.children].forEach(child => {
    child.classList.remove('navigation__button--animated');
    child.classList.remove(`navigation__button--${currentId}`);
  });

  // change colors of menu items to default
  handleMenuButtons(lastMenuItemIndex, 'deactivate');
  menuButtons[lastMenuItemIndex].classList.add(`menu__button--intro-${currentId}`);
  handleMenuShadows(lastMenuItemIndex, 'activate');
  
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
}

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

const handleNavOnScroll = () => {

  if (flags.isIntroMode) return false;

  const updatedNavigationIndex = getCurrentNavigationIndex();

  // change navigation elements class names when index changes
  if (updatedNavigationIndex !== currentNavigationIndex) {
    const currentId = sections[currentNavigationIndex].id;
    const nextId = sections[updatedNavigationIndex].id;

    // remove current appearance
    for (let child of navigation.children) {
      child.classList.remove(`navigation__button--${currentId}`);
      handlePrevNextButtonsVisibility(currentNavigationIndex, 'show');
    }
    // update navigation index
    currentNavigationIndex = updatedNavigationIndex;

    // add new appearance
    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${nextId}`);
      handlePrevNextButtonsVisibility(currentNavigationIndex, 'hide');
    }
  }
}

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
}

const navigateToSection = (e) => {

  if (flags.shouldSectionsBeUpdated) updateSectionsOffsets();
  let targetIndex = e;

  // get target index
  if (e.target === navigationPrevButton) {
    if (targetIndex = currentNavigationIndex > 0) {
      targetIndex = --currentNavigationIndex;
      flags.isScrollEnabled = true;
    } else return false;

  } else if (e.target === navigationNextButton) {

    if (targetIndex = currentNavigationIndex < pageSections.length - 1) {
      targetIndex = ++currentNavigationIndex;
      flags.isScrollEnabled = true;
    } else return false;
  }

  // scroll to target index
  if (window.innerWidth >= mediaLg) {
    const sectionOffset = sections[targetIndex].offset;
    pageContainer.scrollTo(0, sectionOffset);

  } else {
    const sectionOffset = sections[targetIndex].offset;
    window.scrollTo(0, sectionOffset);
  }
}

//#endregion

//#region [ Horizon ] MAIN CONTENT

const handleAccordion = (tabs, clickedIndex, excludeIndex) => {

  tabs.forEach((tab, index) => {
    const container = tab.querySelector('[class*=container]');
    const content = container.firstElementChild;
    const button = tab.querySelector('[class*="button"]');
    const mark = tab.querySelector('[class*="mark"]');


    // when specific tab is being clicked
    if (clickedIndex !== undefined) {
      const subtab = /subtab/.test(button.className);
      const isDisabled = /other/.test(tab.className) && flags.media !== 'mediaXs';
      if (isDisabled) return false;

      // handle clicked tab
      if (clickedIndex === index) {
        const height = container.style.height;
        // apply transition effect
        if (!container.classList.contains('rollable')) container.classList.add('rollable');
        // apply transformations
        if (height === 0 || height === '0px') {
          container.style.height = `${content.clientHeight}px`;
          button.classList.add(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.add('mark--unrolled');

        } else {
          container.style.height = 0;
          button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.remove('mark--unrolled');
        }

        // when subtab clicked
        if (subtab) {
          const parentContainer = findFirstParentWithClass(container.parentNode, 'container');
          const subtabsHeaders = parentContainer.querySelectorAll('.subtab__header');
          const subtabsContainers = parentContainer.querySelectorAll('[class*=container]');
          const isUnrolled = mark.classList.contains('mark--unrolled');
          
          const clickedSubtabsContainerHeight = container.firstElementChild.clientHeight;
          const subtabsHeadersHeights = [...subtabsHeaders]
          .reduce((acc, curr) => acc + curr.clientHeight, 0);

          let height = 0;          
          if (flags.media === 'mediaLg') {
            height = isUnrolled ? clickedSubtabsContainerHeight : 0;

          } else {
            height = [...subtabsContainers]
            .reduce((acc, curr) => curr.style.height === '0px'
            ? acc : acc + curr.firstElementChild.clientHeight, 0);
          }
          
          height += subtabsHeadersHeights;
          parentContainer.style.height = `${height}px`;
        }
        flags.shouldSectionsBeUpdated = true;

      // handle not clicked elements
      } else {
        // collapse other tabs only on large screens
        if (flags.media === 'mediaLg') {
          container.style.height = 0;
          button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.remove('mark--unrolled');
        }
      }

    // handle elements on page load or media breakpoint
    } else {
      if (index !== excludeIndex && excludeIndex !== 'all') {
        container.style.height = 0;
        mark.classList.remove('mark--unrolled');
        button.classList.remove('tab__button--unrolled');

      } else if (excludeIndex === 'all') {
        container.style.height = '';

        if (flags.media === 'mediaSm') {
          mark.classList.add('mark--unrolled');
          button.classList.add('tab__button--unrolled');

        } else {
          mark.classList.remove('mark--unrolled');
          button.classList.remove('tab__button--unrolled');
        }

      } else {
        container.style.height = `${content.clientHeight}px`;
        mark.classList.add('mark--unrolled');
        button.classList.add('tab__button--unrolled');
        container.classList.add('rollable');

      }
    }
  });
}

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

const reduceContent = (data, container, available, parent) => {
  // recursive function handling reduced content creation
  // it can handle both plain text and nested elements like lists
  // data - content to be reduced
  // container - node which got empty in order to receive reduced content
  // available - available space to contain reduced content
  // parent - root container to obtain current content height at the time
  
  // if cloned content does not contain any children nodes
  if (data.children.length === 0) {

    // create array of particular words
    const wordsArray = data.html.slice().split(' ').filter(elem => elem !== '');
    const reducedArray = [...wordsArray];

    // remove words starting from the end until content fits space
    for (let i = 0; i < wordsArray.length; i++) {
      reducedArray.pop();
      container.innerHTML = reducedArray.length === 0
        ? ''
        : `${reducedArray.join(' ')} <span class='dots'>...</span>`;
      if (parent.clientHeight <= available) break;
    }

  // if cloned content contains children nodes
  } else {

    // empty textContent of each childNode
    [...container.children].forEach(child => child.textContent = '');

    // create array of each node's html content
    const nodesArray = data.children.map(child => child.html);

    // add consectuive nodes content until it extends available space
    for (let i = 0; i < container.children.length; i++) {
      const dataNode = data.children[i];
      const containerNode = container.children[i];
      containerNode.innerHTML = nodesArray[i];

      if (parent.clientHeight > available) {

        // repeat the operations on particular nodes
        reduceContent(dataNode, containerNode, available, parent);

        // remove unnecessary empty nodes outside available space
        [...container.children].forEach(child => {
          if (child.innerHTML === '') child.parentNode.removeChild(child);
        });
        break;
      }
    }
  }
}

const handleExpandableContent = (contents) => {

  // aquire html and children of every children node and its own children
  const getChildren = (content) => {
    let array = [];
    [...content.children].forEach(child => array = [...array, {
      html: child.innerHTML,
      children: getChildren(child)
    }]);
    return array;
  }

  // empty content of every node, including the nested ones
  const emptyContent = (content) => {
    if (content.children.length === 0) {
      content.textContent = '';
    } else {
      [...content.children].forEach(child => emptyContent(child));
    }
  }

  // clone content data to an array of objects and empty node
  [...contents].forEach(content => {

    // copy original content node and hide it
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const contentCopy = content.cloneNode(true);
    contentCopy.classList.remove('js-expandable');
    contentCopy.classList.add('js-expanded');
    contentCopy.classList.add('expandedHidden');
    content.classList.add('expandableVisible');

    // wrap content and content copy inside a wrapper
    content.parentNode.insertBefore(wrapper, content);
    wrapper.append(content, contentCopy);
    contentData = [...contentData, {
      fullHeight: content.clientHeight,
      html: content.innerHTML,
      children: getChildren(content)
    }];

    // empty content of original content node
    emptyContent(content);
  });

  // add data from content database to empty content
  [...contents].forEach((content, index) => {
    const currentContentData = contentData[index];
    const minMobileHeight = 300;
    const minDesktopHeight = 200;

    // get available space for reduced content
    content.style.height = '100%';
    contentData[index].availableHeight = window.innerWidth >= mediaLg
    ? content.classList.contains('js-minHeight')
      ? minDesktopHeight
      : content.clientHeight
    : minMobileHeight;
    const { availableHeight, fullHeight, html } = currentContentData;

    // check if content fits available space
    if (availableHeight >= fullHeight) {
      content.innerHTML = html;

    } else {
      content.parentNode.classList.add('collapsed');

      // show read more button and update available space
      readMoreButtons[index].classList.add('tab__readMore--visible');
      contentData[index].availableHeight = window.innerWidth >= mediaLg
      ? content.classList.contains('js-minHeight')
        ? minDesktopHeight
        : content.clientHeight
      : minMobileHeight;
      const { availableHeight } = currentContentData;

      // reduce content using recursive function
      reduceContent(currentContentData, content, availableHeight, content);
      content.parentNode.style.height = `${availableHeight}px`;
    }
  });
}

const handleReadMore = (e) => {

  const { index, parentNode } = e.target;
  const wrapper = parentNode.querySelector('.wrapper');
  const expandableNode = parentNode.querySelector('.js-expandable');
  const expandedNode = document.querySelectorAll('.js-expanded')[index];
  const currentContentData = contentData[index];
  const { availableHeight } = currentContentData;

  // expand tab
  if (wrapper.classList.contains('collapsed')) {

    // reduce content using recursive function
    wrapper.style.height = `${contentData[index].fullHeight}px`;
    expandableNode.classList.add('expandableHidden');
    expandableNode.classList.remove('expandableVisible');
    expandedNode.classList.remove('expandedHidden');
    expandedNode.classList.add('expandedVisible');
    
    e.target.innerHTML = 'Show Less';
    wrapper.classList.remove('collapsed');

  // collapse tab
  } else {    
    expandableNode.style.height = '';
    wrapper.style.height = `${contentData[index].availableHeight}px`;
    expandableNode.classList.remove('expandableHidden');
    expandableNode.classList.add('expandableVisible');
    expandedNode.classList.add('expandedHidden');
    expandedNode.classList.remove('expandedVisible');
    reduceContent(currentContentData, expandableNode, availableHeight, expandableNode);
    
    e.target.innerHTML = 'Read More';
    wrapper.classList.add('collapsed');
  }
  flags.shouldSectionsBeUpdated = true;
}

//#endregion

//#region [ Horizon ] CONTACT FORM

const validateForm = (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const url = 'form.php';

  // backend validation => send form using ajax request
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

const handleAlerts = (data, isFailed) => {

  const margin = window.innerWidth >= mediaLg ? 20 : 5;
  let heightTotal = margin;
  let delay = 0;
  const delayInterval = 60;
  const alertTimeoutInterval = 5000;
  const transitionTime = 250;
  let visibleAlerts = [];

  // close alert box
  const quitAlertBox = (e) => {
    const self = e.target ? e.target : e;
    const { parentNode, index } = self;

    // hide clicked alert box
    parentNode.style.top = `${parentNode.clientHeight * -1}px`;
    parentNode.classList.remove('alerts__box--visible');
    delay = index * delayInterval;
    parentNode.style.transition = `
      top ${transitionTime}ms ${delay + transitionTime}ms,
      visibility 0s ${delay + transitionTime * 2}ms,
      width ${transitionTime}ms ${delay}ms
    `;

    // update alert boxes below
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

    // clear timeout and event listener
    clearTimeout(self.alertTimeoutId);
    self.alertTimeoutId = null;
    self.removeEventListener('click', quitAlertBox);
  }

  // handle active alerts
  const alerts = isFailed ? ['failure'] : Object.keys(data).filter(key => data[key]);
  [...alerts].forEach((alert, index) => {

    // select elements
    const alertBox = document.querySelector(`.alerts__box--js-${alert}`);
    const alertButton = document.querySelector(`.alerts__button--js-${alert}`);

    // handle appearance of alert boxes
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

    // clear timeout and event
    clearTimeout(alertButton.alertTimeoutId);
    alertButton.alertTimeoutId = null;
    alertButton.removeEventListener('click', quitAlertBox);

    // set timeout and event
    alertButton.alertTimeoutId = setTimeout(() => {
      quitAlertBox(alertButton);
    }, alertTimeoutInterval);
    alertButton.index = index;
    alertButton.addEventListener('click', quitAlertBox);

    // create array of alert objects
    visibleAlerts = [...visibleAlerts, {
      box: alertBox,
      button: alertButton
    }];

    // handle inputs appearance
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

const handleInputStyle = (input, isValid) => {
  if (isValid) {
    if (input.classList.contains('form__input--invalid'))
    input.classList.remove('form__input--invalid');
  } else {
    if (!input.classList.contains('form__input--invalid'))
    input.classList.add('form__input--invalid');
  }
}

const validateEmail = (e) => {
  const self = e.target;
  self.value.match(/^\S+@\S+\.\S+$/)
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}

const validatePhone = (e) => {
  const self = e.target;
  self.value.match(/^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i)
  || self.value.length === 0
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}

const validateMessage = (e) => {
  const self = e.target;
  self.value.length > 0
  ? handleInputStyle(self, true)
  : handleInputStyle(self, false);
}

//#endregion

//#region [ Horizon ] VARIABLES - OVERALL
const flags = {
  isIntroMode: true,
  isMenuTransforming: false,
  shouldSectionsBeUpdated: false,
  isScrollEnabled: false,
  isMobileHeader: false,
  media: null,
  menuLayout: null
}
const mediaSm = 380;
const mediaMd = 768;
const mediaLg = 1200;
let lastMenuItemIndex = 0;
let scrollTimeoutId = null;
let scrollTotal = 0;
//#endregion
//#region [ Horizon ] VARIABLES - INTERVALS
// intro
let introFirstTimeoutId = null;
let introSecondTimeoutId = null;
let introThirdTimeoutId = null;
let introForthTimeoutId = null;
let introCharIntervalId = null;
const introFirstTimeoutInterval = 600;
// menu
const firstTimeoutXs = 300;
const secondTimeoutXs = 600;
const firstTimeoutLg = 500;
const secondTimeoutLg = 500;
//#endregion
//#region [ Horizon ] VARIABLES - INTRO

let introText = 'jakub chojna frontend projects';

const introItemWidth = window.innerWidth >= mediaLg
? 35 : window.innerWidth >= mediaMd ? 35 : 20;
const introItemHeight = 2 * introItemWidth;

const intro = document.querySelector('.intro--js');
const introLoader = document.querySelector('.intro__loader--js');
let introGrid = document.querySelector('.grid--js');
const endingBefore = document.querySelector('.intro__ending--js-before');
const endingAfter = document.querySelector('.intro__ending--js-after');
const introSkip = document.querySelector('.intro__skip--js');

//#endregion
//#region [ Horizon ] VARIABLES - MENU
const pageHeader = document.querySelector('.pageHeader--js');
const visuals = document.querySelector('.visuals--js');
const introBox = document.querySelector('.visuals__introBox--js');
const menuIndicator = document.querySelector('.pageHeader__indicator--js');
const menuUpperBackground = document.querySelector('.visuals__background--js-upper');
const menuBottomBackground = document.querySelector('.visuals__background--js-bottom');
const burgerButton = document.querySelector('.burgerButton--js');
const menu = document.querySelector('.menu--js');
const menuItems = document.querySelectorAll('.menu__item--js');
const menuButtons = document.querySelectorAll('.menu__button--js');
const menuShadows = document.querySelectorAll('.menuSvg__shadow--js');
const menuLabels = document.querySelectorAll('.label--js');
//#endregion
//#region [ Horizon ] VARIABLES - NAVIGATION
const navigation = document.querySelector('.navigation--js');
const navigationBackButton = document.querySelector('.navigation__button--js-back');
const navigationPrevButton = document.querySelector('.navigation__button--js-prev');
const navigationNextButton = document.querySelector('.navigation__button--js-next');
let currentNavigationIndex = null;
//#endregion
//#region [ Horizon ] VARIABLES - MAIN CONTENT
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
//#endregion
//#region [ Horizon ] VARIABLES - CONTACT FORM
const formInputs = document.querySelectorAll('.form__input--js');
const userName = document.querySelector('.form__input--js-name');
const userEmail = document.querySelector('.form__input--js-email');
const userPhone = document.querySelector('.form__input--js-phone');
const userTitle = document.querySelector('.form__input--js-title');
const userMessage = document.querySelector('.form__input--js-message');
const formSubmitButton = document.querySelector('.form__submit--js');

let contentData = [];
const expandableContent = document.querySelectorAll('.js-expandable');
//#endregion

//#region [ Horizon ] FUNCTION CALLS

// page load with no animation intro

intro.classList.add('intro--hidden');
[...menuItems].forEach(item => item.classList.add('menu__item--active'));
visuals.classList.add('visuals--visible');
pageHeader.classList.add('pageHeader--visible');

// page load with no animation intro

flags.media = getCurrentMedia();
flags.menuLayout = getMenuLayout();

//setIntroLoaderPosition();
//loadIntroContent();
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
  //handleIntroAnimation();
  //handleIntroLoader();
  handleExpandableContent(expandableContent);

  // set each section's container top margin
  if (flags.media === 'mediaLg') {
    [...sectionContainers].forEach(container => {
      handleTopMargins(container, minTopMargin);
    });
  }
};

// fetch github api
/* fetch('https://api.github.com/users/jchojna/repos')
  .then(resp => resp.json())
  .then(resp => handleRepo(resp)); */
// ! project id must fit repo id

//#endregion

//#region [ Horizon ] EVENT LISTENERS

introSkip.addEventListener('click', skipIntro);
// MENU AND NAVIGATION
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

[...readMoreButtons].forEach((button, index) => {
  button.index = index;
  button.addEventListener('click', handleReadMore);
});
//#endregion

//#region [ Horizon ] EVENTS - CONTACT FORM
// SAVE FORM INPUTS VALUES TO LOCAL STORAGE
[...formInputs].forEach(input => {
  input.addEventListener('keyup', (e) => localStorage.setItem(e.target.id, e.target.value));
  input.value = localStorage.getItem(input.id) ? localStorage.getItem(input.id) : '';
});

formSubmitButton.addEventListener('click', validateForm);
userEmail.addEventListener('keyup', validateEmail);
userPhone.addEventListener('keyup', validatePhone);
userMessage.addEventListener('keyup', validateMessage);
//#endregion

//#region UNUSED

const handleFastScroll = (e) => {

  // function resetting timeout and scroll accumulator
  /* const reset = () => {
    clearTimeout(scrollTimeoutId);
    scrollTimeoutId = null;
    scrollTotal = 0;
  } */
  if (window.innerWidth < mediaLg) return false;
  if (flags.isIntroMode) return false;
  if (flags.isMenuTransforming) return false;
  if (!flags.isFastScroll) return false;

  const goToNextSection = () => {
    if (lastMenuItemIndex < pageSections.length - 1) {
      if (pageContainer.scrollTop >= sections[lastMenuItemIndex].offset) {
        const nextsectionOffset = sections[++lastMenuItemIndex].offset;
        pageContainer.scrollTo(0, nextsectionOffset);
      }
    }
  }
  // when scrolling down
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
    // when scrolling up
  } else {
    reset();
  } */
  if (e.deltaY > 0) {
    //e.preventDefault();
    flags.isScrollEnabled = false;

    if (!isFastScroll)
    navigateToSection(++lastMenuItemIndex);

    //goToNextSection();
  }
}

//#endregion