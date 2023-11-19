import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import classes from './NestedAccordion.module.scss';

const ItemProperties = ({ items }: ItemPropertiesProps) => {
  return (
    <div className={classes.properties}>
      {items.map((item, index: number) => (
        <p
          key={index}
          className={clsx(classes.property, classes[`property-${index + 1}`])}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const AccordionItem = ({ itemLabel, items }: AccordionItemProps) => {
  return (
    <div className={classes.item}>
      <p className={classes.itemLabel}>{itemLabel}</p>
      <ItemProperties items={items} />
    </div>
  );
};

const Accordion = ({
  accordionLabel,
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
        className={classes.accordionLabel}
        onClick={() => setExpanded(isExpanded ? null : accordionLabel)}
      >
        {accordionLabel}
      </button>
      <div ref={accordionItemsRef} className={classes.accordionItems}>
        {items.map((item, index) => {
          // const { itemLabel, items } = item;
          return item.accordionLabel ? (
            <Accordion
              key={index}
              accordionLabel={item.accordionLabel}
              items={item.items}
            />
          ) : item.itemLabel ? (
            <AccordionItem
              key={index}
              itemLabel={item.itemLabel}
              items={item.items}
            />
          ) : (
            <ItemProperties key={index} items={item.items} />
          );
        })}
      </div>
    </div>
  );
};

const NestedAccordion = ({ content }: NestedAccordionProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [experience, education, languages] = content;

  return (
    <div className={classes.accordions}>
      <Accordion
        accordionLabel={experience.accordionLabel}
        items={experience.items}
        isExpanded={expanded === experience.accordionLabel}
        setExpanded={setExpanded}
      />
      <Accordion
        accordionLabel={education.accordionLabel}
        items={education.items}
        isExpanded={expanded === education.accordionLabel}
        setExpanded={setExpanded}
      />
      <Accordion
        accordionLabel={languages.accordionLabel}
        items={languages.items}
        isExpanded={expanded === languages.accordionLabel}
        setExpanded={setExpanded}
      />
    </div>
  );
};

export default NestedAccordion;
