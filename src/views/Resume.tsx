import clsx from 'clsx';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import AccordionsGroup from '../components/AccordionsGroup';
import BlockTitle from '../components/BlockTitle';
import Graphic from '../components/Graphic';
import menuItems from '../content/menu.json';
import resume from '../content/resume.json';
import { getViewLocation } from '../utils/utils';
import CurrentViewContext from './CurrentViewContext';
import classes from './Resume.module.scss';

const Resume = () => {
  const [currentView] = useContext(CurrentViewContext);
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const { experience, education, languages } = resume;
  const { label, items } = experience;

  const viewLocation = getViewLocation(
    currentView,
    'resume',
    menuItems.map((item) => item.label)
  );

  return (
    <div id="resume" className={clsx(classes.section, classes.resume)}>
      {!isMobile && <Graphic view="resume" />}
      <div
        className={clsx(
          classes.container,
          classes.resume,
          viewLocation && classes[viewLocation]
        )}
      >
        <h2 className={classes.title}>{resume.title}</h2>
        <div className={classes.info}>
          <BlockTitle title={resume.info.heading} view="resume" />
          <p className={classes.description}>{resume.info.description}</p>
        </div>
        <div className={classes.accordions}>
          <AccordionsGroup
            accordions={items}
            title={label}
            defaultExpanded="Frontend Development"
          />
          <AccordionsGroup accordions={[education, languages]} />
        </div>
      </div>
    </div>
  );
};

export default Resume;
