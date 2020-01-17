//| UPDATE MENU ITEMS OFFSETS                                               |//
const updateMenuItemsOffsets = () => {
  [...items].forEach(item => {
    item.offset = item.node.offsetTop;
  });
}
const updateItemsIds = () => {
  [...items].forEach(item => {
    item.currentSectionIndex = getCurrentSectionIndex(item.offset);
  });
}
//| UPDATE SECTIONS OFFSETS                                                 |//
const updateSectionsOffsets = () => {
  [...sections].forEach((section, index) => {
    section.offset = pageSections[index].offsetTop;
  });
}

const getCurrentItemIndex = (cursorYPosition) => {  // ! TO REFACTOR
  return items.length - 1 - [...items]
    .map(item => item.offset)
    .reverse()
    .findIndex(offset => cursorYPosition >= offset)
}

const getCurrentSectionIndex = (scrollOffset) => {  // ! TO REFACTOR
  const currentOffset = window.innerWidth >= mediaDesktop
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
  const itemHeight = items[lastMenuItemIndex].height;
  const viewOffset = pageHeader.scrollTop;
  //: assign size and position                                         ://
  introBox.style.top = `${currentYOffset - viewOffset}px`;
  introBox.style.height = `${itemHeight}px`;
  introBox.style.width = `${itemHeight}px`;
}
//| end of HANDLE INTROBOX                                                  |//
//| HANDLE MENU IN INTRO MODE                                               |//
const handleIntroMenu = (e) => {
  //: handle intro menu on mouse event                                      ://
  if (e && e.type === 'mousemove' && window.innerWidth >= mediaTablet) {    
    const viewOffset = pageHeader.scrollTop;
    const currentItemIndex = getCurrentItemIndex(e.clientY - viewOffset);

    if (currentItemIndex !== lastMenuItemIndex && currentItemIndex < items.length) {
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
//| end of HANDLE MENU IN INTRO MODE                                        |//
//| HANDLE MENU ITEMS                                                       |//
const handleMenuItemClick = (activeIndex) => {

  /*
   ######  ##     ##
  ##    ## ###   ###
  ##       #### ####
   ######  ## ### ##
        ## ##     ##
  ##    ## ##     ##
   ######  ##     ##
  */
  //| HANDLE MENU ITEMS ON MOBILE DEVICES                                   |//
  if (window.innerWidth < mediaTablet) {
    
    //: variables                                                           ://
    const windowHeight = window.innerHeight;
    const clickedItemHeight = items[activeIndex].height;
    const clickedItemOffset = items[activeIndex].offset;
    const clickedElementId = sections[activeIndex].id;
    const viewOffset = pageHeader.scrollTop;
    const upperBackgroundHeight = clickedItemHeight + clickedItemOffset - viewOffset;
    const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
    /*
       ##
     ####
       ##
       ##
       ##
       ##
     ######
    */
    //: change items colors and set introbox position                       ://
    handleColorChange(lastMenuItemIndex, 'deactivate');
    lastMenuItemIndex = activeIndex; // ! what if both are the same
    handleColorChange(lastMenuItemIndex, 'activate');
    handleIntroBox();
    //: remove introBox resize and scroll events                            ://
    pageHeader.removeEventListener('resize', handleIntroBox);
    pageHeader.removeEventListener('scroll', handleIntroBox);
    //: change menu items to be in a fixed position                         ://
    [...menuItems].forEach((item, index) => {
      item.classList.add('menu__item--mobileHeader');
      item.style.top = `${items[index].offset - viewOffset}px`;
    });
    //: set initial link width as style property in order to be animated    ://
    const linkWidth = menuLinks[activeIndex].clientWidth;
    menuLinks[activeIndex].style.width = `${linkWidth}px`;
    items[activeIndex].width = linkWidth;
    //: set backgrounds startings heights                                   ://
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
    //:                                                                     ://
    /*
     #######
    ##     ##
           ##
     #######
    ##
    ##
    #########
    */
    //: add first timeout                                                   ://
    clearTimeout(menuSmFirstTimeoutId);
    clearTimeout(menuSmSecondTimeoutId);
    menuSmFirstTimeoutId = setTimeout(() => {
      //. variables                                                         .//
      const upwardsOffset = clickedItemOffset;
      const downwardsOffset = windowHeight - clickedItemOffset - clickedItemHeight;
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
      menuUpperBackground.style.height = `${clickedItemHeight}px`;
      menuBottomBackground.style.height = 0;
      menuUpperBackground.classList.add('visuals__background--animated');
      menuBottomBackground.classList.add('visuals__background--animated');
      //. remove pointer events from pageHeader                             .//
      pageHeader.classList.remove('pageHeader--intro');
      //. scroll pageContainer to desired position                          .//
      updateSectionsOffsets();
      window.scrollTo({
        left: 0,
        top: sections[activeIndex].offset,
        behavior: 'auto'
      });
      //. add event handling mobile header appearance                       .//
      window.addEventListener('scroll', handleMobileHeader);
      //.                                                                   .//
      /*
       #######
      ##     ##
             ##
       #######
             ##
      ##     ##
       #######
      */
      //. add second timeout                                                .//
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
      }, menuSmSecondTimeoutInterval);
    }, menuSmFirstTimeoutInterval);
    //: end of timeout                                                      ://

  /*
  ##        ######
  ##       ##    ##
  ##       ##
  ##       ##   ####
  ##       ##    ##
  ##       ##    ##
  ########  ######
  */
  //| HANDLE MENU ITEMS ON LARGE SCREEN DEVICES                             |//
  } else if (window.innerWidth >= mediaDesktop) {
    /*
       ##
     ####
       ##
       ##
       ##
       ##
     ######
    */
    //: handle introBox                                                     ://
    introBox.classList.add('visuals__introBox--content');
    introBox.style.height = '100%';
    introBox.style.top = 0;
    introBox.style.width = '100%';
    //: handle menu items and indicator                                     ://
    handleMenuOnClick(lastMenuItemIndex, 'deactivate');
    lastMenuItemIndex = activeIndex; // ! what if both are the same
    handleMenuOnClick(lastMenuItemIndex, 'activate');
    updateSectionsOffsets();
    handleMenuIndicator(lastMenuItemIndex);
    //: remove events                                                       ://
    menu.removeEventListener('mousemove', handleIntroMenu);
    pageContainer.removeEventListener('scroll', handleMenuOnScroll);
    pageContainer.removeEventListener('scroll', handleNavOnScroll);
    scrollEventFlag = false;
    //: handle navigation appearance                                        ://
    if (currentNavigationIndex !== null) {
      handleNavOnClick(currentNavigationIndex, 'deactivate');
    }
    currentNavigationIndex = activeIndex;
    handleNavOnClick(currentNavigationIndex, 'activate');









    //:                                                                     ://
    /*
     #######
    ##     ##
           ##
     #######
    ##
    ##
    #########
    */
    //: set first timeout                                                   ://
    clearTimeout(menuLgFirstTimeoutId);
    menuLgFirstTimeoutId = setTimeout(() => {
      //: translate menu and content to the left of the screen              ://
      menu.classList.remove('menu--intro');
      pageContainer.classList.add('pageContainer--visible');
      //: move introBox to the left and make indicator thiner               ://
      introBox.style.left = 0;
      menuIndicator.classList.add('pageHeader__indicator--narrowed');
      //: handle navigation                                                   ://
      navigation.classList.add('navigation--visible');
      navigationPrevButton.addEventListener('click', navigateToSection);
      navigationNextButton.addEventListener('click', navigateToSection);
      navigationMainButton.addEventListener('click', () => console.log('main'));










      //.                                                                   .//
      /*
       #######
      ##     ##
             ##
       #######
             ##
      ##     ##
       #######
      */
      //. set second timeout                                                .//
      menuLgSecondTimeoutId = setTimeout(() => {
        
        pageContainer.classList.add('pageContainer--smooth');
        menuUpperBackground.classList.add('visuals__background--hidden');
        menuBottomBackground.classList.add('visuals__background--hidden');
        introBox.classList.remove('visuals__introBox--visible');
        //. add navigation buttons transition effects                       .//
        [...navigation.children].forEach(child =>
          child.classList.add('navigation__button--animated'));


        




        


        
      }, menuLgSsecondTimeoutInterval);
    }, menuLgFirstTimeoutInterval);   
  }
}
//| end of HANDLE MENU ITEMS ON MOBILE DEVICES                              |//
/*
########  ##     ## ########   ######   ######## ########
##     ## ##     ## ##     ## ##    ##  ##       ##     ##
##     ## ##     ## ##     ## ##        ##       ##     ##
########  ##     ## ########  ##   #### ######   ########
##     ## ##     ## ##   ##   ##    ##  ##       ##   ##
##     ## ##     ## ##    ##  ##    ##  ##       ##    ##
########   #######  ##     ##  ######   ######## ##     ##
*/
//| BURGER BUTTON HANDLER                                                   |//
const handleBurgerButton = () => {
  //: variables                                                             ://
  const windowHeight = window.innerHeight;
  const activeItemHeight = items[lastMenuItemIndex].height;
  const activeItemOffset = items[lastMenuItemIndex].offset;
  const activeId = sections[lastMenuItemIndex].id;
  const upperBackgroundHeight = activeItemHeight + activeItemOffset;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const upwardsOffset = activeItemOffset;
  const downwardsOffset = windowHeight - activeItemOffset - activeItemHeight;
  /*
     ##
   ####
     ##
     ##
     ##
     ##
   ######
  */
  //: hide burger button                                                    ://
  burgerButton.classList.remove('burgerButton--visible');
  //: set starting position of menu items                                   ://
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
  //: set appearance of introBox and background                             ://
  introBox.classList.add('visuals__introBox--visible');
  menuUpperBackground.classList.remove(`visuals__background--${activeId}`);

  //:                                                                       ://
  /*
   #######
  ##     ##
         ##
   #######
  ##
  ##
  #########
  */
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

    //.                                                                     .//
    /*
     #######
    ##     ##
           ##
     #######
           ##
    ##     ##
     #######
    */
    //. add second timeout                                                  .//
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
    }, menuSmSecondTimeoutInterval);
  }, menuSmFirstTimeoutInterval);
  //: end of timeout                                                        ://
}
//| end of BURGER BUTTON HANDLER                                            |//
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
//| end of HANDLE MOBILE HEADER CHANGE                                      |//
/*
########  ########  ######  ##    ## ########  #######  ########
##     ## ##       ##    ## ##   ##     ##    ##     ## ##     ##
##     ## ##       ##       ##  ##      ##    ##     ## ##     ##
##     ## ######    ######  #####       ##    ##     ## ########
##     ## ##             ## ##  ##      ##    ##     ## ##
##     ## ##       ##    ## ##   ##     ##    ##     ## ##
########  ########  ######  ##    ##    ##     #######  ##
*/
//| HANDLE MENU ITEMS ON SCROLL EVENT                                       |//
const handleMenuOnScroll = () => {
  //: handle indicator and active menu item on section change               ://
  const newMenuItemIndex = getCurrentSectionIndex(0);
  if (newMenuItemIndex !== lastMenuItemIndex) {
    menuLinks[lastMenuItemIndex].classList.remove('menu__link--active');
    lastMenuItemIndex = newMenuItemIndex;
    menuLinks[lastMenuItemIndex].classList.add('menu__link--active');
    handleMenuIndicator(lastMenuItemIndex);
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
//| end of HANDLE MENU ITEMS ON SCROLL EVENT                                |//
//| HANDLE MENU ITEMS ON CLICK EVENT                                        |//
const handleMenuOnClick = (activeIndex, action) => {
  //: add new appearance                                                    ://
  if (action === 'activate') {
    const currentId = sections[activeIndex].id;
    [...menuLinks].forEach((link, linkIndex) => {
      link.classList.add(`menu__link--${currentId}`);
      items[linkIndex].currentSectionIndex = activeIndex;
      if (linkIndex === activeIndex) link.classList.add('menu__link--active');
    });
  //: remove current appearance                                                    ://
  } else if (action === 'deactivate') {
    [...menuLinks].forEach((link, linkIndex) => {
      const currentId = sections[items[linkIndex].currentSectionIndex].id;
      link.classList.remove(`menu__link--${currentId}`);
      if (linkIndex === activeIndex) link.classList.remove('menu__link--active');
    });
  }
}
//| end of HANDLE MENU ITEMS ON CLICK EVENT                                 |//
//| HANDLE MENU INDICATOR                                                   |//
const handleMenuIndicator = (index) => {
  const offset = items[index].offset;
  menuIndicator.style.top = `${offset}px`;
}
//| end of HANDLE MENU INDICATOR                                            |//
/*
##    ##    ###    ##     ##
###   ##   ## ##   ##     ##
####  ##  ##   ##  ##     ##
## ## ## ##     ## ##     ##
##  #### #########  ##   ##
##   ### ##     ##   ## ##
##    ## ##     ##    ###
*/
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
//| end of HANDLE PREVIOUS AND NEXT BUTTON VISIBILITY                       |//
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
//| end of HANDLE NAVIGATION ON SCROLL EVENT                                |//
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
//| end of HANDLE NAVIGATION ON CLICK EVENT                                 |//
//| HANDLE JUMPING TO ANOTHER SECTION USING NAVIGATION                      |//
const navigateToSection = (e) => {
  //: activate scroll events                                                |//
  pageContainer.addEventListener('scroll', handleMenuOnScroll);
  pageContainer.addEventListener('scroll', handleNavOnScroll);
  scrollEventFlag = true;
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
//| end of HANDLE JUMPING TO ANOTHER SECTION USING NAVIGATION               |//
//| RESUME'S ACCORDION HANDLER                                              |//
const handleAccordion = (tabs, clickedIndex) => {
  tabs.forEach((tab, index) => {
    const content = tab.querySelector('[class*=content]');
    const button = tab.querySelector('[class*="button"]');
    const mark = tab.querySelector('[class*="mark"]');

    //: when specific tab is being clicked                             ://
    if (clickedIndex !== undefined) {
      const subtab = /subtab/.test(button.className);
      //. handle clicked tab                                      .//
      if (clickedIndex === index) {
        const translation = content.style.marginTop;
        //. apply transition effect                               .//
        if (!content.classList.contains('rollable')) content.classList.add('rollable');
        //. apply transformations                                 .//
        if (translation === 0 || translation === '' || translation === '0px') {
          content.style.marginTop = `${-1 * content.clientHeight - 2}px`;
          button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.remove('mark--unrolled');
        } else {
          content.style.marginTop = 0;
          button.classList.add(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.add('mark--unrolled');
        }
      //. handle not clicked elements                             .//
      } else {
        content.style.marginTop = `${-1 * content.clientHeight - 2}px`;
        button.classList.remove(`${subtab ? 'sub' : ''}tab__button--unrolled`);
        mark.classList.remove('mark--unrolled');
      }
    //: handle elements on page load                                   ://
    } else {
      content.style.marginTop = `${-1 * content.clientHeight - 2}px`;
      mark.classList.remove('mark--unrolled');
    }
  });
}
//| end of RESUME'S ACCORDION HANDLER                                       |//
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
//| end of FETCH GITHUB API                                                 |//

//| GLOBAL VARIABLES                                                        |//
//: INTRO                                                                   ://
let scrollEventFlag = false;
const mediaTablet = 768;
const mediaDesktop = 1200;
let lastMenuItemIndex = 0;
//: INTERVALS                                                               ://
let menuSmFirstTimeoutId = null;
let menuSmSecondTimeoutId = null;
let menuLgFirstTimeoutId = null;
let menuLgSecondTimeoutId = null;
const menuSmFirstTimeoutInterval = 300;
const menuSmSecondTimeoutInterval = 600;
const menuLgFirstTimeoutInterval = 500;
const menuLgSsecondTimeoutInterval = 500;
//: MENU AND NAVIGATION                                                     ://
const pageHeader = document.querySelector('.pageHeader--js');
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
const navigationMainButton = document.querySelector('.navigation__button--js-main');
const navigationPrevButton = document.querySelector('.navigation__button--js-prev');
const navigationNextButton = document.querySelector('.navigation__button--js-next');
let currentNavigationIndex = null;

//: MAIN CONTENT                                                            ://
const pageContainer = document.querySelector('.pageContainer--js');
const pageSections = document.querySelectorAll('.section--js');
const resumeTabs = document.querySelectorAll('.tab--js-resume');
const resumeButtons = document.querySelectorAll('.tab__button--js-resume');
const resumeSubtabs = document.querySelectorAll('.subtab--js-resume');
const resumeSubButtons = document.querySelectorAll('.subtab__button--js-resume');
const otherProjectsTabs = document.querySelectorAll('.tab--js-other');
const otherProjectsButtons = document.querySelectorAll('.tab__button--js-other');

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


//| FUNCTION CALLS ON PAGE LOAD                                             |//
//let currentGlobalSectionIndex = getCurrentSectionIndex(sectionScrollOffset);
// assign active menu link
//handleActiveMenuLink(currentGlobalSectionIndex, 'set');
// assign colors to menu links
/* [...menuLinks].forEach(link => {
  link.classList.add(`menu__link--${sections[currentGlobalSectionIndex].id}`)
}); */

handleIntroMenu();

//: handle page's accordions                                           ://
handleAccordion([...resumeSubtabs]);
handleAccordion([...resumeTabs]);
if (window.innerWidth < mediaDesktop) {
  handleAccordion([...otherProjectsTabs]);
}


/* fetch('https://api.github.com/users/jchojna/repos')
  .then(resp => resp.json())
  .then(resp => handleRepo(resp)); */
// ! project id must fit repo id
//| EVENT HANDLERS                                                          |//

//| EVENT LISTENERS                                                         |//
//: MENU AND NAVIGATION                                                ://
menu.addEventListener('mousemove', handleIntroMenu);
window.addEventListener('resize', updateSectionsOffsets);
pageHeader.addEventListener('resize', handleIntroBox);
pageHeader.addEventListener('scroll', handleIntroBox);

pageContainer.addEventListener('wheel', () => {
  if (!scrollEventFlag) {
    pageContainer.addEventListener('scroll', handleMenuOnScroll);
    pageContainer.addEventListener('scroll', handleNavOnScroll);
    scrollEventFlag = true;
  }
});


[...menuLinks].forEach((link, index) => {
  link.addEventListener('click', () => handleMenuItemClick(index));
});
burgerButton.addEventListener('click', handleBurgerButton);
//: RESUME                                                             ://
[...resumeButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...resumeTabs], index));
});
[...resumeSubButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...resumeSubtabs], index));
});
//: OTHER PROJECTS                                                     ://
if (window.innerWidth < mediaDesktop) {
  [...otherProjectsButtons].forEach((button, index) => {
    button.addEventListener('click', () =>
    handleAccordion([...otherProjectsTabs], index));
  });
}