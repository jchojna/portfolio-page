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
    <div className={classes.features}>
      <BlockTitle title={title} view={projectName} />
      <div className={classes.categories}>
        {content.map(({ label, items }, index) => {
          return (
            <Accordion
              key={index}
              label={label}
              isExpanded={expanded === label}
              setExpanded={setExpanded}
            >
              {items.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectFeatures;
