const pageSections = document.querySelectorAll('.section--js');

const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  offset: section.offsetTop
}));

const getCurrentSectionIndex = () => { // add throttling
  const currentOffset = window.pageYOffset;
  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset);
}

let currentSectionIndex = getCurrentSectionIndex();

const handleMenu = () => {
  const updatedIndex = getCurrentSectionIndex();
  // perform DOM manipulation when index changes
  if (updatedIndex !== currentSectionIndex) {
    currentSectionIndex = updatedIndex;









  } else {
    return;
  }
}

window.addEventListener('scroll', handleMenu);