import clsx from 'clsx';

import classes from './Project.module.scss';
import TextGroup from '../components/groups/TextGroup';
import ListGroup from '../components/groups/ListGroup';

const Project = ({ content }) => {
  const { name, heading, about } = content;
  return (
    <div id={name} className={clsx(classes.section, classes[name])}>
      <div className={clsx(classes.container, classes[name])}>
        <h2 className={clsx(classes.heading, classes.large, classes[name])}>
          {heading}
        </h2>
        <TextGroup title="About Project" projectName={name} content={about} />
        <ListGroup title="Features" projectName={name} content={about} />

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
