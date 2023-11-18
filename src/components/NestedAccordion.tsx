import clsx from 'clsx';

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
  return (
    <div className={classes.accordion}>
      <p className={classes.accordionLabel}>{accordionLabel}</p>
      <div className={classes.accordionItems}>
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
