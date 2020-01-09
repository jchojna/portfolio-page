//| FUNCTIONS |

const updateLinks = () => {
  //[...links].forEach(link => link.offset = link.offsetTop);
  [...links].forEach(link => {
    link.offset = link.node.offsetTop;
    link.height = link.node.clientHeight;
  });
}

//| HANDLE MENU IN INTRO MODE                                               |//
const handleIntroMenu = (e) => {
  //: CHANGE ACTIVE LINK ON HOVER                                      ://
  const toggleLink = (index, action) => {
    const introLinkId = sections[index].id;

    if (action === 'activate') {
      menuLinks[index].classList.add(`menu__link--intro-${introLinkId}`);
      introBox.classList.add(`pageHeader__introBox--${introLinkId}`);
    } else if (action === 'deactivate') {
      menuLinks[index].classList.remove(`menu__link--intro-${introLinkId}`);
      introBox.classList.remove(`pageHeader__introBox--${introLinkId}`);
    }
  }
  //: SET INTROBOX AND MENU BACKGROUND                                 ://
  const setGraphic = () => {
    const currentYPosition = links[lastLinkIndex].offset;
    const linkHeight = links[lastLinkIndex].height;
    const upperBackgroundHeight = currentYPosition + linkHeight;
    const bottomBackgroundHeight = pageHeader.clientHeight > upperBackgroundHeight
    ? pageHeader.clientHeight - upperBackgroundHeight : 0;

    introBox.style.top = `${currentYPosition}px`;
    introBox.style.height = `${linkHeight}px`;
    introBox.style.width = `${linkHeight}px`;
    menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
    menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
  }
  //: handle intro menu on mouse event                                 ://
  if (e && e.type === 'mousemove') {
    //. get link index based on cursor position                   .//
    const viewportOffset = window.pageYOffset;
    const currentLinkIndex = getCurrentLinkIndex(e.clientY + viewportOffset);

    if (currentLinkIndex !== lastLinkIndex) {
      //. set intro box position based on current link index      .//
      const currentYPosition = links[currentLinkIndex].offset;
      introBox.style.top = `${currentYPosition}px`;
      //. set color of last hovered menu item                     .//
      toggleLink(lastLinkIndex, 'deactivate');
      lastLinkIndex = currentLinkIndex;
      toggleLink(lastLinkIndex, 'activate');
    }
  //: handle intro menu on window resize                               ://
  } else if (e && e.type === 'resize') {
    setGraphic();

  //: handle intro menu on page load                                   ://
  } else {
    setGraphic();
    const startLinkId = sections[lastLinkIndex].id;
    menuLinks[lastLinkIndex].classList.add(`menu__link--intro-${startLinkId}`);
    introBox.classList.add(`pageHeader__introBox--${startLinkId}`);
  }
}
//| end of HANDLE MENU IN INTRO MODE                                        |//

//| HANDLE MENU ITEMS ON MOBILE DEVICES                                     |//
const handleMenuClick = (activeIndex) => {
  //: variables                                                        ://
  const pageSections = document.querySelectorAll('.section--js');
  const windowHeight = window.innerHeight;
  const clickedItemHeight = items[activeIndex].height;
  const clickedItemOffset = items[activeIndex].offset;
  const clickedElementId = sections[activeIndex].id;
  const clickedLink = document.querySelectorAll('.menu__link--js')[activeIndex];
  const clickedLinkWidth = clickedLink.clientWidth;
  const upperBackgroundHeight = clickedItemOffset + clickedItemHeight;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const timeoutInterval = 200;
  
  //: calculate sizes and offsets of some elements                     ://
  pageContainer.style.top = `${links[activeIndex].offset}px`;
  menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
  menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
  burgerButton.style.height = `${clickedItemHeight}px`;
  burgerButton.style.width = `${clickedItemHeight}px`;

  //: change menu items to absolutely positioned elements              ://
  [...menuItems].forEach((item, itemIndex) => {
    item.classList.remove('menu__item--intro');
    item.style.top = `${items[itemIndex].offset}px`;
  });

  //: set menu item's width                                            ://
  menuLinks[activeIndex].style.width = `${clickedLinkWidth}px`;
  links[activeIndex].width = clickedLinkWidth;

  //: set timeout for translating menu items                           ://
  clearTimeout(menuTimeoutId);
  menuTimeoutId = setTimeout(() => {
    //. variables                                                 .//
    const upwardsOffset = clickedItemOffset;
    const downwardsOffset = windowHeight - clickedItemOffset - clickedItemHeight;
    //. set position of menu items                                .//
    [...menuItems].forEach((item, itemIndex) => {
      const currentItemOffset = links[itemIndex].offset;
      if (itemIndex <= activeIndex) {
        item.style.top = `${currentItemOffset - upwardsOffset}px`;
      } else {
        item.style.top = `${currentItemOffset + downwardsOffset}px`;
      }
    });
    //. translate link name to the right side                     .//
    menuLinks[activeIndex].style.width = '100%';
    menuLinks[activeIndex].classList.add('menu__link--intro');
    //. set position of introBox                                  .//
    introBox.classList.remove('pageHeader__introBox--intro');
    introBox.classList.remove('pageHeader__introBox--visible');
    introBox.style.top = 0;
    //. handle menu background                                    .//
    menuUpperBackground.style.height = `${clickedItemHeight}px`;
    menuBottomBackground.style.height = 0;
    menuUpperBackground.classList.add(`pageHeader__background--${clickedElementId}`);
    menuUpperBackground.classList.add('pageHeader__background--intro');
    menuUpperBackground.classList.add('pageHeader__background--animated');
    menuBottomBackground.classList.add('pageHeader__background--animated');
    //. show main content of the page                             .//
    pageHeader.classList.remove('pageHeader--intro');
    pageContainer.classList.add('pageContainer--visible');
    //. show burger button                                        .//
    burgerButton.classList.add('burgerButton--visible');
    burgerButton.classList.add(`burgerButton--${clickedElementId}`);
    //. handle resume's accordions when content is displayed      .//
    handleAccordion([...resumeSubtabs]);
    handleAccordion([...resumeTabs]);
    handleAccordion([...otherProjectsTabs]);
    //. set each section's offset from the top                    .//
    [...sections].forEach((section, index) => {
      section.offset = pageSections[index].offsetTop;
    });
    //. scroll to desired position                                .//
    window.scrollTo({
      left: 0,
      top: sections[activeIndex].offset,
      behavior: 'auto'
    });

  }, timeoutInterval);
  //: end of timeout                                                   ://
}
//| end of HANDLE MENU ITEMS ON MOBILE DEVICES                              |//

//| BURGER BUTTON HANDLER                                                   |//
const handleBurgerButton = () => {
  //: variables                                                        ://
  const windowHeight = window.innerHeight;
  const activeItemHeight = links[lastLinkIndex].height;
  const activeItemOffset = links[lastLinkIndex].offset;
  const lastElementId = sections[lastLinkIndex].id;
  const upperBackgroundHeight = activeItemHeight + activeItemOffset;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const timeoutInterval = 600;
  //: hide burger button                                               ://
  burgerButton.classList.remove('burgerButton--visible');
  //: set position of menu items                                       ://
  [...menuItems].forEach((item, itemIndex) => {
    const currentItemOffset = links[itemIndex].offset;
    item.style.top = `${currentItemOffset}px`;
  });
  //: show menu background                                             ://
  menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
  menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;
  menuUpperBackground.classList.remove(`pageHeader__background--${lastElementId}`);
  menuUpperBackground.classList.remove('pageHeader__background--intro');
  //: set position of introBox                                         ://
  introBox.style.top = `${activeItemOffset}px`;
  introBox.classList.add('pageHeader__introBox--visible');
  //: set menu item's width                                            ://
  menuLinks[lastLinkIndex].classList.remove('menu__link--intro');
  menuLinks[lastLinkIndex].style.width = `${links[lastLinkIndex].width}px`;
  //: set timeout for translating menu items                           ://
  clearTimeout(menuTimeoutId);
  menuTimeoutId = setTimeout(() => {
    //. change menu items to static elements                      .//
    [...menuItems].forEach(item => item.classList.add('menu__item--intro'));
    //. change introBox transition time                           .//
    introBox.classList.add('pageHeader__introBox--intro');
    //. hide main content of the page                             .//
    pageHeader.classList.add('pageHeader--intro');
    pageContainer.classList.remove('pageContainer--visible');
    //. handle burger button's color                              .//
    burgerButton.classList.remove(`burgerButton--${lastElementId}`);

    menuUpperBackground.classList.remove('pageHeader__background--animated');
    menuBottomBackground.classList.remove('pageHeader__background--animated');

  }, timeoutInterval);
  //: end of timeout                                                   ://
}
//| end of BURGER BUTTON HANDLER                                            |//

const getCurrentLinkIndex = (cursorYPosition) => {  // ! TO REFACTOR
  return links.length - 1 - [...links]
    .map(link => link.offset)
    .reverse()
    .findIndex(offset => cursorYPosition >= offset)
}

const getCurrentSectionIndex = (scrollOffset) => { // add throttling  // ! TO REFACTOR
  const currentOffset = window.pageYOffset;
  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset - scrollOffset);
}

const handleActiveMenuLink = (index, action) => {
  if (action === 'set') {
    menuLinks[index].classList.add('menu__link--active');
  } else if (action === 'unset') {
    menuLinks[index].classList.remove('menu__link--active');
  }
}

const handleMenuIndicator = (index) => {
  if (!isIntroMode) {
    const height = menuLinks[index].offsetHeight;
    const offset = menuLinks[index].offsetTop;
    menuIndicator.style.height = `${height}px`;
    menuIndicator.style.top = `${offset}px`;
  }
}

const handleNavigation = (e) => {
  const updatedNavigationIndex = getCurrentSectionIndex(navigation.offsetTop);
  const lastElementIndex = sections.length - 1;

  const toggleVisibility = (index, action) => {

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

  if (e) {
    // change navigation elements class names when index changes
    if (updatedNavigationIndex !== currentNavigationIndex) {
      for (let child of navigation.children) {
        child.classList.remove(`navigation__button--${sections[currentNavigationIndex].id}`);
        toggleVisibility(currentNavigationIndex, 'show');
      }
      currentNavigationIndex = updatedNavigationIndex;
      for (let child of navigation.children) {
        child.classList.add(`navigation__button--${sections[currentNavigationIndex].id}`);
        toggleVisibility(currentNavigationIndex, 'hide');
      }
    }

  // assign class names on page load
  } else {

    for (let child of navigation.children) {
      child.classList.add(`navigation__button--${sections[currentNavigationIndex].id}`);
      toggleVisibility(currentNavigationIndex, 'hide');
    }
  }
}

const navigateToSection = (e) => {
  const currentSectionIndex = getCurrentSectionIndex(sectionScrollOffset);
  const targetIndex = e.target === navigationPrevButton
  ? currentSectionIndex > 0
    ? currentSectionIndex - 1
    : 0
  : currentSectionIndex < pageSections.length - 1
    ? currentSectionIndex + 1
    : pageSections.length - 1;
  
  window.scrollTo(0, pageSections[targetIndex].offsetTop);
}

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
//: INTRO                                                              ://
let isIntroMode = true;
let lastLinkIndex = 0;
const introBox = document.querySelector('.pageHeader__introBox--js');
//: INTERVALS                                                          ://
let menuTimeoutId = null;
//: MAIN CONTENT                                                       ://
const pageContainer = document.querySelector('.pageContainer--js');
const pageSections = document.querySelectorAll('.section--js');
//: MENU AND NAVIGATION                                                ://
const pageHeader = document.querySelector('.pageHeader--js');
const menuIndicator = document.querySelector('.pageHeader__indicator--js');
const menuUpperBackground = document.querySelector('.pageHeader__background--js-upper');
const menuBottomBackground = document.querySelector('.pageHeader__background--js-bottom');
const burgerButton = document.querySelector('.burgerButton--js');

const menuList = document.querySelector('.menu__list--js');
const menuItems = document.querySelectorAll('.menu__item--js');
const menuLinks = document.querySelectorAll('.menu__link--js');
const sectionScrollOffset = 200;
const navigation = document.querySelector('.navigation--js');
const navigationMainButton = document.querySelector('.navigation__button--js-main');
const navigationPrevButton = document.querySelector('.navigation__button--js-prev');
const navigationNextButton = document.querySelector('.navigation__button--js-next');

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
  offset: item.offsetTop,
  height: item.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(item.offsetTop)
}));

const links = [...menuLinks].map((link, index) => ({
  index,
  node: link,
  offset: link.offsetTop,
  height: link.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(link.offsetTop)
}));

let currentNavigationIndex = getCurrentSectionIndex(navigation.offsetTop);

//| FUNCTION CALLS ON PAGE LOAD                                             |//
let currentGlobalSectionIndex = getCurrentSectionIndex(sectionScrollOffset);
// assign active menu link
//handleActiveMenuLink(currentGlobalSectionIndex, 'set');
// assign colors to menu links
/* [...menuLinks].forEach(link => {
  link.classList.add(`menu__link--${sections[currentGlobalSectionIndex].id}`)
}); */
handleIntroMenu();
handleNavigation();
handleMenuIndicator(currentGlobalSectionIndex);

/* fetch('https://api.github.com/users/jchojna/repos')
  .then(resp => resp.json())
  .then(resp => handleRepo(resp)); */
// ! project id must fit repo id
//| EVENT HANDLERS                                                          |//
const handleMenu = () => {
  if (!isIntroMode) {
    const updatedGlobalSectionIndex = getCurrentSectionIndex(sectionScrollOffset);
    // perform DOM manipulation when index changes
    if (updatedGlobalSectionIndex !== currentGlobalSectionIndex) {
      handleActiveMenuLink(currentGlobalSectionIndex, 'unset');
      currentGlobalSectionIndex = updatedGlobalSectionIndex;
      handleActiveMenuLink(currentGlobalSectionIndex, 'set');
      handleMenuIndicator(currentGlobalSectionIndex);
    } 
  
    for (let i = 0; i < menuLinks.length; i++) {
      const updatedIndex = getCurrentSectionIndex(links[i].offset);
      // perform DOM manipulation when index changes
      if (updatedIndex !== links[i].currentSectionIndex) {
  
        links[i].currentSectionIndex = updatedIndex;
        const currentSectionId = sections[updatedIndex].id;
        menuLinks[i].className = `
          menu__link menu__link--js menu__link--${currentSectionId}
          ${i === currentGlobalSectionIndex ? 'menu__link--active' : ''}
        `;
  
      } else {
        continue;
      }
    }
  }
}
//| EVENT LISTENERS                                                         |//
//: UPDATE GLOBAL OBJECTS                                              ://
window.addEventListener('resize', updateLinks);
// ! update serctions on resize
//: INTRO                                                              ://
menuList.addEventListener('mousemove', handleIntroMenu);
window.addEventListener('resize', handleIntroMenu);
//: MENU AND NAVIGATION                                                ://
window.addEventListener('scroll', handleMenu);
window.addEventListener('scroll', handleNavigation);

[...menuLinks].forEach((link, index) => {
  link.addEventListener('click', () => handleMenuClick(index));
});

navigationPrevButton.addEventListener('click', navigateToSection);
navigationNextButton.addEventListener('click', navigateToSection);
navigationMainButton.addEventListener('click', () => console.log('main'));
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
[...otherProjectsButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...otherProjectsTabs], index));
});