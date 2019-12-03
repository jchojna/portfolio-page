const pageSections = document.querySelectorAll('.section--js');
const menuLinks = document.querySelectorAll('.menu__link--js');

//| GLOBAL VARIABLES |
const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  offset: section.offsetTop,
  section: pageSections[index],
  menuLink: menuLinks[index]
}));

const scrollOffset = 400;

//| FUNCTIONS |
const getCurrentSectionIndex = () => { // add throttling
  const currentOffset = window.pageYOffset;
  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset - scrollOffset);
}

const handleActiveMenuLink = (index, action) => {
  if (action === 'set') {
    sections[index].menuLink.classList.add('menu__link--active');
  } else if (action === 'unset') {
    sections[index].menuLink.classList.remove('menu__link--active');
  }
}

//| FUNCTION CALLS ON PAGE LOAD |
let currentSectionIndex = getCurrentSectionIndex();
handleActiveMenuLink(currentSectionIndex, 'set');

//| EVENT HANDLERS|
const handleMenu = () => {
  const updatedIndex = getCurrentSectionIndex();
  // perform DOM manipulation when index changes
  if (updatedIndex !== currentSectionIndex) {
    handleActiveMenuLink(currentSectionIndex, 'unset');
    currentSectionIndex = updatedIndex;
    handleActiveMenuLink(currentSectionIndex, 'set');

  } else {
    return;
  }
}

//| EVENT LISTENERS |
window.addEventListener('scroll', handleMenu);