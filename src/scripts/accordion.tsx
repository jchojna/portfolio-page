import { flags } from './variables';

const findFirstParentWithClass = (element, className) => {
  while (element.tagName !== 'HTML' && !element.classList.contains(className)) {
    element = element.parentNode;
  }
  return element;
};

export const handleAccordion = (tabs, clickedIndex, excludeIndex) => {
  tabs.forEach((tab, index) => {
    const container = tab.querySelector('[class*=container]');
    const content = container.firstElementChild;
    const button = tab.querySelector('[class*="button"]');
    const mark = tab.querySelector('[class*="mark"]');

    // when specific tab is being clicked
    if (clickedIndex !== undefined) {
      const subtab = /subtab/.test(button.className);
      const isDisabled =
        /other/.test(tab.className) && flags.media !== 'mediaXs';
      if (isDisabled) return false;

      // handle clicked tab
      if (clickedIndex === index) {
        const height = container.style.height;
        // apply transition effect
        if (!container.classList.contains('rollable'))
          container.classList.add('rollable');
        // apply transformations
        if (height === 0 || height === '0px') {
          container.style.height = `${content.clientHeight}px`;
          button.classList.add(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.add('mark--unrolled');
        } else {
          container.style.height = 0;
          button.classList.remove(
            `${subtab ? 'sub' : ''}tab__button--unrolled`
          );
          mark.classList.remove('mark--unrolled');
        }

        // when subtab clicked
        if (subtab) {
          const parentContainer = findFirstParentWithClass(
            container.parentNode,
            'container'
          );
          const subtabsHeaders =
            parentContainer.querySelectorAll('.subtab__header');
          const subtabsContainers =
            parentContainer.querySelectorAll('[class*=container]');
          const isUnrolled = mark.classList.contains('mark--unrolled');

          const clickedSubtabsContainerHeight =
            container.firstElementChild.clientHeight;
          const subtabsHeadersHeights = [...subtabsHeaders].reduce(
            (acc, curr) => acc + curr.clientHeight,
            0
          );

          let height = 0;
          if (flags.media === 'mediaLg') {
            height = isUnrolled ? clickedSubtabsContainerHeight : 0;
          } else {
            height = [...subtabsContainers].reduce(
              (acc, curr) =>
                curr.style.height === '0px'
                  ? acc
                  : acc + curr.firstElementChild.clientHeight,
              0
            );
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
          button.classList.remove(
            `${subtab ? 'sub' : ''}tab__button--unrolled`
          );
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
};
