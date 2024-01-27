import { useState } from 'react';

import Accordion from './Accordion';
import ResumeDetails from './resume/ResumeDetails';

import classes from './AccordionsGroup.module.scss';
import BlockTitle from './BlockTitle';

const AccordionsGroup = ({
  title,
  content,
  isTitleLarge,
}: AccordionsGroupProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={classes.accordionsGroup}>
      <BlockTitle title={title} view="resume" />
      <div className={classes.items}>
        {content.map(({ label, items }, index) => {
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
