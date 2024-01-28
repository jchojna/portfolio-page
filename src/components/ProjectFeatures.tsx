import clsx from 'clsx';
import { useState } from 'react';

import Accordion from './Accordion';
import BlockTitle from './BlockTitle';

import classes from './ProjectFeatures.module.scss';

const ProjectFeatures = ({
  projectName,
  title,
  content,
}: ProjectFeaturesProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className={clsx(classes.features, classes[projectName])}>
      <BlockTitle title={title} view={projectName} />
      <div className={classes.accordions}>
        {content.map(({ label, items }, index) => {
          return (
            <Accordion
              key={index}
              label={label}
              view={projectName}
              isExpanded={expanded === label}
              setExpanded={setExpanded}
            >
              {items.map((item, index) => {
                return (
                  <li className={classes.feature} key={index}>
                    {item}
                  </li>
                );
              })}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectFeatures;
