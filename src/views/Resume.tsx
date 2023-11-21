import clsx from 'clsx';

import resume from '../content/resume.json';

import ResumeAccordion from '../components/resume/ResumeAccordion';

import classes from './Resume.module.scss';

const Resume = () => {
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
          <h3 className="tab__heading tab__heading--resume">
            {resume.info.heading}
          </h3>
          <div className="tab__wrapper js-expandable js-minHeight">
            <p className="tab__description tab__description--resume">
              {resume.info.description}
            </p>
          </div>
          <button className="tab__readMore tab__readMore--resume tab__readMore--js">
            Read more
          </button>
        </div>
        <ResumeAccordion content={resume.resume} />
      </div>
    </div>
  );
};

export default Resume;
