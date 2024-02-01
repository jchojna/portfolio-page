import clsx from 'clsx';

import classes from './ProjectLinks.module.scss';

const ProjectLinks = ({ projectName, repoUrl, demoUrl }: ProjectLinksProps) => (
  <div className={clsx(classes.projectLinks, classes[projectName])}>
    <a
      href={repoUrl}
      className={classes.link}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label={`${projectName} app code`}
    >
      Code
    </a>
    <a
      href={demoUrl}
      className={classes.link}
      target="_blank"
      rel="nofollow noreferrer"
      aria-label={`${projectName} app demo`}
    >
      Demo
    </a>
  </div>
);

export default ProjectLinks;
