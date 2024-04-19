import clsx from 'clsx';
import { useState } from 'react';

import Accordion from './Accordion';
import ResumeDetails from './resume/ResumeDetails';

import classes from './AccordionsGroup.module.scss';
import BlockTitle from './BlockTitle';

const AccordionsGroup = ({
  accordions,
  title = null,
  defaultExpanded = null,
}: AccordionsGroupProps) => {
  const [expanded, setExpanded] = useState<string | null>(defaultExpanded);

  return (
    <div className={clsx(classes.accordionsGroup, title && classes.titled)}>
      {title && <BlockTitle title={title} view="resume" />}
      <div className={classes.items}>
        {accordions.map(({ label, items }, index) => {
          return (
            <Accordion
              key={index}
              label={label}
              view="resume"
              isExpanded={expanded === label}
              setExpanded={setExpanded}
            >
              {items.map((item, index) => {
                return (
                  <ResumeDetails
                    key={index}
                    label={item.label}
                    items={item.items}
                    description={item.description}
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
