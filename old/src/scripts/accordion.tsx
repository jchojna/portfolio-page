import { flags } from './variables';

const findFirstParentWithClass = (element: HTMLElement, className: string) => {
  while (element.tagName !== 'HTML' && !element.classList.contains(className)) {
    element = element.parentNode as HTMLElement;
  }
  return element;
};

export const handleAccordion = (
  tabs: HTMLElement[],
  clickedIndex?: number,
  excludeIndex?: number | string
) => {
  tabs.forEach((tab, index) => {
    const container: HTMLElement = tab.querySelector('[class*=container]')!;
    const content: Element | null = container.firstElementChild;
    const button: HTMLElement = tab.querySelector('[class*="button"]')!;
    const mark: HTMLElement = tab.querySelector('[class*="mark"]')!;

    // when specific tab is being clicked
    if (clickedIndex !== undefined) {
      const subtab = /subtab/.test(button.className);
      const isDisabled =
        /other/.test(tab.className) && flags.media !== 'mediaXs';
      if (isDisabled) return false;

      // handle clicked tab
      if (clickedIndex === index) {
        const height: string = container.style.height;
        // apply transition effect
        if (!container.classList.contains('rollable'))
          container.classList.add('rollable');
        // apply transformations
        if (height === '0px' && content) {
          container.style.height = `${content.clientHeight}px`;
          button.classList.add(`${subtab ? 'sub' : ''}tab__button--unrolled`);
          mark.classList.add('mark--unrolled');
        } else {
          container.style.height = '0px';
          button.classList.remove(
            `${subtab ? 'sub' : ''}tab__button--unrolled`
          );
          mark.classList.remove('mark--unrolled');
        }

        // when subtab clicked
        if (subtab && container.parentNode) {
          const parentContainer = findFirstParentWithClass(
            container.parentNode as HTMLElement,
            'container'
          );
          const subtabsHeaders =
            parentContainer.querySelectorAll('.subtab__header');
          const subtabsContainers: NodeListOf<HTMLElement> =
            parentContainer.querySelectorAll('[class*=container]');
          const isUnrolled = mark.classList.contains('mark--unrolled');

          const clickedSubtabsContainerHeight = container.firstElementChild
            ? container.firstElementChild.clientHeight
            : 0;
          const subtabsHeadersHeights = [...subtabsHeaders].reduce(
            (acc, curr) => acc + curr.clientHeight,
            0
          );

          let height = 0;
          if (flags.media === 'mediaLg') {
            height = isUnrolled ? clickedSubtabsContainerHeight : 0;
          } else {
            height = [...subtabsContainers].reduce((acc, curr) => {
              if (curr.firstElementChild) {
                return curr.style.height === '0px'
                  ? acc
                  : acc + curr.firstElementChild.clientHeight;
              } else {
                return acc;
              }
            }, 0);
          }

          height += subtabsHeadersHeights;
          parentContainer.style.height = `${height}px`;
        }
        flags.shouldSectionsBeUpdated = true;

        // handle not clicked elements
      } else {
        // collapse other tabs only on large screens
        if (flags.media === 'mediaLg') {
          container.style.height = '0px';
          button.classList.remove(
            `${subtab ? 'sub' : ''}tab__button--unrolled`
          );
          mark.classList.remove('mark--unrolled');
        }
      }

      // handle elements on page load or media breakpoint
    } else {
      if (index !== excludeIndex && excludeIndex !== 'all') {
        container.style.height = '0px';
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
        container.style.height = `${content ? content.clientHeight : 0}px`;
        mark.classList.add('mark--unrolled');
        button.classList.add('tab__button--unrolled');
        container.classList.add('rollable');
      }
    }
  });
};

export const addAccordionEvents = (
  buttons: NodeListOf<Element>,
  tabs: NodeListOf<HTMLElement>
) => {
  [...buttons].forEach((button, index) => {
    button.addEventListener('click', () => handleAccordion([...tabs], index));
  });
};
