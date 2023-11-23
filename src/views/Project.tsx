import clsx from 'clsx';

import classes from './Project.module.scss';
import TextGroup from '../components/groups/TextGroup';
import AccordionsGroup from '../components/AccordionsGroup';
import Icon from '../components/icons/Icon';
import ProjectLinks from '../components/ProjectLinks';
import IconList from '../components/icons/IconList';
// import ListGroup from '../components/groups/ListGroup';

const Project = ({
  name,
  title,
  about,
  features,
  icons,
  url,
}: ProjectProps) => {
  return (
    <div id={name} className={clsx(classes.section, classes[name])}>
      <div className={clsx(classes.container, classes[name])}>
        <h2 className={clsx(classes.title, classes.large, classes[name])}>
          {title}
        </h2>
        <TextGroup title="About Project" projectName={name} content={about} />
        <AccordionsGroup title="Features" content={features} />

        <IconList view={name} icons={icons} />

        <ProjectLinks projectName={name} url={url} />
        {/* <ListGroup title="Features" projectName={name} content={features} /> */}

        {/* <div class="logo logo--tasktimer">
            <svg class="logo__base logo__base--tasktimer" viewBox="0 0 512 612">
              <use href="assets/svg/logos.svg#tasktimer-base"></use>
            </svg>
            <svg
              class="logo__letter logo__letter--tasktimer"
              viewBox="0 0 512 612"
            >
              <use href="assets/svg/logos.svg#tasktimer-letter"></use>
            </svg>
            <svg
              class="logo__shadow logo__shadow--tasktimerBase"
              viewBox="0 0 512 612"
            >
              <use href="assets/svg/logos.svg#tasktimer-shadow-base"></use>
            </svg>
            <svg
              class="logo__shadow logo__shadow--tasktimerLetter"
              viewBox="0 0 512 612"
            >
              <use href="assets/svg/logos.svg#tasktimer-shadow-letter"></use>
            </svg>
          </div> */}
      </div>
    </div>
  );
};

export default Project;
