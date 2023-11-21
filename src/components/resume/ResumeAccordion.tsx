import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import Accordion from '../Accordion';

import classes from '../Accordion.module.scss';

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
