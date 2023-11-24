import clsx from 'clsx';
import { useState } from 'react';

import resume from '../content/resume.json';

import Accordion from '../components/Accordion';
import AccordionsGroup from '../components/AccordionsGroup';
import ResumeDetails from '../components/resume/ResumeDetails';
import BlockTitle from '../components/BlockTitle';

import classes from './Resume.module.scss';

const Resume = () => {
  const [experience, education, languages] = resume.resume;
  const { label, items } = experience;

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div id="resume" className={clsx(classes.section, classes.resume)}>
      <div className={clsx(classes.container, classes.resume)}>
        <h2 className={classes.heading}>{resume.title}</h2>

        {/* <div className="logo logo--resume">
          <svg className="logo__base logo__base--resume" viewBox="0 0 512 512">
            <use href="assets/svg/logos.svg#resume-base"></use>
          </svg>
          <svg
            className="logo__shadow logo__shadow--resume"
            viewBox="0 0 512 512"
          >
            <use href="assets/svg/logos.svg#resume-shadow"></use>
          </svg>
        </div> */}

        <div className="tab tab--resume tab--info">
          <BlockTitle title={resume.info.heading} view="resume" />
          <div className="tab__wrapper js-expandable js-minHeight">
            <p className="tab__description tab__description--resume">
              {resume.info.description}
            </p>
          </div>
          <button className="tab__readMore tab__readMore--resume tab__readMore--js">
            Read more
          </button>
        </div>
        <div className={classes.accordions}>
          <AccordionsGroup title={label} content={items} />
          <Accordion
            label={education.label}
            isExpanded={expanded === education.label}
            setExpanded={setExpanded}
          >
            {education.items.map(({ label, items }, index) => {
              return <ResumeDetails key={index} label={label} items={items} />;
            })}
          </Accordion>
          <Accordion
            label={languages.label}
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
