import { flags, media } from './variables';

type ContentData = {
  fullHeight?: number;
  availableHeight?: number;
  html: string;
  children: any;
};
const readMoreButtons = document.querySelectorAll('.tab__readMore--js');
let contentData: ContentData[] = [];

export const handleReadMore = (e: Event) => {
  if (!e.target) return;
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
    reduceContent(
      currentContentData,
      expandableNode,
      availableHeight,
      expandableNode
    );

    e.target.innerHTML = 'Read More';
    wrapper.classList.add('collapsed');
  }
  flags.shouldSectionsBeUpdated = true;
};

export const addReadMoreEvent = () => {
  [...readMoreButtons].forEach((button, index) => {
    button.index = index;
    button.addEventListener('click', handleReadMore);
  });
};

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
    const wordsArray = data.html
      .slice()
      .split(' ')
      .filter((elem) => elem !== '');
    const reducedArray = [...wordsArray];

    // remove words starting from the end until content fits space
    for (let i = 0; i < wordsArray.length; i++) {
      reducedArray.pop();
      container.innerHTML =
        reducedArray.length === 0
          ? ''
          : `${reducedArray.join(' ')} <span class='dots'>...</span>`;
      if (parent.clientHeight <= available) break;
    }

    // if cloned content contains children nodes
  } else {
    // empty textContent of each childNode
    [...container.children].forEach((child) => (child.textContent = ''));

    // create array of each node's html content
    const nodesArray = data.children.map((child) => child.html);

    // add consectuive nodes content until it extends available space
    for (let i = 0; i < container.children.length; i++) {
      const dataNode = data.children[i];
      const containerNode = container.children[i];
      containerNode.innerHTML = nodesArray[i];

      if (parent.clientHeight > available) {
        // repeat the operations on particular nodes
        reduceContent(dataNode, containerNode, available, parent);

        // remove unnecessary empty nodes outside available space
        [...container.children].forEach((child) => {
          if (child.innerHTML === '') child.parentNode.removeChild(child);
        });
        break;
      }
    }
  }
};

export const handleExpandableContent = () => {
  const expandableContent = document.querySelectorAll('.js-expandable');
  // aquire html and children of every children node and its own children
  const getChildren = (content: HTMLElement) => {
    let array: ContentData[] = [];
    [...content.children].forEach(
      (child) =>
        (array = [
          ...array,
          {
            html: child.innerHTML,
            children: getChildren(child),
          },
        ])
    );
    return array;
  };

  // empty content of every node, including the nested ones
  const emptyContent = (content) => {
    if (content.children.length === 0) {
      content.textContent = '';
    } else {
      [...content.children].forEach((child) => emptyContent(child));
    }
  };

  // clone content data to an array of objects and empty node
  [...expandableContent].forEach((content) => {
    // copy original content node and hide it
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const contentCopy = content.cloneNode(true) as Element;
    contentCopy.classList.remove('js-expandable');
    contentCopy.classList.add('js-expanded');
    contentCopy.classList.add('expandedHidden');
    content.classList.add('expandableVisible');

    // wrap content and content copy inside a wrapper
    content.parentNode.insertBefore(wrapper, content);
    wrapper.append(content, contentCopy);
    contentData = [
      ...contentData,
      {
        fullHeight: content.clientHeight,
        html: content.innerHTML,
        children: getChildren(content),
      },
    ];

    // empty content of original content node
    emptyContent(content);
  });

  // add data from content database to empty content
  [...expandableContent].forEach((content, index) => {
    const currentContentData = contentData[index];
    const minMobileHeight = 300;
    const minDesktopHeight = 200;

    // get available space for reduced content
    content.style.height = '100%';
    contentData[index].availableHeight =
      window.innerWidth >= media.lg
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
      contentData[index].availableHeight =
        window.innerWidth >= media.lg
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
};
