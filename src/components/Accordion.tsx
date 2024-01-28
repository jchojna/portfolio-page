import clsx from 'clsx';

import { useEffect, useRef } from 'react';

import classes from './Accordion.module.scss';

const Accordion = ({
  label,
  children,
  view,
  isExpanded,
  setExpanded,
}: AccordionProps) => {
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const accordionLabelRef = useRef<HTMLButtonElement | null>(null);
  const accordionItemsRef = useRef<HTMLUListElement | null>(null);
  const accordionClass = clsx(
    classes.accordion,
    classes[view],
    !isExpanded && classes.collapsed
  );

  useEffect(() => {
    if (
      accordionLabelRef.current === null ||
      accordionItemsRef.current === null ||
      accordionRef.current === null
    )
      return;
    const labelHeight = accordionLabelRef.current.clientHeight;
    const itemsHeight = accordionItemsRef.current.clientHeight;
    accordionRef.current.style.height = !isExpanded
      ? `${labelHeight}px`
      : `${labelHeight + itemsHeight + 20}px`;
  }, [isExpanded]);

  return (
    <div ref={accordionRef} className={accordionClass}>
      <div className={classes.header}>
        <button
          ref={accordionLabelRef}
          className={classes.label}
          onClick={() => setExpanded(isExpanded ? null : label)}
        >
          {label}
        </button>
      </div>
      <ul ref={accordionItemsRef} className={classes.items}>
        {children}
      </ul>
    </div>
  );
};

export default Accordion;
