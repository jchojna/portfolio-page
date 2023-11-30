import clsx from 'clsx';

import TextGroup from '../components/groups/TextGroup';
import ProjectLinks from '../components/ProjectLinks';
import IconsList from '../components/icons/IconsList';
import ProjectStats from '../components/ProjectStats';
import ProjectFeatures from '../components/ProjectFeatures';
// import ListGroup from '../components/groups/ListGroup';

import classes from './Project.module.scss';

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
        <ProjectFeatures
          projectName={name}
          title="Features"
          content={features}
        />

        <IconsList view={name} icons={icons} />

        <ProjectLinks projectName={name} url={url} />

        <ProjectStats projectName={name} />
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
