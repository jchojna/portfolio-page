//| FUNCTIONS |

const updateLinks = () => {
  //[...links].forEach(link => link.offset = link.offsetTop);
  [...links].forEach(link => {
    link.offset = link.node.offsetTop;
    link.height = link.node.clientHeight;
  });
}

const handleIntroMenu = (e) => {

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

  const viewportOffset = window.pageYOffset;
  
  // handle intro menu on mouse event
  if (e && e.type === 'mousemove') {
    // get link index based on cursor position
    const currentLinkIndex = getCurrentLinkIndex(e.clientY + viewportOffset);

    if (currentLinkIndex !== lastLinkIndex) {
      // set intro box position based on current link index
      const currentYPosition = links[currentLinkIndex].offset;
      introBox.style.top = `${currentYPosition}px`;
      // set color of last hovered menu item
      toggleLink(lastLinkIndex, 'deactivate');
      lastLinkIndex = currentLinkIndex;
      toggleLink(lastLinkIndex, 'activate');
    }

  // handle intro menu on window resize
  } else if (e && e.type === 'resize') {
    const currentYPosition = links[lastLinkIndex].offset;
    const linkHeight = links[lastLinkIndex].height;
    introBox.style.top = `${currentYPosition}px`;
    introBox.style.height = `${linkHeight}px`;
    introBox.style.width = `${linkHeight}px`;

  // handle intro menu on page load
  } else {
    const linkHeight = links[lastLinkIndex].height;
    const startYPosition = links[lastLinkIndex].offset;
    const startLinkId = sections[lastLinkIndex].id;
    menuLinks[lastLinkIndex].classList.add(`menu__link--intro-${startLinkId}`);
    introBox.classList.add(`pageHeader__introBox--${startLinkId}`);
    introBox.style.height = `${linkHeight}px`;
    introBox.style.width = `${linkHeight}px`;
    introBox.style.top = `${startYPosition}px`;
  }
}

// handle menu items on mobile devices
const handleMenuItems = (activeIndex) => {

  const windowHeight = window.innerHeight;
  const clickedItemHeight = links[activeIndex].height;
  const clickedItemOffset = links[activeIndex].offset;
  const upperBackgroundHeight = clickedItemOffset + clickedItemHeight;
  const bottomBackgroundHeight = windowHeight - upperBackgroundHeight;
  const timeoutInterval = 200;
  
  pageContainer.style.top = `${links[activeIndex].offset}px`;
  menuUpperBackground.style.height = `${upperBackgroundHeight}px`;
  menuBottomBackground.style.height = `${bottomBackgroundHeight}px`;

  // change menu items to absolutely positioned elements
  [...menuItems].forEach((item, itemIndex) => {
    item.classList.add('menu__item--content');
    item.style.top = `${links[itemIndex].offset}px`;
  });

  // set timeout for translating menu items
  // clear timeouts
  const timeoutId = setTimeout(() => {

    const upwardsOffset = clickedItemOffset;
    const downwardsOffset = windowHeight - clickedItemOffset - clickedItemHeight;

    [...menuItems].forEach((item, itemIndex) => {
      const currentItemOffset = links[itemIndex].offset;
      if (itemIndex <= activeIndex) {
        item.style.top = `${currentItemOffset - upwardsOffset}px`;
      } else {
        item.style.top = `${currentItemOffset + downwardsOffset}px`;
      }
    });
    introBox.classList.add('pageHeader__introBox--content');
    introBox.style.top = 0;
    // hide menu background
    menuUpperBackground.style.height = `${clickedItemHeight}px`;
    menuBottomBackground.style.height = 0;  
    // show main content of the page
    pageHeader.classList.remove('pageHeader--intro');
    pageContainer.classList.remove('pageContainer--hidden');

  }, timeoutInterval);

  console.log(activeIndex);
















}


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

const handleAccordion = (array, indicators, clickedIndex) => {
  array.forEach((item, index) => {

    if (clickedIndex !== null) {
      
        const svg = item.parentNode.querySelector('[class*="svg"]');
        const button = item.parentNode.querySelector('[class*="button"]');
        const margin = item.style.marginTop;

        // handle clicked element
        if (clickedIndex === index) {
          // apply transition effect
          if (!item.classList.contains('rollable')) item.classList.add('rollable');
          // apply transformations
          if (margin === 0 || margin === '' || margin === '0px') {
            item.style.marginTop = `${-1 * item.clientHeight}px`;
            svg.classList.remove('indicator__svg--active');
            button.classList.remove('field__button--active');
          } else {
            item.style.marginTop = 0;
            svg.classList.add('indicator__svg--active');
            button.classList.add('field__button--active');
          }
        // handle not clicked elements
        } else {
          item.style.marginTop = `${-1 * item.clientHeight}px`;
          svg.classList.remove('indicator__svg--active');
          button.classList.remove('field__button--active');
        }
    // handle elements on page load
    } else {
      item.style.marginTop = `${-1 * item.clientHeight}px`;
      indicators[index].classList.remove('indicator__svg--active');
    }
  });
}

//| GLOBAL VARIABLES |//
//: INTRO ://
let isIntroMode = true;
let lastLinkIndex = 0;
const introBox = document.querySelector('.pageHeader__introBox--js');

//: MAIN CONTENT ://
const pageContainer = document.querySelector('.pageContainer--js');
const pageSections = document.querySelectorAll('.section--js');

//: MENU AND NAVIGATION ://
const pageHeader = document.querySelector('.pageHeader--js');
const menuIndicator = document.querySelector('.pageHeader__indicator--js');
const menuUpperBackground = document.querySelector('.pageHeader__background--js-upper');
const menuBottomBackground = document.querySelector('.pageHeader__background--js-bottom');

const menuList = document.querySelector('.menu__list--js');
const menuItems = document.querySelectorAll('.menu__item--js');
const menuLinks = document.querySelectorAll('.menu__link--js');
const sectionScrollOffset = 200;
const navigation = document.querySelector('.navigation--js');
const navigationMainButton = document.querySelector('.navigation__button--js-main');
const navigationPrevButton = document.querySelector('.navigation__button--js-prev');
const navigationNextButton = document.querySelector('.navigation__button--js-next');

const resumeFields = document.querySelectorAll('.field__container--js');
const resumeButtons = document.querySelectorAll('.field__button--js-resume');
const resumeIndicatorSvgs = document.querySelectorAll('.indicator__svg--js-field');
const professionFields = document.querySelectorAll('.table--js-profession');
const professionButtons = document.querySelectorAll('.field__button--js-profession');
const professionIndicatorSvgs = document.querySelectorAll('.indicator__svg--js-profession');

const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  node: section,
  offset: section.offsetTop
}));

const links = [...menuLinks].map((link, index) => ({
  index,
  node: link,
  offset: link.offsetTop,
  height: link.clientHeight,
  currentSectionIndex: getCurrentSectionIndex(link.offsetTop)
}));

let currentNavigationIndex = getCurrentSectionIndex(navigation.offsetTop);

//| FUNCTION CALLS ON PAGE LOAD |//
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
handleAccordion([...professionFields], [...professionIndicatorSvgs]);
handleAccordion([...resumeFields], [...resumeIndicatorSvgs]);

//| EVENT HANDLERS |//

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

//| EVENT LISTENERS |//

//: UPDATE GLOBAL OBJECTS ://
window.addEventListener('resize', updateLinks);
// ! update serctions on resize

//: INTRO ://
menuList.addEventListener('mousemove', handleIntroMenu);
window.addEventListener('resize', handleIntroMenu);

//: MENU AND NAVIGATION ://
window.addEventListener('scroll', handleMenu);
window.addEventListener('scroll', handleNavigation);

[...menuLinks].forEach((link, index) => {
  link.addEventListener('click', () => handleMenuItems(index));
});

navigationMainButton.addEventListener('click', () => console.log('main'));
navigationPrevButton.addEventListener('click', navigateToSection);
navigationNextButton.addEventListener('click', navigateToSection);

//: RESUME ://
[...resumeButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...resumeFields], [...resumeIndicatorSvgs], index));
});
[...professionButtons].forEach((button, index) => {
  button.addEventListener('click', () =>
  handleAccordion([...professionFields], [...professionIndicatorSvgs], index));
});