import clsx from 'clsx';
import { useRef, useState } from 'react';

import classes from './NestedAccordion.module.scss';

const ItemProperties = ({ items }) => {
  return (
    <div className={classes.properties}>
      {items.map((item, index) => (
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

const AccordionItem = ({ itemLabel, items }) => {
  return (
    <div className={classes.item}>
      <p className={classes.itemLabel}>{itemLabel}</p>
      <ItemProperties items={items} />
    </div>
  );
};

const Accordion = ({ accordionLabel, items }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const accordionRef = useRef(null);
  const accordionLabelRef = useRef(null);
  const accordionItemsRef = useRef(null);

  const handleAccordionClick = () => {
    const labelHeight = accordionLabelRef.current.clientHeight;
    const itemsHeight = accordionItemsRef.current.clientHeight;

    accordionRef.current.style.height = isExpanded
      ? `${labelHeight}px`
      : `${labelHeight + itemsHeight + 20}px`;
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div ref={accordionRef} className={classes.accordion}>
      <button
        ref={accordionLabelRef}
        className={classes.accordionLabel}
        onClick={handleAccordionClick}
      >
        {accordionLabel}
      </button>
      <div ref={accordionItemsRef} className={classes.accordionItems}>
        {items.map((item, index) => {
          const { itemLabel, items } = item;
          return itemLabel ? (
            <AccordionItem key={index} itemLabel={itemLabel} items={items} />
          ) : (
            <ItemProperties key={index} items={items} />
          );
        })}
      </div>
    </div>
  );
};

const NestedAccordion = ({ content }) => {
  const [experience, education, languages] = content;
  return (
    <div>
      {/* Experience */}
      {/* <div className={classes.accordion}>
        <p>{experience.label}</p>
        {experience.items.map((content, index) => (
          <Accordion label={experience.label} items={experience.items} />
        ))}
      </div> */}
      {/* Education */}
      <Accordion
        accordionLabel={education.accordionLabel}
        items={education.items}
      />
      <Accordion
        accordionLabel={languages.accordionLabel}
        items={languages.items}
      />
    </div>
  );
};

export default NestedAccordion;
