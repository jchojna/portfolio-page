import clsx from 'clsx';
import { useState } from 'react';

import Accordion from './Accordion';

import classes from './Accordion.module.scss';

const AccordionsGroup = ({ title, content }: AccordionsGroupProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={classes.accordionsGroup}>
      <button className={clsx(classes.title, classes.fixed)}>{title}</button>
      <div className={classes.items}>
        {content.map((item, index) => {
          return (
            <Accordion
              key={index}
              label={item.label}
              items={item.items}
              isExpanded={expanded === item.label}
              setExpanded={setExpanded}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AccordionsGroup;
