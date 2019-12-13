//| FUNCTIONS |
const getCurrentSectionIndex = (scrollOffset) => { // add throttling
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
  const height = menuLinks[index].offsetHeight;
  const offset = menuLinks[index].offsetTop;
  menuIndicator.style.height = `${height}px`;
  menuIndicator.style.top = `${offset}px`;
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

//| GLOBAL VARIABLES |
const pageSections = document.querySelectorAll('.section--js');
const menuLinks = document.querySelectorAll('.menu__link--js');
const menuIndicator = document.querySelector('.menu__indicator--js');

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
  currentSectionIndex: getCurrentSectionIndex(link.offsetTop)
}));

const resumeFields = document.querySelectorAll('.field__container--js');
const resumeButtons = document.querySelectorAll('.field__button--js-resume');
const resumeIndicatorSvgs = document.querySelectorAll('.indicator__svg--js-field');
const professionFields = document.querySelectorAll('.table--js-profession');
const professionButtons = document.querySelectorAll('.field__button--js-profession');
const professionIndicatorSvgs = document.querySelectorAll('.indicator__svg--js-profession');

//| FUNCTION CALLS ON PAGE LOAD |
let currentGlobalSectionIndex = getCurrentSectionIndex(200);
// assign active menu link
handleActiveMenuLink(currentGlobalSectionIndex, 'set');
// assign colors to menu links
[...menuLinks].forEach(link => {
  link.classList.add(`menu__link--${sections[currentGlobalSectionIndex].id}`)
});
handleMenuIndicator(currentGlobalSectionIndex);
handleAccordion([...professionFields], [...professionIndicatorSvgs]);
handleAccordion([...resumeFields], [...resumeIndicatorSvgs]);

//| EVENT HANDLERS|
const handleMenu = () => {
  const updatedGlobalSectionIndex = getCurrentSectionIndex(200);
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

//| EVENT LISTENERS |
window.addEventListener('scroll', handleMenu);
// update objects on resize

[...resumeButtons].forEach((button, index) => {
  button.addEventListener('click', () => handleAccordion([...resumeFields], [...resumeIndicatorSvgs], index));
});
[...professionButtons].forEach((button, index) => {
  button.addEventListener('click', () => handleAccordion([...professionFields], [...professionIndicatorSvgs], index));
});