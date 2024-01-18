import clsx from 'clsx';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import resume from '../content/resume.json';

import Accordion from '../components/Accordion';
import AccordionsGroup from '../components/AccordionsGroup';
import ResumeDetails from '../components/resume/ResumeDetails';
import BlockTitle from '../components/BlockTitle';
import Graphic from '../components/Graphic';

import classes from './Resume.module.scss';

const Resume = () => {
  const [experience, education, languages] = resume.resume;
  const { label, items } = experience;

  const [expanded, setExpanded] = useState<string | null>(null);
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  return (
    <div id="resume" className={clsx(classes.section, classes.resume)}>
      <div className={clsx(classes.container, classes.resume)}>
        <Graphic view="resume" />
        <h2 className={classes.title}>{resume.title}</h2>

        <div className={classes.info}>
          <BlockTitle title={resume.info.heading} view="resume" />
          <p className={classes.description}>{resume.info.description}</p>
        </div>
        <div className={classes.accordions}>
          <AccordionsGroup
            title={label}
            content={items}
            isTitleLarge={!isMobile}
          />
          <Accordion
            label={education.label}
            view="resume"
            isSmall={isMobile}
            isExpanded={expanded === education.label}
            setExpanded={setExpanded}
          >
            {education.items.map(({ label, items }, index) => {
              return <ResumeDetails key={index} label={label} items={items} />;
            })}
          </Accordion>
          <Accordion
            label={languages.label}
            view="resume"
            isSmall={isMobile}
            isExpanded={expanded === languages.label}
            setExpanded={setExpanded}
          >
            {languages.items.map(({ label, items }, index) => {
              return <ResumeDetails key={index} label={label} items={items} />;
            })}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Resume;
