import clsx from 'clsx';
import { useState } from 'react';

import Accordion from './Accordion';
import ResumeDetails from './resume/ResumeDetails';

import classes from './AccordionsGroup.module.scss';

const AccordionsGroup = ({ title, content }: AccordionsGroupProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={classes.accordionsGroup}>
      <button className={clsx(classes.title, classes.fixed)}>{title}</button>
      <div className={classes.items}>
        {content.map(({ label, items }, index) => {
          return (
            <Accordion
              key={index}
              label={label}
              isExpanded={expanded === label}
              setExpanded={setExpanded}
            >
              {items.map((item, index) => {
                return (
                  <ResumeDetails
                    key={index}
                    label={item.label}
                    items={item.items}
                  />
                );
              })}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default AccordionsGroup;
