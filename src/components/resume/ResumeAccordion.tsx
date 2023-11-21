import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import ResumeDetails from './ResumeDetails';

import classes from './ResumeAccordion.module.scss';

const Accordion = ({
  label,
  items,
  isExpanded,
  setExpanded,
}: AccordionProps) => {
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const accordionLabelRef = useRef<HTMLButtonElement | null>(null);
  const accordionItemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // collapse all accordions on start
    if (accordionLabelRef.current !== null && accordionRef.current !== null) {
      const labelHeight = accordionLabelRef.current.clientHeight;
      accordionRef.current.style.height = `${labelHeight}px`;
    }
  }, []);

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
    <div ref={accordionRef} className={classes.accordion}>
      <button
        ref={accordionLabelRef}
        className={classes.label}
        onClick={() => setExpanded(isExpanded ? null : label)}
      >
        {label}
      </button>
      <div ref={accordionItemsRef} className={classes.items}>
        {items.map((item, index) => {
          return (
            <ResumeDetails key={index} label={item.label} items={item.items} />
          );
        })}
      </div>
    </div>
  );
};

const ResumeAccordion = ({ content }: ResumeAccordionProps) => {
  const [experience, education, languages] = content;
  const { label, items } = experience;

  const [expanded, setExpanded] = useState<string | null>(null);
  const [subExpanded, setSubExpanded] = useState<string | null>(null);

  return (
    <div className={classes.accordions}>
      <div className={classes.accordion}>
        <button className={clsx(classes.label, classes.fixed)}>{label}</button>
        <div className={classes.items}>
          {items.map((item, index) => {
            return (
              <Accordion
                key={index}
                label={item.label}
                items={item.items}
                isExpanded={subExpanded === item.label}
                setExpanded={setSubExpanded}
              />
            );
          })}
        </div>
      </div>
      <Accordion
        label={education.label}
        items={education.items}
        isExpanded={expanded === education.label}
        setExpanded={setExpanded}
      />
      <Accordion
        label={languages.label}
        items={languages.items}
        isExpanded={expanded === languages.label}
        setExpanded={setExpanded}
      />
    </div>
  );
};

export default ResumeAccordion;
